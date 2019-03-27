import WBS from "./wbs/WBS";

const engine = new WBS();
let data = new Date();
engine.ordineUtente("tetofonta", "vezzoo", [
    {
        prodotto: "A1.01",
        qta: 2
    },
    {
        prodotto: "MA",
        qta: 1
    }
], data);

engine.ordineUtente("tetofonta", "vezzoo", [
    {
        prodotto: "A1.01",
        qta: 2
    }
], data);