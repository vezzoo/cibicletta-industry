export default class RepartoAlreadyExistsException extends Error {

    constructor(text = "RepartoAlreadyExistsException") {
        super(text);
    }

}