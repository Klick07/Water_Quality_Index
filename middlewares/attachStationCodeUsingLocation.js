const {findByNormalizedLocation}=require('../services/findByLocationCode');
const attachStationCodeUsingLocation= async (req,res,next)=>{
     const station = await findByNormalizedLocation(req.normalizedLocation);
     req.station=station;
    next();
}
module.exports=attachStationCodeUsingLocation;