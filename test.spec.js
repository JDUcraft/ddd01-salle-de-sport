import { Formule } from './formule';
import { RepositoryEnMemoire } from './repositoryEnMemoire';

function creerFormuleCommandHandler({ creerFormuleCommand, repository }) {
    const {
        id, nom, prix, periode,
    } = creerFormuleCommand;
    const nouvelleFormule = new Formule({
        id, nom, prix, periode,
    });
    repository.creer(nouvelleFormule);
}

function modifierPrixFormuleCommandHandler({ modifierPrixFormuleCommand, repository }) {
    const { id, nouveauPrix } = modifierPrixFormuleCommand;
    const formuleRecuperee = repository.recuperer(id);
    repository.enregistrer(formuleRecuperee.changerPrix(nouveauPrix));
}

function creerFormulePourTest(creerFormuleCommand) {
    const repository = new RepositoryEnMemoire();
    creerFormuleCommandHandler({
        creerFormuleCommand,
        repository,
    });
    return repository;
}

describe('Administration des Formules', () => {
    it('Un commercial crée une formule annuelle', () => {
        const repository = creerFormulePourTest({
            nom: 'formule',
            periode: 'annuelle',
        });

        const formuleExistantes = repository.afficherFormulesExistantes();
        expect(formuleExistantes).toEqual([{ nom: 'formule', periode: 'annuelle' }]);
    });

    it('Un commercial créé une formule mensuelle', () => {
        const repository = creerFormulePourTest({
            nom: 'formule',
            periode: 'mensuelle',
        });

        const formuleExistantes = repository.afficherFormulesExistantes();
        expect(formuleExistantes).toEqual([{ nom: 'formule', periode: 'mensuelle' }]);
    });

    it('Un commercial modifie le prix d\'une formule', () => {
        const repository = creerFormulePourTest({
            id: '1234-5678-9',
            nom: 'formule',
            periode: 'mensuelle',
            prix: 4,
        });

        modifierPrixFormuleCommandHandler({
            modifierPrixFormuleCommand: {
                id: '1234-5678-9',
                nouveauPrix: 10,
            },
            repository,
        });

        const premiereFormuleExistante = repository.afficherFormulesExistantes()[0];
        expect(premiereFormuleExistante).toEqual({
            id: '1234-5678-9',
            nom: 'formule',
            periode: 'mensuelle',
            prix: 10,
        });
    });
});
