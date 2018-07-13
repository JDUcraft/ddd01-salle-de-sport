import * as _ from 'lodash';

export class RepositoryEnMemoire {
    constructor() {
        this.formulesExistantes = [];
    }

    creer(nouvelleFormule) {
        this.formulesExistantes.push(nouvelleFormule);
    }

    afficherFormulesExistantes() {
        return this.formulesExistantes;
    }

    recuperer(id) {
        return this.formulesExistantes.find((formule) => formule.id === id);
    }

    enregistrer(formuleChangee) {
        const formulesExistantesToto = _.remove(formuleChangee,
            (formule) => formule.id === formuleChangee.id);
        formulesExistantesToto.push(formuleChangee);
        _.remove(this.formulesExistantes, formule => true);
        this.formulesExistantes.push(...formulesExistantesToto);
    }
}
