const { Pool } = require('pg');

const PG_URI = 'postgres://truepmry:4_wQuczNxHr_pxlrwJyBuUwgmPS9RP8N@jelani.db.elephantsql.com/truepmry';

const pool = new Pool({
    connectionString: PG_URI
})

module.exports = {
    query: (text, params, callback) => {
        console.log('query executed', text);
        return pool.query(text, params, callback);
    }
}