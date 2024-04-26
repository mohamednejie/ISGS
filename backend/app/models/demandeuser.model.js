const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDemandeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Ensure the User model exists.
        required: true
    },
    datedemande: {
        type: Date,
        default: Date.now
    },
    couleur: {
        type: String,
        enum: ['Noir et blanc', 'Couleur'],
        default: 'Noir et blanc',
        required: true
    },
    rectoVerso: {
        type: String,
        enum: ['Oui', 'Non'],
        default: 'Non',
        required: true
    },
    copieNumber: {
        type: Number,
       
    },    fileId: {
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
        enum: ['En attente', 'Acceptée', 'Refusée','Reçu'],
        default: 'En attente'
    }
});

const UserDemande = mongoose.model('UserDemande', userDemandeSchema);
module.exports = UserDemande;
