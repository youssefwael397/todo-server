import CustomError from "./CustomError.js";

class ServerError extends CustomError{
    constructor(message: string = "Internal Server Error"){
        super(message, 500)
    }
}

export default ServerError;