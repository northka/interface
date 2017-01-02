/**
 * Created by chenchaochao on 17/1/2.
 */
const config = {
    onError    : false,
    patchNode  : false,
    patchKoa   : true,
    multipart  : false,
    urlencoded : true,
    json       : true,
    text       : true,
    encoding   : 'utf-8',
    jsonLimit  : '1mb',
    formLimit  : '56kb',
    formidable : {},
    textLimit  : '56kb',
    strict     : true
}

module.exports ={
    setConfig: function(opt){
        return Object.assign(config,opt)
    },
    config
}