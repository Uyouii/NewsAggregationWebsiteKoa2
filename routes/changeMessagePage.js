/**
 * Created by 泰佑 on 2017/5/23.
 */


const router = require('koa-router')();

router.prefix('/changeMessagePage');

router.get('/', async (ctx, next) => {
    await ctx.render('changeMessage');
});

module.exports = router;