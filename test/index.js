/**
 * Created by chenchaochao on 17/1/8.
 */
var koa = require('koa');
var app = koa();

app.use(function *(){
    this.body = 'Hello World';
});

app.listen(3000);