export const ERROR_CODES = {
  NOT_AUTHORIZED: "NOT_AUTHORIZED",
  ACCESS_FORBIDDEN: "ACCESS_FORBIDDEN",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  GONE: "GONE",
  CONFLICT: "CONFLICT",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SUCCESS: "SUCCESS", // For success response consistency
};

export const defaultStatusCode = {
  NOT_AUTHORIZED: 401,
  SUCCESS: 200,
  ERROR: 500,
  NO_CONTENT: 204,
  ACCESS_FORBIDDEN: 403,
  VALIDATION_ERROR: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  GONE: 410,
  UN_PROCESSIBLE_ENTITY: 429,
  RESOURCE_CREATED: 201,
};

export const ACCESS_LOG_FORMMAT = `:remote-addr - :remote-user [:date[clf]]
":method :url HTTP/:http-version" :status :res[content-length] "
:referrer" ":user-agent"`;
