export default class Reparto {

    constructor(nome, descrizione, carico) {
        this.nome = nome;
        this.descrizione = descrizione;
    }

    equals(reparto) {
        return reparto.nome === this.nome;
    }
}