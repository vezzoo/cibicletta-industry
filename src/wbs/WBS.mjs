import Prodotto from "./Prodotto";
import Reparto from "./Reparto";

export default class WBS {

    constructor() {
        this.reparti = WBS.populateReparti();
        this.prodotti = WBS.populateProdotti(this.reparti);
    }

    /**
     * @param cliente: nome del cliente
     * @param codiceOrdine: codice dell'ordine
     * @param distinta: contenuto dell'ordine, array di oggetti
     * {
     *      prodotto: codice prodotto ordinato,
     *      qta: quantita ordinata
     * }
     * @param dataConsegna: termine massimo
     */
    ordineUtente(cliente, codiceOrdine, distinta, dataConsegna) {
        distinta.forEach(prod => {

            const necessitaProduzione = [];
            const necessitaOrdine = [];

            let prodotto = this.prodotti[prod.prodotto];
            let ordinato = prod.qta;
            let fabbisogno = ordinato - prodotto.giacenza;

            if(fabbisogno > 0)
                WBS._buildOrder(prodotto, ordinato, dataConsegna, necessitaProduzione, necessitaOrdine)

            console.log(necessitaOrdine, necessitaProduzione)
        })
    }

    static _buildOrder(prodotto, qta, entro, dafare, dacomprare){

        if(prodotto.produzione === "ESTERNA"){
            dacomprare.push({
                prodotto: prodotto,
                qta: qta,
                entro: entro
            });
            return;
        }

        let reparto = prodotto.getReparto(qta, entro);
        reparto.registerDuty(prodotto, qta, entro);
        dafare.push({
            prodotto: prodotto,
            qta: qta,
            entro: entro
        });
        prodotto.figli.forEach(e => {
            WBS._buildOrder(e.figlio, e.qta, entro.setDate(entro.getDate() - prodotto.reparti[reparto.nome].time), dafare, dacomprare)
        });
    }

    static populateProdotti(reparti) {
        //todo implementazione reale

        const prodotti = {};

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

        //assegnazione figli
        fetched[0].addFiglio(fetched[1], 2);
        fetched[0].addFiglio(fetched[2], 1);
        fetched[0].addFiglio(fetched[3], 1);

        fetched[1].addFiglio(fetched[4], 36);
        fetched[1].addFiglio(fetched[5], 1);
        fetched[1].addFiglio(fetched[6], 1);

        fetched[2].addFiglio(fetched[7], 1);
        fetched[2].addFiglio(fetched[8], 0.15);

        //assegnazione reparti
        fetched[0].addReparto(reparti["CF1"], 1, 1);
        fetched[0].addReparto(reparti["CF2"], 2, 3);

        fetched[1].addReparto(reparti["SLDMNT"], 1, 1);
        fetched[2].addReparto(reparti["SLDMNT"],2,1);
        fetched[3].addReparto(reparti["AF"],3,1);

        fetched[4].addReparto(reparti["SLDMNT"],1, 1);
        fetched[5].addReparto(reparti["SLDMNT"],1, 1);
        fetched[6].addReparto(reparti["SLDMNT"],1, 1);

        fetched[7].addReparto(reparti["MC"],1, 1);
        fetched[8].addReparto(reparti["V"],1, 1);

        fetched.forEach(e => prodotti[e.codice] = e);
        return prodotti;
    }

    static populateReparti() {
        //todo implementazione reale

        const reparti = {};

        const fetched = [
            new Reparto("CF1", "Collaudo finale 1"),
            new Reparto("IF", "Imballaggio finale"),
            new Reparto("AF", "Assemblaggio finale"),
            new Reparto("SLDMNT", "Saldatura e montaggio ruote"),
            new Reparto("MC", "Montaggio cambi"),
            new Reparto("V", "Verniciatura"),
            new Reparto("CF2", "Collaudo finale 2"),
        ];

        fetched.forEach(e => reparti[e.nome] = e);
        return reparti;
    }
}