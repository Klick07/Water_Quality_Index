/* ======================================================
   this middlewere attaches the station found using repo 
   to so that the it's available for next middleware
   ======================================================*/


const findByStationCode = require('../services/findByStationCode')
const attachStationCode=async (req,res,next)=>{
    const station=await findByStationCode(req.s_code);
     req.station=station;
     next();
    
};
module.exports=attachStationCode;