/**
 * Created by 泰佑 on 2017/5/18.
 */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newsSpider');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function () {
    console.log('connect successfully!');
});

const newsSchema = new mongoose.Schema({
    type:String,
    href:String,
    title:String,
    datetime:String,
    content:Object

});
const newsModel = mongoose.model('news',newsSchema);

const getTypeNews = async(type) => {
    return newsModel.find({'type':type},async(err,docs) => {
        if(err) {
            console.log(err);
        }
        return docs;
    });
};

module.exports = {
    'getTypeNews': getTypeNews,
};