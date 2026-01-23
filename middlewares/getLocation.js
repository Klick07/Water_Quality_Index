/*====================================================
   this  middleware gets the location from the query 
   if not found then returns error otherwise
   sends normalizedLocation so that it can be used 
   other middleware
   ===================================================*/

const locationCheck=(req,res,next)=>{

     const { location } = req.query;
    
      let normalizedLocation;
      
    
      if (!location) {
        return res.status(400).json({
          success: false,
          msg: 'invalid query'
        });
       
      }
    
      normalizedLocation = location.toLowerCase();
      req.normalizedLocation=normalizedLocation;
      next();
}
module.exports=locationCheck;