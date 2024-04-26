const mongoose = require('mongoose');

const acceptedDemandeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assures that this references the User model
    },
    demandeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Imprimer'
         // Keeps a reference to the original 'Imprimer' document
    },
    dateAcceptation: {
        type: Date,
        default: Date.now // Sets the default to the current date
    },
    etat: {
        type: String,
        default: 'Acceptée' // Default state as 'Accepted'
    },
    copieNumber: {
        type: Number, // The number of copies requested
        required: true
    },
    couleur: {
        type: String,
        enum: ['Noir et blanc', 'Couleur'], // Restricts to these values
        default: 'Noir et blanc'
    },
    rectoVerso: {
        type: String,
        enum: ['Oui', 'Non'], // Whether the printing is double-sided or not
        default: 'Non'
    },
    datedemande: {
        type: Date, // The date when the demande was originally made
        default: Date.now
    }
});

const AcceptedDemande = mongoose.model('AcceptedDemande', acceptedDemandeSchema);

module.exports = AcceptedDemande;
