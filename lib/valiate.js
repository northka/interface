/**
 * Created by chenchaochao on 17/1/3.
 */
const valiate = {
    isString: function(str){
        if(typeof str == 'string'){
            return str
        }
    },
    isNumber: function(str){
        if(/^[1-9]+\.{0,1}[0-9]*[e]{0,1}[0-9]*$/.test(str)){
            return parseFloat(str)
        }else{
            return undefined
        }
    },
    isInt: function(str){
        if(/^\d{1,10}$/.test(str)){
            return parseInt(str)
        }else{
            return undefined
        }
    },
    isDate: function(str){
        let date = new Date(str)
        if(date.toString() === 'Invalid Date'){
            return undefined
        }else{
             return date
        }
    }
}

module.exports = function(type, param){
    switch (type.toLowerCase()){
        case 'string':
            return valiate.isString(param)
        case 'number':
            return valiate.isNumber(param)
        case 'int'   :
            return valiate.isInt(param)
        case 'Date'  :
            return valiate.isDate(param)
    }
}