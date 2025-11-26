const mongoose = require('mongoose')

const enrollmentsSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courses',
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true,
  },
  enrollmentsDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pendiente", "aprobado", "rechazado"],
  },
  notes: {
    type: String,
    required: true,
  }
})

const enrollments = mongoose.model('courses', coursesSchema)

module.exports = enrollments
