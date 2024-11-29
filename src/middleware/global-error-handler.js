import { AppError } from "../utilities/error-handler-util";
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    // Known errors
    return res.status(err.statusCode).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message,
      details: err.details || undefined,
    });
  }

  // Fallback for unknown errors
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    errorCode: ERROR_CODES.INTERNAL_ERROR,
    message: "An unexpected error occurred",
  });
};
