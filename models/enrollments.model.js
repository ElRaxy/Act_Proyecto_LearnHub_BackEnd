const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  enrollmentsDate: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ['pendiente', 'aprobado', 'rechazado'],
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Usa exactamente la colección "enrollments"
module.exports =
  mongoose.models.Enrollment ||
  mongoose.model('Enrollment', enrollmentSchema, 'enrollments')
