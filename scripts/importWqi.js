const fs=require('fs');
const path = require('path');

const pool=require('../config/db');

const raw=JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/gangaData.json'),'utf-8') );
    const data=raw.stations;

const importData=async ()=>{
for(const row of data){
    await pool.query(`INSERT INTO stations
( station_code ,
  location ,
  state ,

  temperature_min ,
  temperature_max ,

  dissolved_oxygen_min ,
  dissolved_oxygen_max ,

  ph_min ,
  ph_max ,

  conductivity_min ,
  conductivity_max,

  bod_min ,
  bod_max ,

  nitrate_min ,
  nitrate_max ,

  fecal_coliform_min ,
  fecal_coliform_max ,

  total_coliform_min ,
  total_coliform_max ,

  fecal_streptococci_min ,
  fecal_streptococci_max ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
  ON CONFLICT (station_code) DO NOTHING`,[
  row.station_code ,
  row.location ,
  row.state ,

  row.temperature_min ,
  row.temperature_max ,

  row.dissolved_oxygen_min ,
  row.dissolved_oxygen_max ,

  row.ph_min ,
  row.ph_max ,

  row.conductivity_min ,
  row.conductivity_max ,

  row.bod_min ,
  row.bod_max ,

  row.nitrate_min ,
  row.nitrate_max ,

  row.fecal_coliform_min ,
  row.fecal_coliform_max ,

  row.total_coliform_min ,
  row.total_coliform_max ,

  row.fecal_streptococci_min ,
  row.fecal_streptococci_max
    ]);

}
console.log(`Imported ${data.length} rows`);
process.exit();
}
importData().catch(err=>{
    console.error(err);
    process.exit(1);
});