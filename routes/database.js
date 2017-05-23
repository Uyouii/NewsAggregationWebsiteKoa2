/**
 * Created by 泰佑 on 2017/5/18.
 */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newsSpider');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function () {
    console.log('mongodb connect successfully!');
});

const newsSchema = new mongoose.Schema({
    type:String,
    href:String,
    title:String,
    datetime:String,
    content:Object

});
const newsModel = mongoose.model('news',newsSchema);

const usersSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    likesType:Object
});

const usersModel = mongoose.model('users',usersSchema);


const getTypeNews = async(type) => {
    return newsModel.find({'type':type},async(err,docs) => {
        if(err) {
            console.log(err);
        }
    });
};

let ObjectID = require('mongodb').ObjectID;

const getNewsContent = async(id) => {
    return newsModel.find({_id:ObjectID(id)} , async(err,docs) => {
        if(err) {
            console.log(err);
        }
    })
};

const getEmailNumber = async(email) => {
  return usersModel.find({'email':email}, async(err,docs) => {
      if(err) {
          console.log(err);
      }
  }).count()
};

const insertUser = async(name,email,password) => {
    let user = new usersModel({
        name:name,
        email:email,
        password:password
    });
    user.save( async (err,doc) => {
        if(err) {
            console.log('save error:' + err);
        }
        else {
            console.log('save success\n' + doc);
        }
    })
};

const getUserNumber = async (email, password)=> {
    //返回email和password匹配的用户的个数
    return usersModel.find({'email':email,'password':password}, async(err,docs) => {
        if(err) {
            console.log(err);
        }
    }).count()
};

const getUserName = async(email) => {
     return usersModel.find({'email':email},async(err,docs) => {
        if(err) {
            console.log(err);
        }
    });
};

const updateUser = async(email,name,password)=> {
    usersModel.update({'email':email}, {'$set':{'name':name , 'password':password} } , async(err,docs) => {
        if(err) {
            console.log(err);
        }
    });
};


module.exports = {
    'getTypeNews': getTypeNews,
    'getNewsContent': getNewsContent,
    'getEmailNumber': getEmailNumber,
    'insertUser':insertUser,
    'getUserNumber': getUserNumber,
    'getUserName': getUserName,
    'updateUser' : updateUser,
};