require('dotenv').config();
var Course = require('../models/course')
var User = require('../models/user')
var Genre = require('../models/genre')
var Subgenre = require('../models/subgenre')
var Lecture = require('../models/lecture')

var mongoose = require('mongoose');
var db = mongoose.connection;

var coursesNames = [
    'Learn and Understand AngularJS',
    'JavaScript: Understanding the Weird Parts',
    'Build Responsive Real World Websites with HTML5 and CSS3',
    'Modern React with Redux',
    'Learn and Understand NodeJS',
    'Advanced React and Redux',
    'ES6 Javascript: The Complete Developer\'s Guide',
    'Understanding TypeScript',
    'AngularJS JumpStart with Dan Wahlin',
    'The Complete ASP.NET MVC 5 Course',
    'Angular 2 with TypeScript for Beginners: The Pragmatic Guide',
    'Meteor and React for Realtime Apps',
    'The Web Developer Bootcamp',
    'The Professional Ruby on Rails Developer',
    'Build Websites from Scratch with HTML & CSS',
    'Ultimate Web Designer & Developer Course: Build 23 Projects!',
    'The Complete React Web App Developer Course',
    'The Complete Web Developer Course 2.0',
    'Angular 2 - The Complete Guide',
    'Accelerated JavaScript Training',
    'PHP for Beginners -Become a PHP Master - Project Included',
    'The Complete Ruby on Rails Developer Course',
    'Angular 2 and NodeJS - The Practical Guide to MEAN Stack 2.0',
    'Learn Bootstrap Development By Building 10 Projects'
]
var lectureNames = [
    'Course Intro',
    'Project Intro',
    'Installing Nodejs',
    'Your First Application',
    'Creating a Real Web Server',
    'Adding Pages',
]


createCourse = () => {
    User.find({}).exec((err, data) => {
        if (err) {
            return console.log(err)
        }
        for (let i = 3; i < data.length; i++) {
            let user = data[i]
            for (let j = 0; j < 10; j++) {
                let course = new Course({
                    name: coursesNames[Math.floor(Math.random() * coursesNames.length)],
                    lecturer: data[i]._id,
                    star: Math.random() * 5,
                    numberofstudent: Math.floor(Math.random() * 1000),
                    numberofreviews: Math.floor(Math.random() * 1000),
                    revenue: Math.floor(Math.random() * 1000),
                    cost: Math.floor(Math.random() * 200),
                    level: Math.floor(Math.random() * 4),
                    public: true,
                    willableto: [
                        "Launch their own Node applications, switch careers, or freelance as Node developers",
                        "Create Node apps that support user accounts and authentication",
                        "Use awesome third-party Node modules like MongoDB, Mongoose, SocketIO, and Express",
                        "Create real-time web applications"
                    ],
                    targetstudent: [
                        "Anyone looking to launch their own Node applications, switch careers, or freelance as a Node developer"
                    ],
                    needtoknow: [
                        "A computer on which you can install software (Windows, MacOS, or Linux) is required",
                        "A basic understanding of vanilla JavaScript (variables, if statements, basic functions, basic objects)"
                    ],
                    description: "<p>Are you looking to create real-world Node applications? Maybe you want to switch careers or launch a side-project to generate some extra income. Either way, you&#39;re in the right place.</p><p>I&#39;ve designed this course around a single goal:&nbsp;<strong>Turning you into a professional Node developer capable of developing, testing, and deploying real-world production applications.</strong></p><p>There&#39;s no better time to dive in.&nbsp;According to the 2016 Stack Overflow Survey, Node is in the top ten for back-end popularity and back-end salary, with an average salary of $85k. This means more jobs and more opportunities for you!</p><p><em>&quot;Andrew Mead is perhaps the best instructor in Udemy&#39;s portfolio. His explanations are clear, his pace is great, and he is super responsive to questions. I highly recommend his courses.&quot; Bert McLees</em></p>"
                })
                course.save((err) => {
                    if (err) {
                        return console.log(err)
                    }
                    User.updateOne({ _id: user._id },
                        {
                            $push: { "mycourses": course._id },
                        }).exec((err) => {
                            if (err) {
                                return console.log(err)
                            }
                        })
                })
            }
        }
    })
}

updateCourseGenre = () => {
    Genre.find({})
        .populate({ path: 'subgenres' })
        .exec((err, genres) => {
            if (err)
                return console.log(err)
            Course.find({}).exec((err, courses) => {
                for (let i = 0; i < courses.length; i++) {
                    let course = courses[i]
                    let genre = genres[Math.floor(Math.random() * genres.length)]
                    course.genre = genre._id
                    course.subgenre = genre.subgenres[Math.floor(Math.random() * genre.subgenres.length)]
                    course.save((err) => {
                        if (err) {
                            console.log(_id)
                        }
                        else {
                            console.log(i)
                        }
                    })
                }
            })
        })
}

createLecture = () => {
    Course.find({ lectures: { $size: 0 } }).exec((err, courses) => {
        if (err)
            return console.log(err)
        for (let i = 0; i < courses.length; i++) {
            let course = courses[i]
            for (let j = 0; j < lectureNames.length; j++) {
                let lecture = new Lecture({
                    name: lectureNames[j]
                })
                lecture.save((err) => {
                    if (err)
                        return console.log(err)
                    Course.updateOne({ _id: course._id }, { $push: { "lectures": lecture._id } })
                        .exec((err) => {
                            if (err)
                                return console.log(err)
                            return console.log(i + '-' + j)
                        })
                })
            }
        }
    })
}
updateLecturePreview = () => {
    Course.find({}).populate({ path: 'lectures' }).exec((err, courses) => {
        if (err)
            return console.log(err)
        for (let i = 0; i < courses.length; i++) {
            let course = courses[i]
            for (let j = 0; j < 3; j++) {
                let lecture = course.lectures[j]
                lecture.preview = true
                lecture.save((err) => {
                    if (err)
                        return console.log(err)
                    return console.log(i + '-' + j)
                })
            }
        }
    })
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // createUser()
    // createCourse()
    // updateCourseGenre()
    // createLecture()
    // updateLecturePreview()
})

mongoose.connect(process.env.MONGODB_URL);
