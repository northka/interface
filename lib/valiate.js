/**
 * Created by chenchaochao on 17/1/3.
 */
const valiate = {
    isString: function(str){
        if(typeof str == 'string'){
            return str
        }
    }
}

module.exports ={
    addType: (type, valiate) => {
        if(valiate.isString(type) === undefined){
            throw new Error('type must be string')
        }
        valiate[type] = valiate
    }
}