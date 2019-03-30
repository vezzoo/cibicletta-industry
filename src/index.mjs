import WBS from "./wbs/WBS";
import {connect} from "./persistence/db.connect"

connect()
    .then(() => new WBS().init())
    .then((engine) => {
        let data = new Date();
        console.log(engine.ordineUtente("tetofonta", "vezzoo", [
            {
                prodotto: "A1.01",
                qta: 2
            },
            {
                prodotto: "MNA",
                qta: 1
            }
        ], data));
        console.log(engine.ordineUtente("tetofonta", "vezzoo", [
            {
                prodotto: "A1.01",
                qta: 2
            }
        ], data));
    });