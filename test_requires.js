const files = [
  "./utils/AppError.js",
  "./utils/logger.js",
  "./middlewares/morgan.mw.js",
  "./middlewares/errorHandler.mw.js",
  "./swagger/swagger.js",
  "./routes/course.routes.js",
  "./routes/enrollment.routes.js",
  "./routes/user.routes.js",
  "./routes/api/course.api.routes.js",
  "./routes/api/enrollment.api.routes.js",
  "./routes/api/user.api.routes.js",
];

files.forEach((file) => {
  try {
    require(file);
    console.log(`OK: ${file}`);
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      console.log(`FAIL (Not Found): ${file}`);
      console.error(err.message);
    } else {
      console.log(`FAIL (Runtime): ${file}`);
      console.error(err);
    }
  }
});
