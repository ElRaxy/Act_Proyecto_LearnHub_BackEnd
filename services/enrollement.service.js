const mongoose = require('mongoose')
const enrollmentsModel = require('../models/enrollments.model')

// Obtener todas las matrículas
exports.getAllEnrollments = async () =>
  await enrollmentsModel.find()
    .populate('userId', 'firstName lastName email')
    .populate('courseId', 'title category')
    .lean()

// Obtener matrícula por ID
exports.getEnrollmentById = async (id) =>
  await enrollmentsModel.findById(id)
    .populate('userId', 'firstName lastName email')
    .populate('courseId', 'title category')
    .lean()

// Crear matrícula
exports.createEnrollment = async ({ courseId, userId, enrollmentsDate, status, notes }) => {
  const courseObjectId = mongoose.Types.ObjectId(courseId)
  const userObjectId = mongoose.Types.ObjectId(userId)

  const conflict = await enrollmentsModel.findOne({ userId: userObjectId }).lean()
  if (conflict) throw new Error('El usuario ya está matriculado en otro curso')

  return await enrollmentsModel.create({
    courseId: courseObjectId,
    userId: userObjectId,
    enrollmentsDate,
    status,
    notes
  })
}

exports.getEnrollmentByUserId = async userId => {
  return await enrollmentsModel.findOne({ userId }).lean()
}

// Eliminar matrícula
exports.deleteEnrollment = async (id) =>
  await enrollmentsModel.findByIdAndDelete(id)
