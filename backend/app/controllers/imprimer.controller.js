// controllers/demandeController.js
const Imprimer = require('../models/demandeimprimer.model');
const AcceptedDemande = require('../models/demandeaccepter.model');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const UserDemande = require('../models/demandeuser.model');
const Joi = require('joi');
const File = require('../models/file.model');

// Removed import of demandeSchema from '../models/demandevalidation.model'

const demandeSchema = Joi.object({
    fileId: Joi.string().allow(null, ''), // Validate according to your requirements
    filePath: Joi.string().allow('', null),
    copieNumber: Joi.number().min(1).required(),
    couleur: Joi.string().valid('Noir et blanc', 'Couleur').required(),
    rectoVerso: Joi.string().valid('Oui', 'Non').required()
});

exports.envoyerdemande = async (req, res) => {
    const { error, value } = demandeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const userId = req.params.userId; // or req.body.userId, depending on your API design

    try {
        // Check if the user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        // Data for both models
        const commonData = {
            userId: userId,
            ...value,
            datedemande: Date.now()  // Current time for the demande
        };

        // Create the new Demande in Imprimer
        const newImprimerDemande = new Imprimer(commonData);
        const savedImprimerDemande = await newImprimerDemande.save();

        // Create the new Demande in UserDemande
        const newUserDemande = new UserDemande(commonData);
        const savedUserDemande = await newUserDemande.save();

        // Respond with both saved entities
        res.status(201).json({
            imprimerDemande: savedImprimerDemande,
            userDemande: savedUserDemande
        });

    } catch (err) {
        console.error('Error saving demandes:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getuserdemande = async (req, res) => {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid userId" });
    }

    try {
        const demandes = await UserDemande.find({ userId }).populate('userId', 'username');
        if (!demandes.length) {
            return res.status(404).json({ message: 'No demandes found for this user' });
        }
        
        res.json(demandes.map(demande => ({
            ...demande.toObject(),
            username: demande.userId.username  // Ensuring username is easy to access on the client side
        })));
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving data: ' + err.message });
    }
};


exports.getalldemande = async (req, res) => {
    try {
        const demandes = await Imprimer.find().populate('userId', 'username -_id'); // This populates only username, excludes _id
        res.json(demandes);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving data: ' + err.message });
    }
};

// Fetch specific user's demandes
exports.getuserdemande = async (req, res) => {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid userId" });
    }

    try {
        const demandes = await UserDemande.find({ userId }).populate('userId', 'username');
        if (!demandes.length) {
            return res.status(404).json({ message: 'No demandes found for this user' });
        }
        
        res.json(demandes.map(demande => ({
            ...demande.toObject(),
            username: demande.userId.username  // Ensuring username is easy to access on the client side
        })));
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving data: ' + err.message });
    }
};
exports.getuserdemandeenattente = async (req, res) => {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid userId" });
    }

    try {
        const demandes = await AcceptedDemande.find({ userId }).populate('userId', 'username');
        if (!demandes.length) {
            return res.status(404).json({ message: 'No demandes found for this user' });
        }
        
        res.json(demandes.map(demande => ({
            ...demande.toObject(),
            username: demande.userId.username  // Ensuring username is easy to access on the client side
        })));
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving data: ' + err.message });
    }
};

