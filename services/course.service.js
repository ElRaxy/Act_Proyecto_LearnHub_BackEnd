const e = require('cors')
const coursesModel = require('../models/courses.model')

//
exports.getAllCourses = async () =>  await coursesModel.find()

exports.getCourseById = async (id) => await coursesModel.findById(id)

exports.createCourse = async (course) => await coursesModel.create(course)

exports.updateCourse = async (id, course) => await coursesModel.findByIdAndUpdate(id, course)

exports.deleteCourse = async (id) => await coursesModel.findByIdAndDelete(id,{new:true})

exports.getAllCoursesByUser = async (id) => await coursesModel.find({userId:id})

exports.getAllCoursesByEnrollment = async (id) => await coursesModel.find({enrollmentsId:id})
