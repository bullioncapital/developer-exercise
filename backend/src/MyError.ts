class MyError extends Error {
    public status: number;

    constructor(status: number, msg: string) {
        super(msg);
        this.status = status;
        this.message = msg;
    }
}

export default MyError;
