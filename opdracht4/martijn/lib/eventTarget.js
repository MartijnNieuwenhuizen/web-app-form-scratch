function eventTarget() {

    var _this = this;
    _this._listeners = {};

}

eventTarget.prototype = {

    constructor: EventTarget,
    addListener: function(a,c) {
    	"undefined" == typeof 
    	_this._listeners[a] && (this._listeners[a]=[]);
    	_this._listeners[a].push(c)
    },
    fire: function(a) {
    	"string" == typeof 
    	a && ( a = {type:a} );
    	a.target || ( a.target = _this );
    	if ( !a.type ) 
    		throw Error("Event object missing 'type' property.");
    	if ( _this._listeners[a.type]instanceof Array )
    		for ( var c=_this._listeners[a.type],b=0,d=c.length;b<d;b++)c[b].call(_this,a)
    	},
    removeListener: function(a,c) { 
        if ( _this._listeners[a]instanceof Array )
            for ( var b = _this._listeners[a],d=0,e=b.length;d<e;d++ )
                if ( b[d]===c ) {
                    b.splice(d,1);
                    break
                }
    }

}; 

module.exports;