export default class ApiError extends Error {
  constructor(message, code = 500, errors = null) {
    super(message)
    this.name = "ApiError"
    this.code = code
    this.errors = errors
  }

  static fromAxios(error) {
    if (error?.response) {
      const data = error.response.data || {}
      return new ApiError(
        data.message || "Request failed",
        error.response.status,
        data.errors || null
      )
    }

    if (error?.request) {
      return new ApiError("No response from server", 0)
    }

    return new ApiError(error.message || "Unknown error", 500)
  }
}
