import CustomError from "./CustomError.js";

class NotFoundError extends CustomError{
    constructor(message: string = "Not found"){
        super(message, 404)
    }
}

export default NotFoundError;