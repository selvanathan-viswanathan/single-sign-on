import { ERROR_CODES } from "./constant";

export class AppError extends Error {
  /**
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code (e.g., 400, 404).
   * @param {string} errorCode - A custom error code for easier identification.
   * @param {Object} [details] - Optional additional information about the error.
   */
  constructor(message, statusCode, errorCode, details = {}) {
    super(message); // Call the parent class (Error) constructor
    this.statusCode = statusCode || 500; // Default to 500 (Internal Server Error)
    this.errorCode = errorCode || "UNKNOWN_ERROR"; // Default error code
    this.details = details; // Optional metadata for additional information

    // Capture the stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotAuthorizedError extends AppError {
  constructor(message = "Not authorized") {
    super(message, 401, ERROR_CODES.NOT_AUTHORIZED);
  }
}

export class AccessForbiddenError extends AppError {
  constructor(message = "Access forbidden") {
    super(message, 403, ERROR_CODES.ACCESS_FORBIDDEN);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details = {}) {
    super(message, 400, ERROR_CODES.VALIDATION_ERROR, details);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, ERROR_CODES.NOT_FOUND);
  }
}

export class GoneError extends AppError {
  constructor(message = "Resource no longer available") {
    super(message, 410, ERROR_CODES.GONE);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict occurred", details = {}) {
    super(message, 409, ERROR_CODES.CONFLICT, details);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = "Unprocessable entity", details = {}) {
    super(message, 422, ERROR_CODES.UNPROCESSABLE_ENTITY, details);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500, ERROR_CODES.INTERNAL_ERROR);
  }
}

export const onSuccess = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    errorCode: ERROR_CODES.SUCCESS,
    message,
    data,
  });
};
