var settings = require('./settings'),
        Db = require('mongodb').Db,
        Connection = require('mongodb').Connection,
        Server = require('mongodb').Server;
        db = new Db(settings.db, new Server(settings.host, settings.port),{safe: true});

/**		
db.open(function(err,db){
    if(err)throw err;
    console.info('mongodb connected');
});

*/

module.exports = db;