// Fetch and display one demande
exports.getonedemande = async (req, res) => {
    const demandeId = req.params.demandeId;

    if (!mongoose.Types.ObjectId.isValid(demandeId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }

    try {
        const demande = await UserDemande.findById(demandeId).populate('userId', 'username');
        if (!demande) {
            return res.status(404).json({ message: 'Demande not found' });
        }
        res.json({
            ...demande.toObject(),
            username: demande.userId.username  // Including username in the response
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving the demande: ' + err.message });
    }
};
exports.deleteDemande = async (req, res) => {
    const demandeId = req.params.demandeId;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(demandeId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }

    try {
        const demande = await UserDemande.findById(demandeId);
        if (!demande) {
            return res.status(404).json({ message: 'Demande not found' });
        }

        // Check if the demande is in an appropriate state to be deleted
        if (demande.etat !== 'En attente' && demande.etat !== 'Refusée'&& demande.etat !== 'reçu') {
            return res.status(403).json({ message: 'Only demandes in "En attente" or "Refusée" state can be deleted' });
        }

        // Delete the demande
        await UserDemande.findByIdAndDelete(demandeId);


     const demandes = await Imprimer.findById(demandeId);
        if (!demandes) {
            return res.status(404).json({ message: 'Demandes not found' });
        }

        // Check if the demande is in an appropriate state to be deleted
        if (demandes.etat !== 'En attente' ) {
            return res.status(403).json({ message: 'Only demandes in "En attente"  state can be deleted' });
        }

        // Delete the demande
        await UserDemande.findByIdAndDelete(demandeId);

        res.status(200).json({ message: 'Demande successfully deleted' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting the demande: ' + err.message });
    }
};
exports.updateDemande = async (req, res) => {
    const demandeId = req.params.demandeId;

    if (!mongoose.Types.ObjectId.isValid(demandeId)) {
        return res.status(400).json({ error: "Invalid ID format." });

    }

    const { error, value } = demandeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const demande = await UserDemande.findById(demandeId);
        if (!demande) {
            return res.status(404).json({ message: 'Demande not found' });
        }
        if (demande.etat !== 'En attente') {
            return res.status(403).json({ message: 'Only demandes in "En attente" state can be updated' });
        }

        const updatedDemande = await UserDemande.findByIdAndUpdate(demandeId, value, { new: true });
        
        res.json(updatedDemande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ajout dans controllers/demandeController.js

exports.refuserDemande = async (req, res) => {
    const demandeId = req.params.demandeId;

    if (!mongoose.Types.ObjectId.isValid(demandeId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }

    try {
        const demande = await Imprimer.findById(demandeId);
        if (!demande) {
            return res.status(404).json({ message: 'Demande not found' });
        }

        const updatedDemande = await Imprimer.findByIdAndUpdate(
            demandeId, 
            { etat: 'Refusée' }, 
            { new: true }
        );

        if (!updatedDemande) {
            return res.status(404).json({ message: 'Error updating demande' });
        }

        const acceptedDemande = await AcceptedDemande.create({
            userId: updatedDemande.userId,
            demandeId: updatedDemande._id,
            dateAcceptation: new Date(),
            etat: updatedDemande.etat,
            copieNumber: updatedDemande.copieNumber || 0, // Fallback to 0 if undefined
            couleur: updatedDemande.couleur,
            rectoVerso: updatedDemande.rectoVerso,
            datedemande: updatedDemande.createdAt || new Date()
        });

        const userDemande = await UserDemande.create({
            userId: updatedDemande.userId,
            demandeId: updatedDemande._id,
            datedemande: new Date(),
            etat: updatedDemande.etat,
            copieNumber: updatedDemande.copieNumber, // Assumed necessary
            couleur: updatedDemande.couleur,
            rectoVerso: updatedDemande.rectoVerso
        });

        await Imprimer.findByIdAndDelete(demandeId);

        res.status(200).json({
            message: 'Demande successfully refused and recorded in other models.',
            acceptedDemande: acceptedDemande,
            userDemande: userDemande,
            copieNumber: updatedDemande.copieNumber // Displaying the copieNumber
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while processing the demande: ' + err.message });
    }
};





exports.accepterDemande = async (req, res) => {
    const demandeId = req.params.demandeId;

    if (!mongoose.Types.ObjectId.isValid(demandeId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }

    try {
        const demande = await Imprimer.findById(demandeId);
        if (!demande) {
            return res.status(404).json({ message: 'Demande not found' });
        }

        const updatedDemande = await Imprimer.findByIdAndUpdate(
            demandeId, 
            { etat: 'Acceptée' }, 
            { new: true }
        );

        if (!updatedDemande) {
            return res.status(404).json({ message: 'Error updating demande' });
        }

        const acceptedDemande = await AcceptedDemande.create({
            userId: updatedDemande.userId,
            demandeId: updatedDemande._id,
            dateAcceptation: new Date(),
            etat: updatedDemande.etat,
            copieNumber: updatedDemande.copieNumber || 0, // Fallback to 0 if undefined
            couleur: updatedDemande.couleur,
            rectoVerso: updatedDemande.rectoVerso,
            datedemande: updatedDemande.createdAt || new Date()
        });

        const userDemande = await UserDemande.create({
            userId: updatedDemande.userId,
            demandeId: updatedDemande._id,
            datedemande: new Date(),
            etat: updatedDemande.etat,
            copieNumber: updatedDemande.copieNumber, // Assumed necessary
            couleur: updatedDemande.couleur,
            rectoVerso: updatedDemande.rectoVerso
        });

        await Imprimer.findByIdAndDelete(demandeId);

        res.status(200).json({
            message: 'Demande successfully Accepted and recorded in other models.',
            acceptedDemande: acceptedDemande,
            userDemande: userDemande,
            copieNumber: updatedDemande.copieNumber // Displaying the copieNumber
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while processing the demande: ' + err.message });
    }
};



exports.getAllAcceptedDemandes = async (req, res) => {
    try {
        // Query to find all demandes with 'etat' set to 'Acceptée', and populate necessary fields
        const demandes = await AcceptedDemande.find({ etat: 'Acceptée' })
            .populate({
                path: 'userId',  // Populating data from the User model
                select: 'username'  // Selecting only the username from the User model
            })
            .select('copieNumber couleur datedemande dateAcceptation') // Selecting fields to be displayed from AcceptedDemande
            .lean();  // Using lean() to get a plain JavaScript object, which improves performance

        if (demandes.length === 0) {
            return res.status(200).json({ message: 'No accepted demandes found', data: [] });
        }

        // Mapping over each demande to format the response
        const formattedDemandes = demandes.map(demande => ({
            demandeId:demande._id,
            username: demande.userId.username,  // username from the populated User data
            copieNumber: demande.copieNumber,    // Number of copies from AcceptedDemande
            couleur: demande.couleur,            // Color info from AcceptedDemande
            datedemande: demande.datedemande,    // Original request date from AcceptedDemande
            dateAcceptation: demande.dateAcceptation  // Acceptation date from AcceptedDemande
        }));

        res.status(200).json(formattedDemandes);
    } catch (err) {
        console.error('Failed to retrieve accepted demandes:', err);
        res.status(500).json({ error: 'An error occurred while retrieving accepted demandes: ' + err.message });
    }
};
exports.deleteAcceptedDemande = async (req, res) => {
    const demandeId = req.params.demandeId; 

    if (!mongoose.Types.ObjectId.isValid(demandeId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }

    try {
        const demande = await AcceptedDemande.findById(demandeId);
        if (!demande) {
            return res.status(404).json({ message: 'Demande not found.' });
        }

        if (demande.etat !== 'Acceptée') {
            return res.status(403).json({ message: 'Only demandes that are accepted can be deleted.' });
        }

        // Create a record in UserDemande before deleting from AcceptedDemande
        const userDemande = await UserDemande.create({
            userId: demande.userId,
            demandeId: demande._id,
            datedemande: new Date(),
            etat: 'Reçu',
            copieNumber: demande.copieNumber,
            couleur: demande.couleur,
            rectoVerso: demande.rectoVerso
        });

        // Once UserDemande record is created, delete the demande from AcceptedDemande
        await AcceptedDemande.findByIdAndDelete(demandeId);
        res.status(200).json({
            message: 'Accepted demande has been successfully deleted and recorded in UserDemande.',
            userDemande: userDemande // Optionally return details of the UserDemande
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting the demande: ' + err.message });
    }
};