/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript page navigation
 * * * * * * * * * * * * * * * * */

var Pagination = {

    code: '',

    Constructor: function(data) {
        data = data || {};
        Pagination.sizeStatic = data.size || 30;
        Pagination.size = data.size;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
    },

    // add pages by number (from [s] to [f])
    Add: function(s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<a>' + i + '</a>';
        }
    },

    // add last page with separator
    Last: function() {
        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
    },

    // add first page with separator
    First: function() {
        Pagination.code += '<a>1</a><i>...</i>';
    },


    // --------------------
    // Handlers
    // --------------------

    // change page
    Click: function(evt) {
        alert(evt.currentTarget.innerHTML );
        Pagination.page = +this.innerHTML;
        Pagination.Start();
    },
    
    // inicio PAge
    Inicio: function(){
        Pagination.size = Pagination.sizeStatic;
        Pagination.page = 1;
        Pagination.Start();
    },

    // previous page
    Prev: function() {        
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
    },
      // end
    End: function(){
        Pagination.size = Pagination.sizeStatic;
        Pagination.page = Pagination.sizeStatic;
        Pagination.Start();
    },  

    // next page
    Next: function() {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
    },


    // binding pages
    Bind: function() {
        var a = Pagination.e.getElementsByTagName('a');
        
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    // write pagination
    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    // find pagination type
    Start: function() {
        if (Pagination.page == 1) {
            document.getElementById('botonInicio').style.display ="none";
            document.getElementById('botonPrev').style.display ="none";
        }else {
            document.getElementById('botonInicio').style.display ="";
            document.getElementById('botonPrev').style.display ="";
        }
        if (Pagination.page == Pagination.sizeStatic ) {
            document.getElementById('botonNext').style.display ="none";
            document.getElementById('botonEnd').style.display ="none";
        }else {
            document.getElementById('botonNext').style.display ="";
            document.getElementById('botonEnd').style.display ="";
        }
        
        
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        }
        else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        }
        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        }
        else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },



    // --------------------
    // Initialization
    // --------------------

    // binding buttons
    Buttons: function(e) {
        var nav = e.getElementsByTagName('a');
        nav[0].id = "botonInicio";
        nav[0].addEventListener('click', Pagination.Inicio, false);
        nav[1].id = "botonPrev";
        nav[1].addEventListener('click', Pagination.Prev, false);
        nav[2].id = "botonNext";
        nav[2].addEventListener('click', Pagination.Next, false);
        nav[3].id = "botonEnd";
        nav[3].addEventListener('click', Pagination.End, false);
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
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },

    // init
    Init: function(e, data) {
        Pagination.Constructor(data);
        Pagination.Create(e);
        Pagination.Start();
    },
    
    getActivePage: function(){        
      return Pagination.page;
    }
};

/* * * * * * * * * * * * * * * * *
* Call Initialization
* * * * * * * * * * * * * * * * */

var init = function() {
    Pagination.Init(document.getElementById('pagination'), {
        size: Math.ceil(30/2), // pages size= rowsTotal / rowsPage
        activePage: 1,  // selected page
        step: 3   // pages before and after current
    });
};

document.addEventListener('DOMContentLoaded', init, false);

