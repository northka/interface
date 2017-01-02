/**
 * Created by chenchaochao on 17/1/2.
 */
const form   = require('formidable')

function formy(ctx, opts) {
    return new Promise((resolve, reject) => {
        let fileds = {},files = {}
        let forms  = new form.IncomingForm(opts)
        forms
            .on('end', () => {
                resolve({fields,files})
            })
            .on('error', err => {
                reject(err)
            })
            .on('field', (field, value) => {
                if(fileds[field]){
                    if(Array.isArray(fileds[filed])){
                        fields[field].push(value)
                    }else {
                        fileds[field] = [fileds[field], value]
                    }
                }else{
                    fields[field] = value
                }
            })
            .on('file', (field, file) => {
                if (files[field]) {
                    if (Array.isArray(files[field])) {
                        files[field].push(file)
                    } else {
                        files[field] = [files[field], file]
                    }
                } else {
                    files[field] = file
                }
            })
        if(opts.onFileBegin) {
            form.on('fileBegin', opts.onFileBegin)
        }
        form.parse(ctx.req)
    })
}
module.exports = formy