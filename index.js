/**
 * Created by chenchaochao on 17/1/2.
 */
const func      = require('./lib/function')
const generator = require('./lib/generator')

function interface (fn){
    if(!fn){
        throw new Error('interface need function')
    }
    if(fn.constructor.name == 'Function'){
        return func(...arguments)
    }
    if(fn.constructor.name == 'GeneratorFunction'){
        return generator(...arguments)
    }
}
module.exports = interface