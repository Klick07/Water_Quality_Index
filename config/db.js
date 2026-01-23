const {Pool} = require('pg');
const pool = new Pool({
    user:'rpsfv',
    host:'localhost',
    database:'gangadata',
    password:'postgres123',
    port:5432,

});
 
module.exports = pool;