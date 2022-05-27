import ApiError from "./ApiError";
import error from "./errorCodes";

export default class ErrorHelper {
  static invalidPassword() {
    throw new ApiError(error.invalidPassword, 401);
  }
  static userArealyExists() {
    throw new ApiError(error.userAlreadyExists, 400);
  }

  static userLoginDidNotMatch() {
    throw new ApiError(error.userloginDidNotMatch, 401);
  }
}
