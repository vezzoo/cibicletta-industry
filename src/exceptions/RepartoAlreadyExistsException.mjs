export default class RepartoAlreadyExistsException extends Error {

    constructor(text = "") {
        super(text);
    }

}