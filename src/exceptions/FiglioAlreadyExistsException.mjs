export default class FiglioAlreadyExistsException extends Error {

    constructor(text = "") {
        super(text);
    }

}