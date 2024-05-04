import CustomError from "./CustomError.js";

class DuplicateError extends CustomError{
    constructor(message: string = "Duplicate entry"){
        super(message, 409)
    }
}

export default DuplicateError;