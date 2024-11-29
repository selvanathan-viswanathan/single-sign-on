import { ERROR_CODES } from "../utilities/constant";
import { AppError } from "../utilities/error-handler-util";
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    // Known errors
    return res.status(err.statusCode).json({
      success: false,
      responseCode: err.errorCode,
      message: err.message,
      details: err.details || undefined,
    });
  }

  // Fallback for unknown errors
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    responseCode: ERROR_CODES.INTERNAL_ERROR,
    message: "An unexpected error occurred",
  });
};
