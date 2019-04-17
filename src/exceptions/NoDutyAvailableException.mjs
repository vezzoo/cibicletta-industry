export default class NoDutyAvailableException extends Error {

    constructor(text = "NoDutyAvailableException") {
        super(text);
    }

}