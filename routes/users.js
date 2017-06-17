
const router = require('koa-router')();
const db = require('./database');

router.prefix('/users');


router.post('/getEmailNumber', async (ctx, next) => {
    const email = ctx.request.body.email || '';
    console.log(email);
    if(email !== '') {
        ctx.body = await db.getEmailNumber(email);
    }

    else {
        ctx.body = "";
        console.log("id is null");
    }
});

router.post('/addUser', async (ctx, next) => {
    const name = ctx.request.body.username || '';
    const email = ctx.request.body.email || '';
    const password = ctx.request.body.password || '';
    if (await db.getEmailNumber(email) === 1) {
        ctx.body = false;
    }
    else {
        await db.insertUser(name,email,password);
        ctx.body = true;
    }
});

router.post('/checkUser',async(ctx,next)=>{
    const email = ctx.request.body.email || '';
    const password = ctx.request.body.password || '';
    console.log('email: ' + email + " password: " + password);
    ctx.body = await db.getUserNumber(email, password) > 0;
});

router.post('/getUserName',async(ctx,next)=>{
    const email = ctx.request.body.email || '';
    console.log('email: ' + email);
    let user = await db.getUserName(email);
    ctx.body = user[0]['name'];
});

router.post('/getUser',async(ctx,next)=>{
    const email = ctx.request.body.email || '';
    console.log('email: ' + email);
    let user = await db.getUserName(email);
    ctx.body = user[0];
});


router.post('/changeUserMessage',async(ctx,next)=> {
    const name = ctx.request.body.username || '';
    const email = ctx.request.body.email || '';
    const password = ctx.request.body.password || '';

    await db.updateUser(email,name,password);

    ctx.body = true;
});

router.post('/addScans',async(ctx,next)=> {
    const email = ctx.request.body.email || '';
    const news_id = ctx.request.body.news_id || ' ';
    const newsType = ctx.request.body.newsType || ' ';
    await db.addScans(email,news_id,newsType);

    ctx.body = true;

});

router.post('/addLikes',async(ctx,next)=>{
    const email = ctx.request.body.email || '';
    const news_id = ctx.request.body.news_id || ' ';
    const newsType = ctx.request.body.newsType || ' ';
    await db.addLikes(email,news_id,newsType);

    ctx.body = true;
});

router.post('/deleteLikes',async(ctx,next)=>{
    const email = ctx.request.body.email || '';
    const news_id = ctx.request.body.news_id || ' ';
    const newsType = ctx.request.body.newsType || ' ';
    await db.deleteLikes(email,news_id,newsType);

    ctx.body = true;
});


module.exports = router;
