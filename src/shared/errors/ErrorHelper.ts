import ApiError from "./ApiError";
import error from "./errorCodes";

export default class ErrorHelper {
  static notEnoughTickets() {
    throw new Error("Method not implemented.");
  }
  static promoterNotFound() {
    return new Error("Method not implemented.");
  }
  static userNotFound() {
    return new Error("Method not implemented.");
  }
  static invalidPassword() {
    return new ApiError(error.invalidPassword, 401);
  }
  static userArealyExists() {
    return new ApiError(error.userAlreadyExists, 400);
  }
  static userLoginDidNotMatch() {
    return new ApiError(error.userloginDidNotMatch, 401);
  }
}
