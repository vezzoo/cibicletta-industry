import RepartoAlreadyExistsException from "../exceptions/RepartoAlreadyExistsException";

export default class Prodotto {

    constructor(codice, descrizione, produzione) {
        this.codice = codice;
        this.descrizione = descrizione;

        /**
         * Contiene oggetti:
         *  {
         *      reparto: reparto di produzione,
         *      time: tempo di produzione
         *  }
         * @type {Array}
         */
        this.reparti = [];

        /**
         * Contiene oggetti:
         *  {
         *      figlio: codice del figlio,
         *      qta: quantita richiesta
         *  }
         * @type {Array}
         */
        this.figli = [];

        /**
         *  "INTERNA" o "ESTERNA"
         */
        this.produzione = produzione;
    }

    addReparto(reparto, tempo) {
        if (this.reparti.reduce((a, v) => {
            a = a || v.reparto.equals(reparto);
        }, false))
            throw new RepartoAlreadyExistsException();

        this.reparti.push({
            reparto: reparto,
            time: tempo
        });

        return this;
    }

    addFiglio(figlio, qta){
        if (this.figli.reduce((a, v) => {
            a = a || v.figlio.equals(figlio);
        }, false))
            throw new FiglioAlreadyExistsException();

        this.figli.push({
            figlio: figlio,
            qta: qta
        });

        return this;
    }

    equals(prodotto){
        return this.codice === prodotto.codice;
    }

}