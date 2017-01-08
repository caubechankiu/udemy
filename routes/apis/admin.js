var express = require('express')
var router = express.Router()
var User = require('../../models/user')
var Course = require('../../models/course')
var bcrypt = require('bcrypt')
var Payment = require('../../models/payment')
var fs = require('fs')

router.get('/*', (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role == 0)
        return res.send({ code: 1001, message: 'You are not admin' });
    next()
})
router.post('/*', (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role == 0)
        return res.send({ code: 1001, message: 'You are not admin' });
    next()
})

router.post('/get-users', (req, res, next) => {
    let condition = {}
    if (req.body.searchQuery) {
        condition = {
            $or: [
                {
                    username: { $regex: ('.*' + req.body.searchQuery + '.*'), $options: 'i' }
                }, {
                    email: { $regex: ('.*' + req.body.searchQuery + '.*'), $options: 'i' }
                }
            ]
        }
    }
    let sort
    if (!req.body.sort)
        sort = { username: 1 }
    else {
        switch (parseInt(req.body.sort)) {
            case 1:
                sort = { username: 1 }
                break
            case 2:
                sort = { username: -1 }
                break
        }
    }
    User.find(condition)
        .select({ __v: 0, updatedAt: 0, createdAt: 0, mycourses: 0, mylearningcourses: 0, mywishlist: 0, password: 0, biography: 0 })
        .skip((req.body.page || 1) * 8 - 8).limit(8)
        .sort(sort).exec((err, users) => {
            if (err)
                return res.send({ code: 404, message: 'error' })
            res.send({ code: 200, users: users })
        })
})

router.post('/delete-user', (req, res, next) => {
    User.remove({ _id: req.body._id }).exec((err) => {
        if (err)
            return res.send({ code: 404, message: 'error' })
        return res.send({ code: 200 })
    })
})
router.post('/add-user', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err)
            return res.send({ code: 404, message: 'error' })
        let u = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            verified: true,
            role: req.body.role,
            creditbalance: req.body.creditbalance,
            website: req.body.website,
            linkedin: req.body.linkedin,
            youtube: req.body.youtube,
            twitter: req.body.twitter
        })

        u.save((err) => {
            if (err)
                return res.send({ code: 404, message: 'error' })
            res.send({ code: 200 })
        })
    })
})
router.post('/get-user-info', (req, res, next) => {
    User.findOne({ _id: req.body._id })
        .select({ __v: 0, createdAt: 0, updatedAt: 0, mycourses: 0, mylearningcourses: 0, mywishlist: 0, password: 0 })
        .exec((err, user) => {
            if (err)
                return res.send({ code: 404 })
            return res.send({ code: 200, user: user })
        })
})
router.post('/edit-user', (req, res, next) => {
    User.update({ _id: req.body._id }, {
        username: req.body.username,
        email: req.body.email,
        verified: true,
        role: req.body.role,
        creditbalance: req.body.creditbalance,
        website: req.body.website,
        linkedin: req.body.linkedin,
        youtube: req.body.youtube,
        twitter: req.body.twitter
    }).exec((err) => {
        if (err)
            return res.send({ code: 404 })
        return res.send({ code: 200 })
    })
})
router.post('/get-courses', (req, res, next) => {
    let condition = {}
    if (req.body.searchQuery) {
        condition = {
            name: { $regex: ('.*' + req.body.searchQuery + '.*'), $options: 'i' }
        }
    }
    let sort
    if (!req.body.sort)
        sort = { name: 1 }
    else {
        switch (parseInt(req.body.sort)) {
            case 1:
                sort = { name: 1 }
                break
            case 2:
                sort = { name: -1 }
                break
        }
    }
    Course.find(condition)
        .populate({ path: 'lecturer', select: { _id: 1, username: 1 } })
        .populate({ path: 'genre', select: { _id: 1, name: 1 } })
        .populate({ path: 'subgenre', select: { _id: 1, name: 1 } })
        .populate({ path: 'lectures', select: { _id: 1, name: 1 } })
        .select({ __v: 0, updatedAt: 0, revenue: 0, reviews: 0 })
        .skip((req.body.page || 1) * 8 - 8).limit(8)
        .sort(sort).exec((err, courses) => {
            if (err)
                return res.send({ code: 404, message: 'error' })
            res.send({ code: 200, courses: courses })
        })
})
router.post('/delete-course', (req, res, next) => {
    Course.remove({ _id: req.body._id }).exec((err) => {
        if (err)
            return res.send({ code: 404, message: 'error' })
        return res.send({ code: 200 })
    })
})
router.post('/get-review-courses', (req, res, next) => {
    let condition = { review: true }
    if (req.body.searchQuery) {
        condition.name = { $regex: ('.*' + req.body.searchQuery + '.*'), $options: 'i' }
    }
    let sort
    if (!req.body.sort)
        sort = { name: 1 }
    else {
        switch (parseInt(req.body.sort)) {
            case 1:
                sort = { name: 1 }
                break
            case 2:
                sort = { name: -1 }
                break
        }
    }
    Course.find(condition)
        .populate({ path: 'lecturer', select: { _id: 1, username: 1 } })
        .populate({ path: 'genre', select: { _id: 1, name: 1 } })
        .populate({ path: 'subgenre', select: { _id: 1, name: 1 } })
        .populate({ path: 'lectures', select: { _id: 1, name: 1 } })
        .select({ __v: 0, updatedAt: 0, revenue: 0, reviews: 0 })
        .skip((req.body.page || 1) * 8 - 8).limit(8)
        .sort(sort).exec((err, courses) => {
            if (err)
                return res.send({ code: 404, message: 'error' })
            res.send({ code: 200, courses: courses })
        })
})

