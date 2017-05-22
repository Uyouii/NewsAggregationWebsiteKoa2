/**
 * Created by 泰佑 on 2017/5/20.
 */

const router = require('koa-router')();

router.prefix('/register');

router.get('/', async (ctx, next) => {
    await ctx.render('register');
});

module.exports = router;