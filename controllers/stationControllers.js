const wqiCalc = require('../middlewares/wqiCalc');
const wqi_parameters = require('../services/wqi_parameters');
const pool = require('../config/db');

const allStateStation = async (req, res) => {
  const { state } = req.query;
  let stations;
  if (state) {
     const normalizedState = state.toLowerCase();
     const result = await pool.query(`SELECT * FROM stations WHERE LOWER(state) = $1`, [normalizedState]);
     stations = result.rows;
  } else {
     // Query all stations from database
     const result = await pool.query('SELECT * FROM stations');
     stations = result.rows;
  }
  if (stations.length === 0) {
    return res.status(404).json({ success: false, msg: 'no station found' });
  }
  const result = stations.map(s => {
    const wqi = wqiCalc.calculateWQI(s);
    const category = wqiCalc.getCategory(wqi);
    return {
      station_code: s.station_code,
      location: s.location,
      state: s.state,
      wqi,
      category,
    }
  });
  res.status(200).json({ success: true, data: result })
};





const fetchStationData = (req, res) => {

  res.status(200).json({ success: true, data: req.station })
}

const getStationByStateOrLocation = async (req, res) => {
  const { state } = req.query;
  const { location } = req.query;

  let normalizedState;
  let normalizedLocation;

  if (state) {
    normalizedState = state.toLowerCase();
  }

  if (location) {
    normalizedLocation = location.toLowerCase();
  }

  let stations;

  if (!state && !location) {
    return res.status(400).json({
      success: false,
      msg: 'either state or location query parameter is required'
    });
  }

  if (!location) {
    // stations = await gangaData.filter(
    //   t => t.state.toLowerCase() === normalizedState
    // );

    const result=await pool.query(`SELECT * FROM stations WHERE LOWER(state)=$1`,[normalizedState])

    stations=result.rows;
  } else {
    // stations = await gangaData.filter(
    //   t => t.location.toLowerCase().includes(normalizedLocation)
    // );

    const result=await pool.query(`SELECT * FROM stations WHERE location ILIKE '%'|| $1||'%'`,[normalizedLocation]);
    stations=result.rows;
  }

  res.status(200).json({
    success: true,
    count: stations.length,
    data: stations
  });
}





const stationParameters = (req, res) => {
  const station = req.station;

  const { parameters } = wqi_parameters(station, wqiCalc);

  res.status(200).json({ success: true, data: parameters })

}

const getWQIByStationCode = (req, res) => {
  const station = req.station;

  if (!station) {
    return res.status(404).json({ success: false, msg: 'Station not found' });
  }

  const wqi = wqiCalc.calculateWQI(station);
  const category = wqiCalc.getCategory(wqi);

  res.status(200).json({
    success: true,
    data: {
      station_code: station.station_code,
      location: station.location,
      state: station.state,
      wqi,
      category
    }
  });
}

module.exports = {
  allStateStation,
  getStationByStateOrLocation,
  fetchStationData,
  stationParameters,
  getWQIByStationCode
};