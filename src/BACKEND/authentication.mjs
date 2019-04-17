import database from "../persistence/db.connect"

const header = "auth";
const bearer = "giovanni";

export default function auth_backend(req, res, next) {

    if (req.headers[header]) {
        if (!req.headers[header].startsWith(`${bearer} `)) {
            res.status(403).end();
            return;
        }

        //verifica l;autenticazione e aggiunge i dati in req.auth
        next();
    }
    res.set("WWW-Authenticate", "AUTH");
    res.status(401);
    res.end();
}