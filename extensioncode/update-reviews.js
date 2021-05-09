require('dotenv').config();
var mongoose = require('mongoose')
var db = mongoose.connection

var Course = require('../models/course')
var User = require('../models/user')
var Review = require('../models/review')

var reviewContent = [
    'Best explanation of if / else I found on the web. Awesome so far!',
    'Filled in the basics that I needed to understand to have a solid foundation for learning advanced topics.',
    'Great course! Very thorough and detailed explanations',
    'clear and consise delivery',
    'So far so god',
    'A very sound foundation, combined with a detailed application of JavaScript. This course will certainly have you programming in JavaScript with confidence.  This is a',
    'Awesome course till now. The explanation was great!!',
    'JS refresher going well, looking forward to the challenges',
    'So far the course and the authors presentation was good',
    'Excellent teacher who made difficult concepts easy to learn and understand. Highly recommend taking this course if you want to learn JavaScript!',
    'Is really easy to understand and mobile. Thanks for the udemy & instructor.',
    'So far he is very thorough and precise in how he is describing the plans to learn javascript.',
    'I\'m learning a lot of stuff, definitely worth the money. Thank you Jonas for this amazing course.',
    'The course has a very good structure and explanation. Although I have only the seen the initial stage, I am quite sure it exceeds my expectation. Thanks',
    'Intro was good, clear and precise !',
    'Ce cours est très clair et bien expliqué. Hâte de coder en Javascript après toutes ces indications.',
    'great course. complex and advanced theory explained in a way which makes it easy for me to understand. plus good examples of the theory. i think understanding all these advanced concepts will make it a lot easier to code.'
]

updateReviews = () => {
    User.find({}).select({ _id: 1 }).exec((err, users) => {
        Course.find({}).select({ _id: 1 }).exec((err, courses) => {
            for (let i = 0; i < courses.length; i++) {
                for (let j = 0; j < 30; j++) {
                    let review = new Review({
                        user: users[Math.floor(Math.random() * users.length)],
                        course: courses[i],
                        star: Math.floor(Math.random() * 5),
                        content: reviewContent[Math.floor(Math.random() * reviewContent.length)]
                    })
                    review.save((err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(i + '-' + j)
                        }
                    })
                }
            }
        })
    })
}

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    updateReviews()
})


mongoose.connect(process.env.MONGODB_URL);
