/*====================
 Import express 
  ====================*/

const express = require('express');
const app = express();

/*======================================
  import the required global middlewares 
  ======================================*/

const logger=require('./middlewares/logger.js');

/*=======================
      calling routers
  =======================*/


const routwqi = require('./routers/routwqi.js');

const routStations = require('./routers/routStations.js');

/* ============================
      parse json data
   ============================*/

app.use(express.json());

/* =========================
   call public folder
   =========================*/

app.use(express.static('public'));
app.use(logger);
app.use('/api/stations',routStations);
app.use('/api/wqi',routwqi);



/* ===============================
            Server start
================================ */
app.listen(5000, () => {
  console.log('Server listening at port 5000');
});
  