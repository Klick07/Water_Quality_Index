

const wqi_parameters=(station,wqiCalc)=>{
       const parameters={
           ph:wqiCalc.calculateAverage(station.ph_min,station.ph_max),
             dissolved_oxygen:wqiCalc.calculateAverage(station.dissolved_oxygen_min,station.dissolved_oxygen_max),
             bod:wqiCalc.calculateAverage(station.bod_min,station.bod_max),
          nitrate:wqiCalc.calculateAverage(station.nitrate_min,station.nitrate_max),
            fecal_coliform:wqiCalc.calculateAverage(station.fecal_coliform_min,station.fecal_coliform_max),
       }
           const wqi=wqiCalc.calculateWQI(station);
            const category=wqiCalc.getCategory(wqi);
             
       
            return {
                wqi,
                parameters,
           category
            };
};
module.exports=wqi_parameters;