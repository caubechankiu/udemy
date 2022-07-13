var express = require('express')
var authMidleware = require('../auth-midleware');
var router = express.Router()

var Genre = require('../../models/genre')
var Subgenre = require('../../models/subgenre')
var User = require('../../models/user')
var Course = require('../../models/course')
var Lecture = require('../../models/lecture')

router.use('/*', authMidleware);

router.get('/get-courses-homepage', (req, res, next) => {
    Genre.find({}).select({ _id: 1, name: 1 }).exec((err, data) => {
        if (err)
            return res.send({ code: 404, message: 'error' })
        let getCoursesPromises = []
        for (let i = 0; i < data.length; i++) {
            let genre = data[i]
            getCoursesPromises[i] = new Promise((resolve, reject) => {
                Course.find({ genre: genre._id, public: true })
                    .populate({ path: 'lecturer', select: '-_id username photo' })
                    .select({ _id: 1, name: 1, coverphoto: 1, cost: 1, numberofstudent: 1, numberofreviews: 1, star: 1, lecturer: 1, description: 1 })
                    .limit(8).sort({ numberofstudent: -1 }).exec((err, data) => {
                        if (err)
                            return reject(err)
                        return resolve({ _id: genre._id, name: genre.name, courses: data })
                    })
            })
        }
        Promise.all(getCoursesPromises).then((result) => {
            res.send({ code: 200, listCourses: result })
        }, (err) => {
            res.send({ code: 404, message: 'error' })
        })
    })
})
router.get('/get-courses-genre/:genreid', (req, res, next) => {
    Genre.findOne({ _id: req.params.genreid })
        .populate({ path: 'subgenres', select: 'name' })
        .select({ name: 1, subgenres: 1 }).exec((err, genre) => {
            if (err)
                return res.send({ code: 404, message: 'error' })
            let getCoursesPromises = []
            for (let i = 0; i < genre.subgenres.length; i++) {
                let subgenre = genre.subgenres[i]
                getCoursesPromises[i] = new Promise((resolve, reject) => {
                    Course.find({ subgenre: subgenre._id, public: true })
                        .populate({ path: 'lecturer', select: '-_id username photo' })
                        .select({ _id: 1, name: 1, coverphoto: 1, cost: 1, numberofstudent: 1, numberofreviews: 1, star: 1, lecturer: 1, description: 1 })
                        .limit(8).sort({ numberofstudent: -1 }).exec((err, data) => {
                            if (err)
                                return reject(err)
                            return resolve({ _id: subgenre._id, genre: subgenre.genre, name: subgenre.name, courses: data })
                        })
                })
            }
            Promise.all(getCoursesPromises).then((result) => {
                res.send({ code: 200, genre: { _id: genre._id, name: genre.name }, listCourses: result })
            }, (err) => {
                res.send({ code: 404, message: 'error' })
            })
        })
})
router.get('/get-courses-subgenre/:subgenreid', (req, res, next) => {
    const subgenreid = req.params.subgenreid;
    const level = Number(req.query.level);
    const free = req.query.free == 'true';
    const sort = Number(req.query.sort);
    const page = Number(req.query.page) || 1;

    let condition = { subgenre: subgenreid, public: true }
    if (level)
        condition.level = level;
    condition.cost = free ? 0 : { $gt: 0 }

    let sortCondition
    if (!sort)
        sortCondition = { numberofstudent: -1 }
    else {
        switch (sort) {
            case 1:
                sortCondition = { numberofstudent: -1 }
                break
            case 2:
                sortCondition = { star: -1 }
                break
            case 3:
                sortCondition = { createdAt: -1 }
                break
            case 4:
                sortCondition = { cost: 1 }
                break
            case 5:
                sortCondition = { cost: -1 }
                break
        }
    }

    Subgenre.findOne({ _id: subgenreid })
        .populate({ path: 'genre', select: 'name' })
        .select({ name: 1, genre: 1 }).exec((err, subgenre) => {
            if (err)
                return res.send({ code: 404, message: 'error' })
            Course.find(condition)
                .populate({ path: 'lecturer', select: '-_id username photo' })
                .select({ _id: 1, name: 1, coverphoto: 1, cost: 1, numberofstudent: 1, numberofreviews: 1, star: 1, lecturer: 1, description: 1 })
                .skip(page * 8 - 8)
                .limit(8).sort(sortCondition).exec((err, data) => {
                    if (err)
                        return res.send({ code: 404, message: 'error' })
                    return res.send({
                        code: 200,
                        genre: subgenre.genre,
                        subgenre: {
                            _id: subgenre._id,
                            name: subgenre.name
                        },
                        courses: data
                    })
                })
        })
})
router.get('/search', (req, res, next) => {
    let condition = { public: true }
    if (Number(req.query.level))
        condition.level = Number(req.query.level)
    if (req.query.free)
        condition.cost = req.query.free == 'true' ? 0 : { $gt: 0 }
    if (req.query.name)
        condition.name = { $regex: ('.*' + req.query.name + '.*'), $options: 'i' }

    let sort
    if (!req.query.sort)
        sort = { numberofstudent: -1 }
    else {
        switch (parseInt(req.query.sort)) {
            case 1:
                sort = { numberofstudent: -1 }
                break
            case 2:
                sort = { star: -1 }
                break
            case 3:
                sort = { createdAt: -1 }
                break
            case 4:
                sort = { cost: 1 }
                break
            case 5:
                sort = { cost: -1 }
                break
        }
    }
    Course.find(condition)
        .populate({ path: 'lecturer', select: '-_id username photo' })
        .select({ _id: 1, name: 1, coverphoto: 1, cost: 1, numberofstudent: 1, numberofreviews: 1, star: 1, lecturer: 1, description: 1 })
        .skip((req.query.page || 1) * 8 - 8)
        .limit(8).sort(sort).exec((err, data) => {
            if (err)
                return res.send({ code: 404, message: 'error' })
            return res.send({
                code: 200,
                courses: data
            })
        })
})
router.get('/get-courses-relate-lecturer', (req, res, next) => {
    Course.find({ lecturer: req.query.lecturerid, _id: { $ne: req.query.courseid }, public: true })
        .populate({ path: 'lecturer', select: { _id: 1, username: 1, photo: 1 } })
        .select({ _id: 1, name: 1, coverphoto: 1, cost: 1, numberofstudent: 1, numberofreviews: 1, star: 1, lecturer: 1, description: 1 })
        .limit(4).sort({ numberofstudent: -1 }).exec((err, data) => {
            if (err)
                return res.send({ code: 404, message: 'error' })
            return res.send({ code: 200, courses: data })
        })
})


module.exports = router