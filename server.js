const express = require("express");

// get the file system module to create the log file
const fs = require("fs");

// get handlebars
const hbs = require("hbs");

const _users = require("./users.json");

const app = express();

// create server settings
app.set("view engine","hbs");

// register the partials for the templating
hbs.registerPartials( __dirname + "/views/partials" );
// register the year helper
hbs.registerHelper( "getCurrentYear", () => new Date().getFullYear() );
// regiter scream helper
hbs.registerHelper( "screamIt", text => `${text.toUpperCase()}!!!` );




// set up express middleware
app.use( (req, res, next) => {
	console.log( "log middleware" );
	// create a log file with the requests to the server
	// time of the request
	const now = new Date().toString();
	// log content to add to the file
	const logContent = `Date: ${now} - Type: ${req.method}`;
	// add the new log to the log file
	fs.appendFile("server.log", logContent + "\n", e => {
		if ( e ) { console.log( "Unable to save new log to file." ); }
	});

	next();
});

// create the maintenance middleware
app.use( (req, res, next) => {
	console.log( "maintenance middleware" );
	// simply render the maintenance template
	res.render("maintenance.hbs", {
		pageTitle: "Under Maintenance"
	});
});


// create an app handler for a rout
// app root 
app.get("/", (req, res) => {
	res.render("home.hbs", {
		pageTitle: "Home Page"
	});
});

// set the route for the about template
app.get("/about", (req, res) => {
	// instead of serving render the template
	res.render("about.hbs", {
		pageTitle: "About Us"
	});
});

app.listen(3000, () => {
	console.log( "Server running on port 3000." );
});
