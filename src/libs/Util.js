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

//输入框进行判断
function checkVaild(){
    var vailds = document.querySelectorAll("[data-require]"),
        len = vailds.length;

    for(var i=0;i<len;i++){
        var elem = vailds[i],
        	val = elem.value,
        	arg = $(elem).data("require"),
        	regx = /^\/(.+)\/$/ig;
        	isPattern = regx.exec(arg),
        	isVaild =  isPattern ? isPattern[1]:'';

        if( !val || ( isPattern && ( !new RegExp(isVaild).test(val) ) ) ){
            $(elem).parents(".valid").addClass("shake").one("webkitAnimationEnd",function(){
                $(this).removeClass("shake");
            })
            return false;
        }
    }

    return true;

}


function getQuery(query){
    let search = window.location.search.toLocaleLowerCase(),params = {},regx = /(\w+)=([^=&]*)/ig;
    search.replace(regx,function(output,key,value){
        params[key] = value;
    });
    if(query) return params[query];
    return params;
}

export {
    isFunction,
    isObject,
    isString,
    isArray,
    checkVaild,
    getQuery
}