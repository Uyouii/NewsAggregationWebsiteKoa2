const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.redirect('homepage');
});

router.get('/homepage', async (ctx, next) => {
    await ctx.render('homepage')
});

router.get('/login', async (ctx, next) => {
    await ctx.render('login');
});


router.get('/changeMessagePage', async (ctx, next) => {
    await ctx.render('changeMessage');
});

router.get('/newspage', async (ctx, next) => {
    await ctx.render('newspage')
});

router.get('/register', async (ctx, next) => {
    await ctx.render('register');
});

router.get('/userpage',async (ctx,next) => {
    await ctx.render('userpage');
});

module.exports = router;
