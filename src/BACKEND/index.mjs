import express from "express"
import auth from "./authentication"

const PORT = 5000;
const app = express();
app.use(auth);

app.get("/", (req, res) => {
   res.send("hello")
});

app.listen(PORT, ()=>{
    console.log(`APP LISTENING ON PORT ${PORT}`)
});