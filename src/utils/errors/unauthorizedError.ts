export class UnauthorizedError extends Error implements PammyError {
  isCustomError = true;
  getStatusCode = () => 401;
  getError = () => {
    if (this.message) {
      return this.message;
    }
    return "Unauthorized access";
  };
}

export abstract class PammyError {
  public isCustomError = true;
  abstract getStatusCode: () => number;
  abstract getError: () => string;
}