router.post('/accept-course', (req, res, next) => {
    Course.update({ _id: req.body._id }, { review: false, public: true }).exec((err) => {
        if (err) return res.send({ code: 404 })
        res.send({ code: 200 })
    })
})
router.post('/refuse-course', (req, res, next) => {
    Course.update({ _id: req.body._id }, { review: false, public: false }).exec((err) => {
        if (err) return res.send({ code: 404 })
        res.send({ code: 200 })
    })
})
router.post('/get-payment', (req, res, next) => {
    Payment.find({ type: { $lt: 3 } })
        .populate({ path: 'user', select: { username: 1 } })
        .populate({ path: 'information.course', select: { name: 1 } })
        .populate({ path: 'information.user', select: { username: 1 } })
        .skip((req.body.page || 1) * 8 - 8)
        .limit(8).sort({ createdAt: req.body.sort == 0 ? -1 : 1 })
        .exec((err, payments) => {
            if (err)
                return res.send({ code: 404, message: 'error' })
            res.send({ code: 200, payments: payments })
        })
})
router.post('/delete-payment', (req, res, next) => {
    Payment.remove({ _id: req.body._id }).exec((err) => { })
    res.end()
})
router.get('/get-config', (req, res, next) => {
    fs.readFile('config.json', (err, data) => {
        if (err) res.send({ code: 404 })
        let config = JSON.parse(data.toString())
        res.send({
            code: 200,
            cardnumber: config.CARD_NUMBER,
            totalprofit: config.TOTAL_PROFIT,
            profitratio: config.PROFIT_RATIO
        })
    })
})
router.post('/set-cardnumber', (req, res, next) => {
    fs.readFile('config.json', (err, data) => {
        if (err) res.send({ code: 404 })
        let config = JSON.parse(data.toString())
        config.CARD_NUMBER = req.body.cardnumber
        fs.writeFile('config.json', JSON.stringify(config), (err) => { res.send({ code: 200, cardnumber: req.body.cardnumber }) })
    })
})
router.post('/set-profitratio', (req, res, next) => {
    fs.readFile('config.json', (err, data) => {
        if (err) res.send({ code: 404 })
        let config = JSON.parse(data.toString())
        config.PROFIT_RATIO = parseFloat(req.body.profitratio)
        fs.writeFile('config.json', JSON.stringify(config), (err) => { res.send({ code: 200, profitratio: req.body.profitratio }) })
    })
})

module.exports = router