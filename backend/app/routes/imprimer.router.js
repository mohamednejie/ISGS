const express = require('express');
const router = express.Router();
const upload = require('../middlewares/telechargement');


const imprimercontroller = require('../controllers/imprimer.controller');


router.get('/getalldemande', imprimercontroller.getalldemande);
router.get('/getuserdemande/:userId', imprimercontroller.getuserdemande);
router.get('/getonedemande/:demandeId', imprimercontroller.getonedemande);
router.get('/getaccepteddemande', imprimercontroller.getAllAcceptedDemandes);
router.post('/envoyerdemande/:userId', upload.single('file'), imprimercontroller.envoyerdemande);
router.put('/updatedemande/:demandeId', imprimercontroller.updateDemande);
router.delete('/deletedemande/:demandeId', imprimercontroller.deleteDemande);
router.put('/refuserdemande/:demandeId', imprimercontroller.refuserDemande);
router.put('/accepterdemande/:demandeId', imprimercontroller.accepterDemande);
router.delete('/deleteAccepted/:demandeId', imprimercontroller.deleteAcceptedDemande);
router.get('/getuserdemandeattente/:userId',imprimercontroller.getuserdemandeenattente)


module.exports = router;