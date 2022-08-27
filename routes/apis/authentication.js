const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/user');
const Notification = require('../../models/notification')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy,
    FACEBOOK_APP_ID = '636987036467998',
    FACEBOOK_APP_SECRET = '8f41a1dba35280da33b668ecc713348d';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    GOOGLE_CLIENT_ID = '141786930136-u0fmeevp1cfc77236du16ko2pk13tpp1',
    GOOGLE_CLIENT_SECRET = 'QjWXljFSyHNgcCx3MLKA2X9y';
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'vi.t.trinh@vntrip.vn',
        pass: 'Vntrip@@123'
    }
})

passport.serializeUser(function (user, done) {
    // console.log('call function serializeUser ' + user._id);
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    // console.log('call function deserializeUser ' + id);
    User.findOne({ _id: id }).select({ password: 0, __v: 0, updatedAt: 0, createdAt: 0, mycourses: 0 })
        .exec((err, data) => {
            done(err, data);
        })
});

const verifytokenGenerator = () => {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
}

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "https://skyhome.com.vn/api/authentication/auth/google/callback"
    }, function (token, tokenSecret, profile, done) {
        User.findByGgid(profile.id, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                let email = profile.emails[0].value;
                User.findWithEmail(email, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        if (profile.displayName == '')
                            return done(err)
                        let newUser = new User({
                            'googleid': profile.id,
                            'username': profile.displayName,
                            'email': profile.emails[0].value,
                            'verified': true
                        })
                        newUser.save((err) => {
                            if (err)
                                return done(err);
                            return done(null, newUser);
                        })
                    } else {
                        user.googleid = profile.id
                        user.verified = true
                        user.save((err) => {
                            if (err) return done(err);
                            return done(null, user);
                        })
                    }
                })
            } else {
                return done(null, user);
            }
        })
    })
)

passport.use(new FacebookStrategy(
    {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "https://skyhome.com.vn/api/authentication/auth/facebook/callback"
    }, function (accessToken, refreshToken, profile, done) {
        User.findByFbid(profile.id, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                let newUser = new User({
                    'facebookid': profile.id,
                    'username': profile.displayName,
                    'verified': true
                })
                newUser.save(function (err) {
                    if (err)
                        return done(err);
                    return done(null, newUser);
                });
            } else {
                return done(null, user);
            }
        })
    })
);

passport.use('local-signup',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        let username = req.body.username;
        User.findWithEmail(email, (err, user) => {
            if (err) {
                return done(err);
            } else if (!user) {
                bcrypt.hash(password, 10, function (err, hash) {
                    if (err) {
                        return done(err)
                    }
                    let verifytoken = verifytokenGenerator()
                    console.log(verifytoken)
                    let u = new User({ username: username, email: email, password: hash, verifytoken: verifytoken, verified: false });
                    u.save(function (err) {
                        if (err) return done(err)
                        let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                            from: 'Academy',
                            to: email,
                            subject: 'Verify your account',
                            text: 'You recieved message from Academy',
                            html: '<p>Dear ' + username + ',</p></br>' +
                                '<p>You have selected ' + email + ' as your new Academy account. To verify this email address belongs to you, click the link below and then sign in using your email and password.</p></br>' +
                                '<a href="http://localhost:3000/verify/' + verifytoken + '">Verify now ></a></br></br>' +
                                '<p>Academy Support</p>'
                        }
                        transporter.sendMail(mainOptions, function (err, info) {
                            if (err) {
                                return done(err)
                            } else {
                                return done(null, u, { code: 200, message: 'Please check your email to continue' });
                            }
                        })
                    })
                })
            } else {
                if (user.password)
                    return done(null, false, { message: 'Email registered!', code: 1001 });
                bcrypt.hash(password, 10, function (err, hash) {
                    if (err) {
                        return done(err);
                    } else {
                        // Store hash in your password DB.
                        user.password = hash;
                        user.username = username;
                        user.save(function (err) {
                            if (err) return done(err);
                            return done(null, user, { code: 200, message: 'success' });
                        })
                    }
                });
            }
        });
    })
)


/* GET users listing. */
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findWithEmail(email);
    if (!user) {
        return res.send({ code: 1001, message: 'Incorrect email' });
    }
    if (!user.verified) {
        return res.send({ code: 1001, message: 'You need verify your email' });
    }
    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
        return res.send({ code: 1001, message: 'Incorrect password' });
    }

    const notis = await Notification.find({ to: user._id })
        .populate({ path: 'from', select: { photo: 1 } })
        .select({ __v: 0, updatedAt: 0, to: 0 })
        .limit(4).sort({ createdAt: -1 });
    const access_token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30 days", algorithm: "HS256" });
    delete user.password;
    user.notis = notis
    res.send({ code: 200, message: 'success', user, access_token })
});

router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        if (err)
            return res.send(err)
        res.send(info)
    })(req, res, next)
})

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    const user = req.user;
    const access_token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30 days", algorithm: "HS256" });
    res.redirect("/oauth-callback?access_token=" + access_token);
})
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/')
    }
)
router.post('/forgotpassword', (req, res, next) => {
    let newPassword = verifytokenGenerator()
    bcrypt.hash(newPassword, 10, function (err, hash) {
        if (err) {
            return res.send({ code: 404, message: 'error' })
        }
        User.findOneAndUpdate({ email: req.body.email }, { password: hash, verified: true }).exec((err, data) => {
            if (err || !data)
                return res.send({ code: 404, message: 'error' })
            let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: 'Academy',
                to: req.body.email,
                subject: 'Reset your password',
                text: 'You recieved message from Academy',
                html: '<p>Dear ' + data.username + ',</p></br>' +
                    '<p>A password reset for your account was requested.</p></br>' +
                    '<p>Please login your account with new password: <strong>' + newPassword + '</strong></p></br></br>' +
                    '<p>Academy Support</p>'
            }
            transporter.sendMail(mainOptions, function (err, info) {
                if (err)
                    return res.send({ code: 404, message: 'error' })
                return res.send({ code: 200, message: 'You should soon receive an email allowing you to reset your password. Please make sure to check your spam and trash if you can not find the email.' })
            })
        })
    })
})

module.exports = router