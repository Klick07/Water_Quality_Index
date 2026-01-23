const pool=require('../config/db');

const findByStationCode= async(s_code)=>{
    const station = await pool.query(`SELECT * FROM stations WHERE LOWER(station_code) = LOWER($1) `,[s_code]);
    return station.rows[0]||null;
}

module.exports = findByStationCode;