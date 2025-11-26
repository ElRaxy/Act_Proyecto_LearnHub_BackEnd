const enrollmentsModel = require('../models/enrollments.model')

exports.getAllEnrollments = async () => await enrollmentsModel.find()

exports.getEnrollmentById = async (id) => await enrollmentsModel.findById(id)

exports.createEnrollment = async (enrollment) => await enrollmentsModel.create(enrollment)

exports.updateEnrollment = async (id, enrollment) => await enrollmentsModel.findByIdAndUpdate(id, enrollment)

exports.deleteEnrollment = async (id) => await enrollmentsModel.findByIdAndDelete(id,{new:true})

exports.getAllEnrollmentsByUser = async (id) => await enrollmentsModel.find({userId:id})

exports.getAllEnrollmentsByCourse = async (id) => await enrollmentsModel.find({courseId:id})
