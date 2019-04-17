import database from "../persistence/db.connect"
import fs from "fs"
import jwt from "jsonwebtoken"
import environment from "./cjs"

const __dirname = environment.__dirname;

const header = "auth";
const bearer = "giovanni";

const privkey = fs.readFileSync(__dirname + "/jwt.crt");
const pubkey = fs.readFileSync(__dirname + "/jwt.key");

let i  = 'tetofonta';
let s  = 'subjecttt';
let a  = 'loooooool';
let signOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  "RS256"
};

export default function auth_backend(req, res, next) {

    if(req.url === "/login"){
        next();
        return;
    }

    if (req.headers[header]) {
        if (!req.headers[header].startsWith(`${bearer} `)) {
            res.status(403).end();
            return;
        }

        try{
            let token = req.headers[header].substr(bearer.length+1);
            let result = jwt.verify(token, pubkey, signOptions);

            //database("Users").findAll()

            req.auth = result;

        } catch (e) {
            res.status(403).send();
            return;
        }

        next();
        return;
    }
    res.set("WWW-Authenticate", "AUTH");
    res.status(401);
    res.end();
}

export function logincb(app){
    app.post("/login", (req, res) => {
        res.status(200).send(bearer + " " + jwt.sign({username: "aaa"}, privkey, signOptions));
    });
}