const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imprimerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assurez-vous que le modèle User existe.
        required: true
    },
    fileId: {
        type: Schema.Types.ObjectId,
        ref: 'File', // Assurez-vous que le modèle File existe si vous utilisez cette référence.
        default: null // Pensez à supprimer ce default si chaque demande doit avoir un fichier.
    },
    filePath: {
        type: String,  // Champ pour stocker le chemin du fichier.
        required: false // Considérez rendre ce champ requis si chaque demande doit inclure un fichier.
    },
    etat: {
        type: String,
        enum: ['En attente', 'Acceptée', 'Refusée','reçu'],
        default: 'En attente'
    },
    copieNumber: {
        type: Number,
        required: true
    },
    couleur: {
        type: String,
        enum: ['Noir et blanc', 'Couleur'],
        default: 'Noir et blanc',
        required: true
    },
    datedemande: {
        type: Date,
        default: Date.now
    },
    rectoVerso: {
        type: String,
        enum: ['Oui', 'Non'],
        default: 'Non',
        required: true
    },
   
});

const Imprimer = mongoose.model('Imprimer', imprimerSchema);

module.exports = Imprimer;
