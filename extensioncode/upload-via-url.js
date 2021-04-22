var http = require('http');
var fs = require('fs');//Handle files
var mongoose = require('mongoose');
var db = mongoose.connection;
var Course = require('../models/course')
var User = require('../models/user')
var Lecture = require('../models/lecture')


var imageUrls = [
    'https://udemy-images.udemy.com/course/240x135/756914_8bd3_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/922484_52a1_5.jpg',
    'https://udemy-images.udemy.com/course/240x135/627730_83d0_10.jpg',
    'https://udemy-images.udemy.com/course/240x135/412738_4543.jpg',
    'https://udemy-images.udemy.com/course/240x135/408430_1b9a_5.jpg',
    'https://udemy-images.udemy.com/course/240x135/655208_5bdf.jpg',
    'https://udemy-images.udemy.com/course/240x135/914296_3670.jpg',
    'https://udemy-images.udemy.com/course/240x135/951618_0839_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/540090_c68f_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/520116_edf5.jpg',
    'https://udemy-images.udemy.com/course/240x135/888716_4225_3.jpg',
    'https://udemy-images.udemy.com/course/240x135/484114_6ad5_3.jpg',
    'https://udemy-images.udemy.com/course/240x135/637930_9a22_15.jpg',
    'https://udemy-images.udemy.com/course/240x135/673654_d677_7.jpg',
    'https://udemy-images.udemy.com/course/240x135/822660_1527_3.jpg',
    'https://udemy-images.udemy.com/course/240x135/714724_b3b4_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/581854_4c7e_3.jpg',
    'https://udemy-images.udemy.com/course/240x135/959700_8bd2_9.jpg',
    'https://udemy-images.udemy.com/course/240x135/764164_de03_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/892102_963b.jpg',
    'https://udemy-images.udemy.com/course/240x135/895786_7b4b_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/625204_436a_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/707876_9e82_4.jpg',
    'https://udemy-images.udemy.com/course/240x135/969242_3548_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/817466_c0e0.jpg',
    'https://udemy-images.udemy.com/course/240x135/966658_b0ee_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/957194_444a.jpg',
    'https://udemy-images.udemy.com/course/240x135/809522_82dc_2.jpg',
    'https://udemy-images.udemy.com/course/240x135/754112_7441_2.jpg'
]
var avatarUrls = [
    'https://udemy-images.udemy.com/user/200_H/14214490_3956_2.jpg',
    'https://udemy-images.udemy.com/user/200_H/17082766_0590_5.jpg',
    'https://udemy-images.udemy.com/user/200_H/4387876_78bc.jpg',
    'https://udemy-images.udemy.com/user/200_H/4466306_6fd8_2.jpg',
    'https://udemy-images.udemy.com/user/200_H/4355282_676b.jpg',
    'https://udemy-images.udemy.com/user/200_H/16903220_be08_2.jpg',
    'https://udemy-images.udemy.com/user/200_H/14703256_c1bf_4.jpg',
    'https://udemy-images.udemy.com/user/200_H/8180238_7afd_4.jpg',
    'https://udemy-images.udemy.com/user/200_H/5487312_0554.jpg',
    'https://udemy-images.udemy.com/user/200_H/14942868_3ed6_4.jpg',
    'https://udemy-images.udemy.com/user/200_H/1681918_d7a1_6.jpg',
    'https://udemy-images.udemy.com/user/200_H/797726_5aff_3.jpg',
    'https://udemy-images.udemy.com/user/200_H/18187_dbc6_6.jpg',
    'https://udemy-images.udemy.com/user/200_H/10663828_2f0b.jpg',
    'https://udemy-images.udemy.com/user/200_H/15601054_5545_14.jpg',
    'https://udemy-images.udemy.com/user/200_H/402489_0bc6_4.jpg',
    'https://udemy-images.udemy.com/user/200_H/7231684_bc0d_3.jpg',
    'https://udemy-images.udemy.com/user/200_H/19352882_1818.jpg',
    'https://udemy-images.udemy.com/user/200_H/635204_baf4.jpg',
    'https://udemy-images.udemy.com/user/200_H/18279718_4883_2.jpg',
    'https://udemy-images.udemy.com/user/200_H/5141498_91b8_3.jpg',
    'https://udemy-images.udemy.com/user/200_H/11098324_91cb.jpg'
]

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // updateCoursePhoto()
    updateCourseVideo()
    // updateUserPhoto()
    // updateLectureVideo()
})

updateCourseVideo = () => {
    Course.find({}).exec((err, courses) => {
        let i = 0
        let upload = (i) => {
            let course = courses[i]
            let fileToDownload = 'http://localhost:3000/video.mp4'
            let file = fs.createWriteStream('../public/uploads/courses-video/' + course._id)
            let request = http.get(fileToDownload, function (response) {
                response.pipe(file).on('finish', () => {
                    course.previewvideo = '/uploads/courses-video/' + course._id
                    course.save((err) => {
                        if (err)
                            return console.log(err)
                        console.log(i)
                        i++
                        if (i == courses.length)
                            return
                        upload(i)
                    })
                })
            })
        }
        upload(0)
    })
}
updateLectureVideo = () => {
    Lecture.find({}).exec((err, lectures) => {
        let i = 0
        let upload = (i) => {
            let lecture = lectures[i]
            let fileToDownload = 'http://localhost:3000/video.mp4'
            let file = fs.createWriteStream('../uploads/courses-video/' + lecture._id)
            let request = http.get(fileToDownload, function (response) {
                response.pipe(file).on('finish', () => {
                    lecture.video = 'uploads/courses-video/' + lecture._id
                    lecture.save((err) => {
                        if (err)
                            return console.log(err)
                        console.log(i)
                        i++
                        if (i == lectures.length)
                            return
                        upload(i)
                    })
                })
            })
        }
        upload(0)
    })
}
updateCoursePhoto = () => {
    Course.find({}).exec((err, courses) => {
        for (let i = 0; i < courses.length; i++) {
            let course = courses[i]
            let fileToDownload = imageUrls[Math.floor(Math.random() * imageUrls.length)].replace('https', 'http');
            let file = fs.createWriteStream('../public/uploads/courses-photo/' + course._id)
            let request = http.get(fileToDownload, function (response) {
                response.pipe(file).on('finish', () => {
                    course.coverphoto = '/uploads/courses-photo/' + course._id
                    course.save((err) => {
                        if (err)
                            return console.log(err)
                        console.log(i)
                    })
                })
            })
        }
    })
}

updateUserPhoto = () => {
    User.find({}).exec((err, users) => {
        for (let i = 0; i < users.length; i++) {
            let user = users[i]
            let fileToDownload = avatarUrls[Math.floor(Math.random() * avatarUrls.length)].replace('https', 'http');
            let file = fs.createWriteStream('../public/uploads/avatars/' + user._id)
            let request = http.get(fileToDownload, function (response) {
                response.pipe(file).on('finish', () => {
                    user.photo = '/uploads/avatars/' + user._id
                    user.save((err) => {
                        if (err)
                            return console.log(err)
                        console.log(i)
                    })
                })
            })
        }
    })
}

mongoose.connect('mongodb://root:123456@localhost:27017/udemy?authSource=admin');
