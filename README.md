# Informe de trabajo en equipo con Git y GitHub

## 🧑‍🤝‍🧑 Integrantes del grupo

| Nombre completo     | Rol asumido en el grupo |
| ------------------- | ----------------------- |
| Alejandro Puente    | Desarrollador Full Stack |
| Alex Mico           | Desarrollador Full Stack |
| Sergio Martínez     | Desarrollador Full Stack |
| Jacob Pérez         | Desarrollador Full Stack |

---

## 🔀 Ramas utilizadas

- `main`: rama principal
- `devAlejandro`: rama del desarrollador 1
- `devAlex`: rama del desarrollador 2
- `devSergio`: rama del desarrollador 3
- `devJacob`: rama del desarrollador 4

---

## 📌 Estrategia de trabajo con Git

- Cada alumno ha trabajado en su propia rama de desarrollo (`dev...`).
- Se resolvieron conflictos de merge manualmente en varias ocasiones, debidamente documentados en los commits.

---

## 📊 Estadísticas de participación (según Git)

Resultado de `git shortlog --summary --numbered --all`:

```
 84  Alex Mico
 30  blanck-2024
 21  Alejandro Puente
  9  Alex
  6  JacobDawProyecto
  4  Martinez1991Sergio
  4  sergiowin
```

---

## ✅ Tareas realizadas por cada miembro

- **Alex**:
  - Creó la estructura base del proyecto.
  - Desarrolló los modelos, servicios y controladores de Courses y Enrollments.
  - Implementó las vistas de Courses y Enrollments.
  - Configuró el archivo `.env`.
  - Implementó la documentación Swagger (`swagger.js`).
  - Desarrolló el sistema de autenticación con JWT.
  - Implementó el sistema de sesiones con `cookie-parser`.
  - Implementó el sistema de autorización con perfiles diferenciados y protección de rutas.

- **Alejandro**:
  - Creó la hoja de estilos CSS.
  - Desarrolló los modelos, servicios y controladores de Users.
  - Implementó las vistas de Users.
  - Desplegó la máquina con Linux Mint y configuró la base de datos MongoDB.
  - Desarrolló `user.api.controller.js` y realizó pruebas con un cliente REST para usuarios.
  - Implementó logs enriquecidos de acceso y errores con Morgan.
  - Implementó el sistema de autorización con perfiles diferenciados y protección de rutas.
 
- **Sergio**:
  - Desarrolló `courses.api.controller.js` y realizó pruebas con un cliente REST para cursos.
  - Implementó el manejo avanzado de errores.
  - Configuró CORS básico.
 
- **Jacob**:
  - Desarrolló `enrollments.api.controller.js` y realizó pruebas con un cliente REST para inscripciones.
  - Implementó el cifrado de contraseñas en la base de datos.

- **Todos**:
  - Desarrollaron el archivo `index.js`.
  - Crearon los parciales (`partials`) de header y footer.
  - Crearon los seeds de la base de datos.
  - Crearon las rutas API (`/api/`) para la documentación con Swagger UI.
  - Documentaron todas las pruebas realizadas en la aplicación.

---

## 🧪 Testeo y pruebas

- Toda la funcionalidad ha sido probada y validada.
- No se han utilizado tests automatizados en esta fase, pero está previsto para futuras entregas.

---

## 🧠 Lecciones aprendidas

- La importancia de trabajar con ramas separadas para evitar conflictos.
- Resolución de conflictos de merge mediante VS Code.
- Depuración de errores en vistas EJS.
- Validación y corrección de JSON.
- Uso de GitHub como plataforma de control de versiones.

---

## 📅 Fechas clave

- Inicio del proyecto: 10/11/2025
- Primer merge a main: 11/10/2025
- Finalización: 05/02/2026
