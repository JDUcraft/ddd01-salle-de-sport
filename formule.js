export class Formule {
    constructor({
        id, nom, prix, periode,
    }) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.periode = periode;
    }

    changerPrix(nouveauPrix) {
        this.prix = nouveauPrix;
        return this;
    }
}
