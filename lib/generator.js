/**
 * Created by chenchaochao on 17/1/2.
 */
const config = require('./config').config
const coBody = require('co-body')
const form   = require('formidable')

function formy(ctx, opts) {
    return function(done) {
        var fields = {};
        var files = {};
        var form = new form.IncomingForm(opts)
        form
            .on('end', function() {
                done(null, {fields: fields, files: files});
            })
            .on('error', function(err) {
                done(err);
            })
            .on('field', function(field, value) {
                if (fields[field]) {
                    if (Array.isArray(fields[field])) {
                        fields[field].push(value);
                    } else {
                        fields[field] = [fields[field], value];
                    }
                } else {
                    fields[field] = value;
                }
            })
            .on('file', function(field, file) {
                if (files[field]) {
                    if (Array.isArray(files[field])) {
                        files[field].push(file);
                    } else {
                        files[field] = [files[field], file];
                    }
                } else {
                    files[field] = file;
                }
            });
        if(opts.onFileBegin) {
            form.on('fileBegin', opts.onFileBegin);
        }
        form.parse(ctx.req);
    };
}

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
                body = yield form(this, config.formidable)
            }
        }catch(e){
            if(typeof config.onError == 'function') {
                config.onError.call(this, e)
            }else {
                throw e
            }
        }
    }
}
module.exports = generator