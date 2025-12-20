const courseService = require("../../services/course.service")

// GET ALL COURSES (vista)
exports.getAllCourses = async (req, res) => {
    try {
        // const courses = await Course.find()
        const courses = await courseService.getAllCourses()
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo cursos: ' + error.message })
    }
}

// GET BY ID (vista)
exports.getCourseById = async (req, res) => {
    try {
        // const course = await Course.findById(req.params.id)
        const course = await courseService.getCourseById(req.params.id)
        if (!course) {
            return res.status(404).json({ error: `Curso con ID '${req.params.id}' no encontrado` })
        }
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo curso: ' + error.message })
    }
}


// CREATE (acción)
exports.createCourse = async (req, res) => {
    try {
        const newCourse = await courseService.createCourse(req.body)
        res.status(201).json(newCourse)
    } catch (error) {
        res.status(500).json({ error: 'Error creando curso: ' + error.message })
    }
}


// UPDATE (acción)
exports.updateCourse = async (req, res) => {
    try {
        // Verificar que el curso existe antes de actualizar
        const existingCourse = await courseService.getCourseById(req.params.id)
        if (!existingCourse) {
            return res.status(404).json({ error: `Curso con ID '${req.params.id}' no encontrado` })
        }
        
        const updatedCourse = await courseService.updateCourse(req.params.id, req.body)
        if (!updatedCourse) {
            return res.status(500).json({ error: 'Error al actualizar el curso' })
        }
        // res.redirect(`${baseUrlCourses}/${req.params.id}`)
        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando curso: ' + error.message })
    }
}

// DELETE (acción)
exports.deleteCourse = async (req, res) => {
    try {
        // Verificar que el curso existe antes de eliminar
        const existingCourse = await courseService.getCourseById(req.params.id)
        if (!existingCourse) {
            return res.status(404).json({ error: `Curso con ID '${req.params.id}' no encontrado` })
        }
        
        const courseDeleted = await courseService.deleteCourse(req.params.id)
        if (!courseDeleted) {
            return res.status(500).json({ error: 'Error al eliminar el curso' })
        }
        res.status(200).json({ message: 'Curso eliminado exitosamente', course: courseDeleted })
       // res.redirect(baseUrlCourses)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error eliminando curso: ' + error.message })
    }
}
