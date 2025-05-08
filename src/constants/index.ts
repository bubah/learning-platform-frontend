export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  ID_TOKEN: "idToken",
  REFRESH_TOKEN: "refreshToken",
};

export const HTTP_HEADERS = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
};

export const COGNITO_ERRORS = {
  USER_NOT_FOUND: "UserNotFoundException",
  INVALID_PASSWORD: "NotAuthorizedException",
  USER_NOT_CONFIRMED: "UserNotConfirmedException",
  USER_PASSWORD_RESET_REQUIRED: "UserPasswordResetRequiredException",
  TOO_MANY_REQUESTS: "TooManyRequestsException",
  TOO_MANY_FAILED_ATTEMPTS: "TooManyFailedAttemptsException",
  INVALID_PARAMETER: "InvalidParameterException",
  RESOURCE_NOT_FOUND: "ResourceNotFoundException",
  USER_ALREADY_EXISTS: "UsernameExistsException",
  INVALID_PARAMETER_VALUE: "InvalidParameterValueException",
  USERNAME_EXISTS: "UsernameExistsException",
  INVALID_EMAIL: "InvalidEmailException",
};
