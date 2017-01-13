/**
 * Created by chenchaochao on 17/1/8.
 */
const koa = require('koa')
const koaRouter = require('koa-router')
const interface = require('../index')
const app = koa();
let testfun = function *() {

}
koaRouter('/test',)

app.use(function *(){
    this.body = {
        data: 'hello world',
        msg:this.cookies.get('name1'),
        msg1: this.cookies.get('name'),
        msg2: this.cookies.get('name2'),
        mgs3: this.headers
    };


});

app.listen(3000);