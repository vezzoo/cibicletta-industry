export default class Reparto {

    constructor(nome, descrizione, maxDuty = 100) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.maxDuty = maxDuty;
        this.schedule = {};
    }

    registerDuty(prodotto, qta, data) {

        let diff = prodotto.reparti[this.nome].diff;
        let tempoDiProd = prodotto.reparti[this.nome].time;

        for (let i = 0; i < tempoDiProd; i++) {
            const day = new Date(data.setDate(data.getDate() - 1));
            if (!this.schedule[day])
                this.schedule[day] = [];

            this.schedule[day].push({
                prodotto: prodotto,
                qta: qta,
                diff: diff
            })
        }
    }

    getDailyDuty(data) {
        if (!this.schedule[data])
            return 0;
        return this.schedule[data].reduce((a, v) => {
            return v.qta * v.diff;
        }, 0);
    }

    isDutyAvailable(prodotto, qta, data, maxOverhead = 0) {
        let tempoDiProd = prodotto.reparti[this.nome].time;
        let diff = prodotto.reparti[this.nome].diff;
        let val = true;
        for (let i = 0; i < tempoDiProd; i++) {
            const day = new Date(data.setDate(data.getDate() - 1));
            val = val && (this.getDailyDuty(day) + diff * qta) < (this.maxDuty * (1 + maxOverhead / 100));
        }
        return val;
    }

    equals(reparto) {
        return reparto.nome === this.nome;
    }
}