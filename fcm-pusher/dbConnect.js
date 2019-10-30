var mongoose = require('mongoose');

/*

    MongoDB 에 연결해주는 커스텀 DB 커넥션 모듈

*/
module.exports = (dbName) => {
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function () {
        /* MongoDB 와 연결됨. */
        console.log("Connected to MongoDB server : " + dbName);
    });
    mongoose.connect('mongodb://db/' + dbName, { useFindAndModify: false });
}
