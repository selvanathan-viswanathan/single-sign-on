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

const appUrl = process.env.BASE_URL;
export const openIDWellKnowJson = {
  issuer: `${appUrl}`,
  authorization_endpoint: `${appUrl}/authorize`,
  token_endpoint: `${appUrl}/token`,
  userinfo_endpoint: `${appUrl}/userinfo`,
  jwks_uri: `${appUrl}/.well-known/jwks.json`,
  registration_endpoint: `${appUrl}/register`,
  scopes_supported: ["openid", "profile", "email", "offline_access"],
  response_types_supported: ["code", "id_token", "token"],
  response_modes_supported: ["query", "fragment", "form_post"],
  grant_types_supported: [
    "authorization_code",
    "implicit",
    "refresh_token",
    "client_credentials",
  ],
  subject_types_supported: ["public"],
  id_token_signing_alg_values_supported: ["RS256"],
  code_challenge_methods_supported: ["S256"],
  claims_supported: [
    "sub",
    "name",
    "email",
    "email_verified",
    "picture",
    "given_name",
    "family_name",
  ],
  claim_types_supported: ["normal"],
  token_endpoint_auth_methods_supported: [
    "client_secret_basic",
    "client_secret_post",
    "private_key_jwt",
  ],
  request_uri_parameter_supported: true,
};
