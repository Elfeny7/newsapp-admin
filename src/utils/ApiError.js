export default class ApiError extends Error {
  constructor(message, code = 500, errors = null) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.errors = errors;
  }
}