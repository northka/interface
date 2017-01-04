/**
 * Created by chenchaochao on 17/1/2.
 */
const coBody  = require('co-body')
const config  = require('./config').config
const formy   = require('./formy')
const valiate = require('./valiate')

function generator(fn){
    const params = [],length = arguments.length
    for(let i = 1; i< length; i++){
        params.push(arguments[i])
    }
    return function*(next){
        let beginIndex = 0,body
        if(params[0].isConfig){
            beginIndex = 1
            if(params[0].raw){
                fn.call(this,next)
                return
            }
        }
        if(['GET'].indexOf(this.method.toUpperCase()) == -1)
        try{
            if(config.json && this.is('json')){
                body = yield coBody.json(this, {encoding: config.encoding, limit: config.jsonLimit})
            }else if(config.urlencoded && this.is('urlencoded')){
                body = yield coBody.form(this, {encoding: config.encoding, limit: config.formLimit})
            }else if(config.text && this.is('text')){
                body = yield coBody.text(this, {encoding: config.encoding, limit: config.textLimit})
            }else if(config.multipart && this.is('multipart')){
                body = yield formy(this, config.formidable)
            }
        }catch(e){
            if(typeof config.onError == 'function') {
                config.onError.call(this, e)
            }else {
                throw e
            }
        }
        if (config.patchNode) {
            this.req.body = body;
        }
        if (config.patchKoa) {
            this.request.body = body;
        }
        let result = []
        for(let i = beginIndex; i < params.length; i++){
            result.push(parseParam(params[i], body))
        }
        fn.call(this, ...result)
    }
}

function parseParam(config, body){
    let isRequire   = config.require || true
    let method      = this.method
    let isFromUrl   = config.fromUrl || (method == 'GET' ? true : false)
    let type        = config.type
    let parameter   = config.parameter
    let onMissParam = config.onMissParam || config.onMissParam
    let result
    if(config.type == 'any'){
        result = isFromUrl ? this.query[parameter] : body[parameter]
    }else{
        if(isFromUrl){
            result = valiate(type, this.query[parameter])
        }else{
            result = valiate(type, body[parameter])
        }
    }

    if(result == undefined && isRequire){
        if(onMissParam){
            throw new Error('missing parameter :'+ parameter)
        }else{
            onMissParam.call(this, config, body)
        }
    }
    return result
}
module.exports = generator