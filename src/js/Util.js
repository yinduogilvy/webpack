const toString = Object.prototype.toString;
function isFunction(value){
    return typeof value =="function" || toString.call(value)=="[object Function]";
}
function isObject(value){
    return toString.call(value)=="[object Object]";
}
function isString(value){
    return typeof value =="string" || toString.call(value)=="[object String]";
}

function isArray(value){
    return (Array.isArray && Array.isArray(value)) || toString.call(value)=="[object Array]";
}
export {
    isFunction,
    isObject,
    isString,
    isArray
}