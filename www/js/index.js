// var $$ = Dom7;

var app = new Framework7({
	// App root element
	root: '#app', 
	// App Name
	name: 'My App',
	// App id
	id: 'com.myapp.test',
	// Enable swipe panel
	panel: {
		swipe: 'left',
	},
	routes: [
	    {
	      name: 'pgIndex',
	      path: '/index/',
	      url: 'index.html',
	    }
    ],
});


var mainView = app.views.create('.view-main');

var app2 = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady: function() {
	  	console.log('deviceready app');
	  	app2.receivedEvent('deviceready');
	},

	receivedEvent: function(id) {
	  	console.log('receive app');
		var parentElement = document.getElementById(id);
		console.log('APP RECEIVED ID: '+id+ '-------------');
	},

  }

/***************************************************

***************************************************/
// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
