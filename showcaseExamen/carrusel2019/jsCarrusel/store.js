var $ = function(id){
    return document.getElementById(id);
}
var STORE = STORE || {};
STORE.namespace = function(namespace){
    var parts = namespace.split('.');
    var parent = STORE;
    var i;
    if (parts[0] === "STORE") {
        parts = parts.slice(1);
    }
    else return false;
    for (i = 0; i < parts.length; i += 1) {

        if (typeof parent[parts[i]] === "undefined") {

            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
function funcDelegate(obj, methodName) {
    return function (e) {
        e = e || window.event;
        return obj[methodName](this, e);
    };
}

STORE.namespace('STORE.DOMObjectLook');

STORE.DOMObjectLook = function(id){
    this._element = $(id);
    if (this._element) {
        this._element.onmouseover = funcDelegate( this, "customOnMouseOver");
        this._element.onmouseout = funcDelegate( this, "customOnMouseOut");
    }
}

STORE.DOMObjectLook.prototype.customOnMouseOver = function (obj, event) {
    obj.style.cursor = "help";
    obj.style.color = "olive";
    obj.style.fontSize = "2em";
    obj.style.background = "#EAEDEE";
    obj.style.borderRadius = "25px 25px 25px 25px";
    obj.className = "boton s9";
};

STORE.DOMObjectLook.prototype.customOnMouseOut = function (obj, event) {
    obj.style.cursor = "pointer";
    obj.style.color = "#88B3BB";
    obj.style.fontSize = "1em";
    obj.style.borderRadius = "0px 0px 0px 0px";
    obj.style.background = "";
    obj.className = "boton s12";
};


STORE.namespace('STORE.Ajax');
(function(g){
    'use strict';

    STORE.Ajax = {
        READY_STATE_UNINITIALIZED : 0,
        READY_STATE_LOADING : 1,
        READY_STATE_LOADED : 2,
        READY_STATE_INTERACTIVE : 3,
        READY_STATE_COMPLETE : 4
    };
// Constructor
    STORE.Ajax.CargadorContenidos = function (url, funcion, json, funcionError) {
        this.url = url;
        this.req = null; // el objeto asincrono (XMLHTTP)
        this.json =  json || "";
        this.onload = funcion;
        this.onerror = (funcionError) ? funcionError : this.defaultError;
        this.cargaContenidoXML(url);
    };

    STORE.Ajax.CargadorContenidos.prototype =  {
        cargaContenidoXML: function(url) {
            if(window.XMLHttpRequest) {
                this.req = new XMLHttpRequest();
            }
            else if(window.ActiveXObject) {
                this.req = new ActiveXObject("Microsoft.XMLHTTP");
            }

            if(this.req) {
                try {
                    var loader = this; //that = loader
                    this.req.onreadystatechange = function() {
                        loader.onReadyState.call(loader);
                    };
                    this.req.open('POST', url, true);
                    this.req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
                    this.req.send( "json="+this.json);
                } catch(err) {
                    this.onerror.call(this);
                }
            }
        },

        onReadyState: function() {
            var req = this.req;
            var ready = req.readyState;
            if(ready == STORE.Ajax.READY_STATE_COMPLETE) {
                var httpStatus = req.status;
                if(httpStatus == 200 || httpStatus == 0) {
                    this.onload.call(this);
                }
                else {
                    this.onerror.call(this);
                }
            }
        },

        defaultError: function() {
            alert("Se ha producido un error al obtener los datos"
                + "\n\nreadyState:" + this.req.readyState
                + "\nstatus: " + this.req.status
                + "\nheaders: " + this.req.getAllResponseHeaders());
        }
    };
})(window);


STORE.namespace('STORE.pagination');
/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript page navigation
 * * * * * * * * * * * * * * * * */

STORE.pagination = {

    code: '',

    Constructor: function(data) {
        data = data || {};
        STORE.pagination.sizeStatic = data.size || 10;
        STORE.pagination.size = data.size;
        STORE.pagination.page = data.page || 1;
        STORE.pagination.step = data.step || 3;
        STORE.pagination.functionClick = data.functionClick || null;
    },

    // add pages by number (from [s] to [f])
    Add: function(s, f) {
        for (var i = s; i < f; i++) {
            STORE.pagination.code += '<a>' + i + '</a>';
        }
    },

    // add last page with separator
    Last: function() {
        STORE.pagination.code += '<i>...</i><a>' + STORE.pagination.size + '</a>';
    },

    // add first page with separator
    First: function() {
        STORE.pagination.code += '<a>1</a><i>...</i>';
    },

    // --------------------
    // Handlers
    // --------------------

    // change page
    Click: function(evt) {
        //alert(evt.currentTarget.innerHTML );
        STORE.pagination.page = +this.innerHTML;
        STORE.pagination.functionClick(evt);
        STORE.pagination.Start();
    },

    // inicio PAge
    Inicio: function(){
        STORE.pagination.size = STORE.pagination.sizeStatic;
        STORE.pagination.page = 1;
        STORE.pagination.functionClick();
        STORE.pagination.Start();
    },

    // previous page
    Prev: function() {
        STORE.pagination.page--;
        if (STORE.pagination.page < 1) {
            STORE.pagination.page = 1;
        }
        STORE.pagination.functionClick();
        STORE.pagination.Start();
    },
    // end
    End: function(){
        STORE.pagination.size = STORE.pagination.sizeStatic;
        STORE.pagination.page = STORE.pagination.sizeStatic;
        STORE.pagination.functionClick();
        STORE.pagination.Start();
    },

    // next page
    Next: function() {
        STORE.pagination.page++;
        if (STORE.pagination.page > STORE.pagination.size) {
            STORE.pagination.page = STORE.pagination.size;
        }
        STORE.pagination.functionClick();
        STORE.pagination.Start();
    },


    // binding pages
    Bind: function() {
        var a = STORE.pagination.e.getElementsByTagName('a');

        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === STORE.pagination.page) a[i].className = 'current';

            a[i].addEventListener('click', STORE.pagination.Click, false);
        }
    },

    // write pagination
    Finish: function() {
        STORE.pagination.e.innerHTML = STORE.pagination.code;
        STORE.pagination.code = '';
        STORE.pagination.Bind();
    },

    // find pagination type
    Start: function() {
        if (STORE.pagination.page == 1) {
            document.getElementById('botonInicio').style.display ="none";
            document.getElementById('botonPrev').style.display ="none";
        }else {
            document.getElementById('botonInicio').style.display ="";
            document.getElementById('botonPrev').style.display ="";
        }
        if (STORE.pagination.page == STORE.pagination.sizeStatic ) {
            document.getElementById('botonNext').style.display ="none";
            document.getElementById('botonEnd').style.display ="none";
        }else {
            document.getElementById('botonNext').style.display ="";
            document.getElementById('botonEnd').style.display ="";
        }


        if (STORE.pagination.size < STORE.pagination.step * 2 + 6) {
            STORE.pagination.Add(1, STORE.pagination.size + 1);
        }
        else if (STORE.pagination.page < STORE.pagination.step * 2 + 1) {
            STORE.pagination.Add(1, STORE.pagination.step * 2 + 4);
            STORE.pagination.Last();
        }
        else if (STORE.pagination.page > STORE.pagination.size - STORE.pagination.step * 2) {
            STORE.pagination.First();
            STORE.pagination.Add(STORE.pagination.size - STORE.pagination.step * 2 - 2, STORE.pagination.size + 1);
        }
        else {
            STORE.pagination.First();
            STORE.pagination.Add(STORE.pagination.page - STORE.pagination.step, STORE.pagination.page + STORE.pagination.step + 1);
            STORE.pagination.Last();
        }
        STORE.pagination.Finish();
    },

    // --------------------
    // Initialization
    // --------------------

    // binding buttons
    Buttons: function(e) {
        var nav = e.getElementsByTagName('a');
        nav[0].id = "botonInicio";
        nav[0].addEventListener('click', STORE.pagination.Inicio, false);
        nav[1].id = "botonPrev";
        nav[1].addEventListener('click', STORE.pagination.Prev, false);
        nav[2].id = "botonNext";
        nav[2].addEventListener('click', STORE.pagination.Next, false);
        nav[3].id = "botonEnd";
        nav[3].addEventListener('click', STORE.pagination.End, false);
    },

    // create skeleton
    Create: function(e) {

        var html = [
            '<a>&#129092;</a>', // Inicio
            '<a>&#9668;</a>', // previous button
            '<span></span>',  // pagination container
            '<a>&#9658;</a>',  // next button
            '<a>&#129094;</a>'  // End
        ];

        e.innerHTML = html.join('');
        STORE.pagination.e = e.getElementsByTagName('span')[0];
        STORE.pagination.Buttons(e);
    },

    // init
    Init: function(e, data) {
        STORE.pagination.Constructor(data);
        STORE.pagination.Create(e);
        STORE.pagination.Start();
    },

    getActivePage: function(){
        return STORE.pagination.page;
    }
};





