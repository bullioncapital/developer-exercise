export default class JSONResponse {
    private GENERAL_ERROR;
    private BAD_REQUEST;
    private NOT_FOUND_ERROR;
    private PERMISSION_ERROR;
    private OK;
    status: number;
    message: string;
    data: {} | Array<any>;
    constructor();
    respond(status: number, message: string, data?: {}): {
        status: number;
        message: string;
        data: {} | any[];
    };
    respondBadRequest(message: string): {
        status: number;
        message: string;
        data: {} | any[];
    };
    respondPermissionError(message: string): {
        status: number;
        message: string;
        data: {} | any[];
    };
    respondGeneralError(message: string): {
        status: number;
        message: string;
        data: {} | any[];
    };
    respondNotFoundError(message: string): {
        status: number;
        message: string;
        data: {} | any[];
    };
    respondOk(message: string, data: {}): {
        status: number;
        message: string;
        data: {} | any[];
    };
}
