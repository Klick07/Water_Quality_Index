const AppError = require("../error/AppError");
const { stationDetailsService } = require("../services/detailsService");
const { searchService } = require("../services/search.service")

exports.searchController = async (req,res,next)=>{
    try{
    const {q} = req.query;
    if(!q){
        throw new AppError("search query is required",400);
    }
    const result = await searchService(q);

    res.status(200).json({success:true,data:result})
    }catch(err){
        next(err);
    }
};

exports.getStationDetailsController = async (req, res, next) => {
  try {
    const { station_code } = req.params;

    if (!station_code) {
      throw new AppError("station_code is required", 400);
    }

    const data = await stationDetailsService(station_code);

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};