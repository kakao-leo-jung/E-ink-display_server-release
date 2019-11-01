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
    // mongoose.connect('mongodb://127.0.0.1/' + dbName, { useFindAndModify: false });
    mongoose.connect('mongodb://db/' + dbName, { useFindAndModify: false });
    // mongoose.connect('mongodb://169.56.98.117/' + dbName, {useFindAndModify: false});
}
