
const router = require('koa-router')();
const db = require('./database');

router.prefix('/users');


router.post('/getEmailNumber', async (ctx, next) => {
    const email = ctx.request.body.email || '';
    console.log(email);
    if(email != '') {
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
    if (await db.getEmailNumber(email) == 1) {
        ctx.body = false;
    }
    else {
        await db.insertUser(name,email,password);
        ctx.body = true;
    }
});


module.exports = router;
