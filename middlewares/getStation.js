/*  =====================================================
    This middleware gets the station found by the repo
    which is then attached to the attachStationCode and 
     then throws error if the station is not found
    =====================================================*/

const checkStation=(req,res,next)=>{
  if (!req.station) {
    return res.status(404).json({
      success: false,
      msg: 'station not found'
    });
  }
  next();
}
module.exports=checkStation;