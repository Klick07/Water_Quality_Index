const express=require('express');
const router=express.Router();

const checkStation = require('../middlewares/getStation.js');
const checkS_code = require('../middlewares/getScode.js');
const { allStateStation, getStationByStateOrLocation, stationParameters, fetchStationData, getWQIByStationCode } = require('../controllers/stationControllers.js');
const attachStationCode = require('../middlewares/attachStationCode.js');
/*=============================================
  API - status of all the stations of the state
  ==============================================*/

  router.get('/wqi',allStateStation);

/* ===============================
   API: Get stations by state/location
================================ */

router.get('/', getStationByStateOrLocation);

/* ===============================
      API - fetch station data
   ===============================*/

   router.get('/:station_code',checkS_code,attachStationCode,checkStation,fetchStationData);

/*================================
    API - get station parameters
  ================================*/
  
 router.get('/:station_code/parameters',checkS_code,attachStationCode,checkStation,stationParameters);

/* ===============================
   API - get WQI by station code
 ================================*/

 router.get('/:station_code/wqi',checkS_code,attachStationCode,checkStation,getWQIByStationCode);

module.exports=router;