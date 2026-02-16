const coursesModel = require('../models/courses.model')

exports.getAllCourses = async () => await coursesModel.find().lean()

exports.getCourseById = async id => await coursesModel.findById(id).lean()

exports.createCourse = async course => await coursesModel.create(course)

exports.updateCourse = async (id, course) =>
  await coursesModel.findByIdAndUpdate(id, course, { new: true })

exports.deleteCourse = async id =>
  await coursesModel.findByIdAndDelete(id, { new: true })

exports.getAllCoursesByUser = async id =>
  await coursesModel.find({ userId: id }).lean()

exports.getAllCoursesByEnrollment = async id =>
  await coursesModel.find({ enrollmentsId: id }).lean()
