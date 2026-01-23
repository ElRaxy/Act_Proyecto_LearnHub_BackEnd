class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode || 500;
    this.source = "Sistema";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
