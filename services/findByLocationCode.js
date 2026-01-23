const pool=require('../config/db');

exports.findByNormalizedLocation=async (normalizedLocation) =>{
    const station= await pool.query(`SELECT * FROM stations   WHERE location ILIKE '%'||$1||'%'`,[normalizedLocation]);
    
    return station.rows[0]|| null;
}