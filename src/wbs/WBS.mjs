import Prodotto from "./Prodotto";
import Reparto from "./Reparto";

export default class WBS {

    constructor() {
        WBS.populateProdotti();
        WBS.populateReparti();
    }

    static populateProdotti() {
        //todo implementazione reale

        const prodotti = {};

        //4363788, 0.01

        const fetched = [
            new Prodotto("A1.01", "Bici donna senza cambio bianca", "INTERNA"),

            new Prodotto("RA", "Ruota di tipo A", "INTERNA"),
            new Prodotto("TA1.01", "Telaio di tipo A1 bianca", "INTERNA"),
            new Prodotto("MA", "Manubrio di tipo A1", "ESTERNA"),

            new Prodotto("RA", "Raggio di tipo A", "ESTERNA"),
            new Prodotto("CA", "Cerchione di tipo A", "ESTERNA"),
            new Prodotto("GA", "Gomma di tipo A", "ESTERNA"),

            new Prodotto("TA1", "Telaio di tipo A1", "ESTERNA"),
            new Prodotto("V.01", "Verrniciatura bianca", "ESTERNA")
        ];

        fetched[0].addFiglio(fetched[1], 2);
        fetched[0].addFiglio(fetched[2], 1);
        fetched[0].addFiglio(fetched[3], 1);

        fetched[1].addFiglio(fetched[4], 36);
        fetched[1].addFiglio(fetched[5], 1);
        fetched[1].addFiglio(fetched[6], 1);

        fetched[2].addFiglio(fetched[7], 1);
        fetched[2].addFiglio(fetched[8], 0.15);

        console.log(fetched)
    }

    static populateReparti() {
        //todo implementazione reale

        const reparti = {};

        const fetched = [
            new Reparto("CF", "Collaudo finale"),
            new Reparto("IF", "Imballaggio finale"),
            new Reparto("AF", "Assemblaggio finale"),
            new Reparto("SLDMNT", "Saldatura e montaggio ruote"),
            new Reparto("MC", "Montaggio cambi"),
            new Reparto("V", "Verniciatura"),
        ];

        console.log(fetched)
    }
}