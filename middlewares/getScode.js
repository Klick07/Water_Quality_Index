/*==============================================
   This middleware gets the s_code using query
   then if not found sends an error message 
   otherwise ataches s_code to req so that it 
   can be used by the findStationByCode repo
   =============================================*/


const checkS_code=(req,res,next)=>{
   const s_code = req.query.station_code || 
   req.params.station_code;

  if (!s_code) {
    return res.status(400).json({
      success: false,
      msg: 'invalid station code'
    })
    
  }
  req.s_code=s_code;// as you need to send it further

  next();
};
module.exports=checkS_code;
