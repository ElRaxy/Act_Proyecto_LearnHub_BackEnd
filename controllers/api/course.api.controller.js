const Course = require('../../models/courses.model')
const courseService = require("../../services/course.service")
const baseUrlCourses = `/api/${process.env.API_VERSION}/courses`

// GET ALL COURSES (vista)
exports.getAllCourses = async (req, res) => {
    try {
        // const courses = await Course.find()
        const courses = await courseService.getAllCourses()
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json('Error obteniendo cursos: ' + error)
    }
}

// GET BY ID (vista)
exports.getCourseById = async (req, res) => {
    try {
        // const course = await Course.findById(req.params.id)
        const course = await courseService.getCourseById(req.params.id)
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json('Error obteniendo curso: ' + error)
    }
}

// // FORM NEW (vista)
// exports.showCreateForm = (req, res) => {
//     res.locals.tituloEJS = 'Nuevo curso'
//     // res.render('courses/new', {
//     //     baseApi: baseUrlCourses
//     // })
// }

// CREATE (acción)
exports.createCourse = async (req, res) => {
    try {
        await courseService.createCourse(req.body)
        res.status(201).json(req.body)
    } catch (error) {
        res.status(500).json('Error creando curso: ' + error)
    }
}

// // FORM EDIT (vista)
// exports.showEditForm = async (req, res) => {
//     try {
//         const course = await Course.findById(req.params.id)
//         res.status(200).json(course)
//     } catch (error) {
//         res.status(500).json('Error obteniendo datos: ' + error)
//     }
// }

// UPDATE (acción)
exports.updateCourse = async (req, res) => {
    try {
       const updatedCourse =  await courseService.updateCourse(req.params.id, req.body)
       // res.redirect(`${baseUrlCourses}/${req.params.id}`)
        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(500).json('Error actualizando curso: ' + error)
    }
}

// DELETE (acción)
exports.deleteCourse = async (req, res) => {
    try {
        const courseDeleted = await courseService.deleteCourse(req.params.id)
        res.status(200).json(courseDeleted)
       // res.redirect(baseUrlCourses)
    } catch (error) {
        console.log(error)
        res.status(500).json('Error eliminando curso: ' + error)
    }
}
