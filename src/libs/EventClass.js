
import {isString,isArray,isFunction,isObject} from "./Util.js";
/**
 * 事件监听器
 */

export default class EventClass {
     constructor(){
         this.events = {};
     }

     /**
      * @function : 触发事件
      * @param:{event<String>} 事件名称
      * @param:{data?<any>} 传输数据
      */
     trigger(event,...data){
        if(!event) return this;
        let events = this.events[event] || [];
        for(let i=events.length-1;i>=0;i--){
            let event = events[i].bind(this);
            event(data);
        }
        return this;
     }

     /**
      * @function:绑定事件
      * @param: {event<String|Object|Array>} 事件名称
      * @param: {fn?<Function>} 事件回调函数
      * 
      * @example:
      *     object.on('eventName',fn);
      *     object.on({
      *         "event1":fn1,
      *         "event2":fn2
      *     });
      *     object.on(["event1","event2","event3"....],fn);
      *     
      */
     on(event,fn){ 
         
        if(isString(event) && isFunction(fn)){
            let events = this.events[event] || (this.events[event] = []);
            events.push(fn);
            return this;
        }

        if(isArray(event) && isFunction(fn)){
            event.forEach((ev)=>{
                let events = this.events[ev] || (this.events[ev] = []);
                events.push(fn);
            })
        }

        if(isObject(event)){
            for(let name in event){
                let events = this.events[name] || (this.events[name] = []);
                events.push(event[name]);
            }
        }
        return this;
     }
     bind(event,fn){
        this.on(event,fn);
     }
     /**
      * @function:绑定事件，执行一次
      * 
      */
     once(event,fn){
        var self = this;
        function _fn(){
            fn.apply(self,arguments);
            self.off(event,_fn);
        }
        _fn.alias = fn;
        this.on(event,_fn);
        return this;
     }
     one(event,fn){
        this.once(event,fn);
     }
     /**
      * @function:解绑事件
      * @param:{event?<String>} 要解绑的是事件名称
      * @param:{fn?<Function>} 要解除的回调函数
      * @example:
      *     1.object.off() 解绑所有事件
      *     2.object.off(event) 解绑某个事件
      *     3.object.off(event,fn) 解绑指定的回调函数
      */
     off(event,fn){
        if(!arguments.length){
            this.events = {};
            return this;
        }
        if(!fn){
            delete this.events[event];
        }
        let events = this.events[event];
        for(let i=0,len = events.length;i<len;i++){
            let _event = events[i];
            if(_event== fn || _event.alias == fn){
                events.splice(i,1);
                break;
            }
        }
        if(!events.length) delete this.events[event];


     }
     unbind(event,fn){
        this.off(event,fn);
     }
 }

