exports.errorResponse = (err,req,res,next)=>{
    console.log("🔥 ERROR OBJECT:", err);
  console.log("🔥 ERROR TYPE:", err.constructor.name);
  console.log("🔥 isOperational:", err.isOperational);
    const statusCode = err.statusCode||500;//
    const status = statusCode >= 500?"error":"fail";

    res.status(statusCode).json({
        success:false,
        status,
        message:err.isOperational ? err.message :"Internal Server Error",
        errors:err.errors||null,
    });
    
};

