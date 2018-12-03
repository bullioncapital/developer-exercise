export default class JSONResponse {
  private GENERAL_ERROR = 500;
  private BAD_REQUEST = 400;
  private NOT_FOUND_ERROR = 404;
  private PERMISSION_ERROR = 403;
  private OK = 200;

  public status: number;
  public message: string;
  public data: {} | Array<any>;

  public constructor() {
    this.status = 200;
    this.message = '';
    this.data = [];
  }

  public respond(status: number, message: string, data?: {}) {
    if (status) {
      this.status = status;
    }
    if (message) {
      this.message = message;
    }
    if (data) {
      this.data = data;
    }

    return {
      status: this.status,
      message: this.message,
      data: this.data
    };
  }

  public respondBadRequest(message: string) {
    return this.respond(this.BAD_REQUEST, message);
  }
  public respondPermissionError(message: string) {
    return this.respond(this.PERMISSION_ERROR, message);
  }
  public respondGeneralError(message: string) {
    return this.respond(this.GENERAL_ERROR, message);
  }
  public respondNotFoundError(message: string) {
    return this.respond(this.NOT_FOUND_ERROR, message);
  }
  public respondOk(message: string, data: {}) {
    return this.respond(this.OK, message, data);
  }

}
