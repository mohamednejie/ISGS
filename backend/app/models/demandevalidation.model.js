// validation/demandeValidation.js

const Joi = require('joi');

const demandeSchema = Joi.object({
    fileId: Joi.string().optional(),
    filePath: Joi.string().optional(),
    copieNumber: Joi.number().min(1).required(),
    couleur: Joi.string().valid('Noir et blanc', 'Couleur').required(),
    rectoVerso: Joi.string().valid('Oui', 'Non').required(),
});

module.exports = demandeSchema;
