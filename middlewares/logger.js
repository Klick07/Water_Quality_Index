/* =============================================================== 
      This global middleware sends a terminal response to check 
    when the api was hit which api was it and what was the method
   =============================================================== */

const logger=(req,res,next)=>{
    console.log(`[${new Date().toISOString()}],${req.method},${req.originalUrl}`);
    next();
}
module.exports=logger;