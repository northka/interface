/**
 * Created by chenchaochao on 17/1/8.
 */
'use strict'
const koa = require('koa')
const koaRouter = require('koa-router')()
const interfaces = require('../index')
const app = koa();
let testfun = function *(test) {
    console.log(12312)
    console.log(test)
    this.body ="test"
}

koaRouter.get('/test',interfaces(testfun ,{
    parameter: 'test'
}))

app.use(koaRouter.routes());

app.listen(3000);