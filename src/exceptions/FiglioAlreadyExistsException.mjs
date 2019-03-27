export default class FiglioAlreadyExistsException extends Error {

    constructor(text = "FiglioAlreadyExistsException") {
        super(text);
    }

}