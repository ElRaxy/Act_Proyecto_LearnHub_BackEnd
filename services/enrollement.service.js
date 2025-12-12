const enrollmentsModel = require('../models/enrollments.model')

exports.getAllEnrollments = async () =>
  await enrollmentsModel
    .find()
    .populate('userId', 'firstName lastName email')
    .populate('courseId', 'title category')
    .lean()

exports.getEnrollmentById = async id =>
  await enrollmentsModel
    .findById(id)
    .populate('userId', 'firstName lastName email')
    .populate('courseId', 'title category')
    .lean()

exports.createEnrollment = async enrollment =>
  await enrollmentsModel.create(enrollment)

exports.updateEnrollment = async (id, enrollment) =>
  await enrollmentsModel.findByIdAndUpdate(id, enrollment, { new: true })

exports.deleteEnrollment = async id =>
  await enrollmentsModel.findByIdAndDelete(id, { new: true })

exports.getEnrollmentByUserId = async userId => {
  return Enrollment.findOne({ userId })
}

exports.getAllEnrollmentsByCourse = async id =>
  await enrollmentsModel
    .find({ courseId: id })
    .populate('userId', 'firstName lastName email')
    .lean()
