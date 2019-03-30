import Prodotto from "./Prodotto";
import Reparto from "./Reparto";
import getConnection from "../persistence/db.connect"
import Sequelize from "sequelize";

export default class WBS {

    async init(){
        this.reparti = await WBS.populateReparti();
        this.prodotti = await WBS.populateProdotti(this.reparti);
        return this;
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

        const necessitaProduzione = [];
        const necessitaOrdine = [];

        distinta.forEach(prod => {
            let prodotto = this.prodotti[prod.prodotto];
            let ordinato = prod.qta;
            let fabbisogno = ordinato - prodotto.giacenza;

            if(fabbisogno > 0)
                WBS._buildOrder(prodotto, ordinato, dataConsegna, necessitaProduzione, necessitaOrdine);
        });
        return {
            prod: necessitaProduzione,
            buy: necessitaOrdine
        }
    }

    static _buildOrder(prodotto, qta, entro, dafare, dacomprare){

        if(prodotto.produzione === "ESTERNA"){
            dacomprare.push({
                prodotto: prodotto.codice,
                qta: qta,
                entro: entro
            });
            return;
        }

        let reparto = prodotto.getReparto(qta, entro);
        reparto.registerDuty(prodotto, qta, entro);
        dafare.push({
            prodotto: prodotto.codice,
            qta: qta,
            entro: entro
        });
        prodotto.figli.forEach(e => {
            WBS._buildOrder(e.figlio, e.qta, new Date(entro.setDate(entro.getDate() - prodotto.reparti[reparto.nome].time)), dafare, dacomprare)
        });
    }

    static async populateProdotti(reparti) {
        const prodotti = {};

        let sons;
        let production;
        let rows = await getConnection("Products").findAll({
            attributes: ['codice', 'description', 'production']
        });

        for(let e of rows)
            prodotti[e.codice] = new Prodotto(e.codice, e.description, e.production);

        for(let e of rows){
            sons = await getConnection("Products_sons").findAll({
                where: {father: e.codice},
                attributes: ["son", "qta"]
            });

            production = await getConnection("Product_Divisions").findAll({
                where: {prodotto: e.codice},
                attributes: ["reparto", "tempo_produzione", "difficolta"]
            });

            sons.forEach(s => prodotti[e.codice].addFiglio(prodotti[s.son], s.qta));
            production.forEach(s => prodotti[e.codice].addReparto(reparti[s.reparto], s.tempo_produzione, s.difficolta));
        }

        console.log(`Populated products with ${rows.length} elements, ${sons.length} hierarchy and ${production.length} divisions.`);

        return prodotti;
    }
    static async populateReparti() {

        const reparti = {};

        let rows = await getConnection("Divisions").findAll({
            attributes: ['codice', 'description', 'caricoMassimo']
        });
        rows.forEach(e => reparti[e.codice] = new Reparto(e.codice, e.description, e.caricoMassimo));

        console.log(`Populated divisions with ${rows.length} elements.`);

        return reparti;
    }
}