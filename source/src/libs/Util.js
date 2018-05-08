const toString = Object.prototype.toString,
href = document.location.href,
eventDomain = href.substr(0,href.lastIndexOf("/")+1);
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


function noop(){}

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


function getHash(){
    let $script = $('script[src*="index"]'),
    hash = ($script.attr('src').split('?')).pop();
    return hash;
}
let cdn = (function getCdn(){
    return $("base").attr("href") ||  eventDomain;
})();

let version = (function(){
    return (document.querySelector("[src*='index.js']").getAttribute("src").split("?"))[1];
})();
export {
    isFunction,
    isObject,
    isString,
    isArray,
    checkVaild,
    getQuery,
    noop,
    eventDomain,
    cdn,
    version
}