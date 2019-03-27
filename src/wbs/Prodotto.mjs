import RepartoAlreadyExistsException from "../exceptions/RepartoAlreadyExistsException";
import FiglioAlreadyExistsException from "../exceptions/FiglioAlreadyExistsException";
import NoDutyAvailableException from "../exceptions/NoDutyAvailableException";

export default class Prodotto {

    constructor(codice, descrizione, produzione, giacenza = 0) {
        this.codice = codice;
        this.descrizione = descrizione;
        this.giacenza = giacenza;

        /**
         * Contiene oggetti:
         *  {
         *      reparto: reparto di produzione,
         *      time: tempo di produzione
         *  }
         * @type {Array}
         */
        this.reparti = {};

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

    addReparto(reparto, tempo, difficolta) {
        if (this.reparti[reparto.nome])
            throw new RepartoAlreadyExistsException();

        this.reparti[reparto.nome] = {
            reparto: reparto,
            time: tempo,
            diff: difficolta
        };

        return this;
    }

    getReparto(qta, data) {
        let reparto = null;
        let tempo = 100000000000000;

        Object.keys(this.reparti).forEach(i => {
            if (this.reparti[i].reparto.isDutyAvailable(this, qta, data) && tempo > this.reparti[i].time) {
                reparto = this.reparti[i].reparto;
                tempo = this.reparti[i].time;
            }
        });

        if (reparto === null) throw new NoDutyAvailableException();
        return reparto;
    }

    addFiglio(figlio, qta) {
        if (this.figli.reduce((a, v) => {
            return a || v.figlio.equals(figlio);
        }, false))
            throw new FiglioAlreadyExistsException();

        this.figli.push({
            figlio: figlio,
            qta: qta
        });

        return this;
    }

    equals(prodotto) {
        return this.codice === prodotto.codice;
    }

}