import express from "express"
import {connect} from "../persistence/db.connect";
import auth from "./authentication"

connect().then(() => {
    const PORT = 5000;
    const app = express();
    app.use(auth);

    app.get("/", (req, res) => {
        res.send("hello")
    });

    app.listen(PORT, ()=>{
        console.log(`APP LISTENING ON PORT ${PORT}`)
    });
}).catch(e => {
    console.log(e)
});