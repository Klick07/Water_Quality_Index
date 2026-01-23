const express=require('express');
const router=express.Router();

const checkStation = require('../middlewares/getStation.js');
const locationCheck = require('../middlewares/getLocation.js');
const checkS_code = require('../middlewares/getScode.js');
const attachStationCode = require('../middlewares/attachStationCode.js');
const attachStationCodeUsingLocation = require('../middlewares/attachStationCodeUsingLocation.js');
const {wqiByStationCode, wqibyLocation, allWqiDetails}=require('../controllers/wqiController.js');

/* ===============================
   API: Get WQI by station_code
================================ */
router.get('/',checkS_code,attachStationCode,checkStation,wqiByStationCode
);
/* ===============================
   API: Search WQI by location
================================ */
router.get('/search',locationCheck,attachStationCodeUsingLocation,checkStation,wqibyLocation);

 /*===============================
        API - all wqi detail 
   ===============================*/
   router.get('/detail',checkS_code,attachStationCode,checkStation,allWqiDetails);



module.exports=router;