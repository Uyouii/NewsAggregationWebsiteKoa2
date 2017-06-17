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
    likes:Object,
    scans:Object,
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

const getUser = async(email)=> {
    return usersModel.find({'email':email},async(err,docs) => {
        if(err) {
            console.log(err);
        }
    });
};

const updateUser = async(email,name,password)=> {
    await usersModel.update({'email':email}, {'$set':{'name':name , 'password':password} } , async(err,docs) => {
        if(err) {
            console.log(err);
        }
    });
};

const addScans = async(email,news_id)=> {

    let user;
    await usersModel.find({'email':email},async(err,docs)=> {
        if(err)
            console.log(err);
        user = docs[0];
    });

    let newstype;
    await newsModel.find({_id:ObjectID(news_id)} , async(err,docs) => {
        if(err) {
            console.log(err);
        }
        newstype = docs[0].type;
    });

    console.log(newstype);
    // console.log(user);
    //更新User的浏览记录
    if(user.scans !== undefined) {
        let scans = user.scans;
        if(scans[newstype] !== undefined) {
           scans[newstype]++;
           console.log("1" + scans);
           await usersModel.update({'email':email},{'$set':{'scans':scans}},async(err,docs)=> {
               if(err){
                   console.log(err)
               }
           });
        }
        else {
            scans[newstype] = 1;
            console.log("2" + scans);
            await usersModel.update({'email':email},{'$set':{'scans':scans}},async(err,docs)=> {
                if(err) {
                    console.log(err)
                }
            })
        }
    }
    else {
        let scans = new Map();
        scans[newstype] = 1;
        console.log("3" + scans);
        await usersModel.update({'email':email},{'$set':{'scans':scans}})
    }

};

const addLikes = async(email,news_id,newstype)=>{

    let user;
    await usersModel.find({'email':email},async(err,docs)=> {
        if(err)
            console.log(err);
        user = docs[0];
    });

    console.log(newstype);

    if(user.likes !== undefined) {
        let likes = user.likes;
        if(likes[newstype] !== undefined) {
            console.log('1');
            likes[newstype].push(news_id);
            await usersModel.update({'email':email},{'$set':{'likes':likes}},async(err,docs)=> {
                if(err){
                    console.log(err)
                }
            });
        }
        else {
            console.log('2');
            let ss = [];
            ss.push(news_id);
            likes[newstype] = ss;
            console.log(likes);
            await usersModel.update({'email':email},{'$set':{'likes':likes}},async(err,docs)=> {
                if(err){
                    console.log(err)
                }
            });
        }
    }
    else {
        console.log('3');
        let likes = new Map();
        let ss = [];
        ss.push(news_id);
        likes[newstype] = ss;
        console.log(likes);
        await usersModel.update({'email':email},{'$set':{'likes':likes}},async(err,docs)=> {
            if(err){
                console.log(err)
            }
        });
    }

};

const deleteLikes = async(email,news_id,newstype)=> {

    let user;
    await usersModel.find({'email':email},async(err,docs)=> {
        if(err)
            console.log(err);
        user = docs[0];
    });

    let likes = user.likes;
    let i = 0;
    for(;i < likes[newstype].length;i++) {
        if(likes[newstype][i] === news_id)
            break;
    }
    likes[newstype].splice(i,1);
    await usersModel.update({'email':email},{'$set':{'likes':likes}},async(err,docs)=> {
        if(err){
            console.log(err)
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
    'addScans': addScans,
    'addLikes':addLikes,
    'getUser':getUser,
    'deleteLikes':deleteLikes,
};