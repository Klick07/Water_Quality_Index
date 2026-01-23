const wqi_parameters = require('../services/wqi_parameters');
const wqiCalc=require('../middlewares/wqiCalc')

const wqiByStationCode=(req,res)=>{

    const station=req.station;

  const wqi = wqiCalc.calculateWQI(station);// req.station as you want to get it from another scope 

  const report = wqiCalc.getCategory(wqi);

  res.status(200).json({
    success: true,
    wqi_result: wqi,
    data: report
  });
};
 const wqibyLocation=(req,res)=>{
  

  const wqi = wqiCalc.calculateWQI(req.station);
  const stats = wqiCalc.getCategory(wqi);

  res.status(200).json({
    success: true,
    wqi_result: wqi,
    data: stats
  });
}

const allWqiDetails= (req,res)=>{
         
          const {parameters,wqi,category}=wqi_parameters(req.station,wqiCalc)
         res.status(200).json({success:true,data:parameters,status:category,wqi_result:wqi});

   }
module.exports={wqiByStationCode,wqibyLocation,allWqiDetails};