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
  // Mongoose convierte automáticamente los strings a ObjectId
  const conflict = await enrollmentsModel.findOne({ userId }).lean()
  if (conflict) throw new Error('El usuario ya está matriculado en otro curso')

  const enrollment = await enrollmentsModel.create({
    courseId,
    userId,
    enrollmentsDate,
    status,
    notes
  })
  return enrollment.toObject()
}

exports.getEnrollmentByUserId = async userId => {
  return await enrollmentsModel.findOne({ userId }).lean()
}

// Actualizar matrícula
exports.updateEnrollment = async (id, { courseId, userId, enrollmentsDate, status, notes }) => {
  const updateData = {
    enrollmentsDate,
    status,
    updatedAt: new Date()
  }
  
  // Solo incluir los campos que se proporcionan
  if (courseId) updateData.courseId = courseId
  if (userId) updateData.userId = userId
  if (notes !== undefined) updateData.notes = notes
  
  const enrollment = await enrollmentsModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  )
  if (!enrollment) {
    throw new Error(`Matrícula con ID '${id}' no encontrada`)
  }
  return enrollment.toObject()
}

// Eliminar matrícula
exports.deleteEnrollment = async (id) => {
  const enrollment = await enrollmentsModel.findByIdAndDelete(id)
  if (!enrollment) {
    throw new Error(`Matrícula con ID '${id}' no encontrada`)
  }
  return enrollment.toObject()
}