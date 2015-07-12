var database = [];

fs = require('fs');
var table = fs.readFileSync('safaitic.db', 'utf-8');
var lines = table.split("\r\n");

var Entry = function(lexeme, pos, gloss, phonetics, root, note, date) {
	this.lx = lexeme;
	this.ps = pos;
	this.ge = gloss;
	this.ph = phonetics;
	this.root = root;
	this.nt = note;
	this.dt = date;
};

var parseLines = function (lines) {
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].substring(0,4) == "\\lx ") {
			var lexeme = lines[i].substring(4);
			var word = new Entry();
			word.lx = lexeme;
			database.push(word);
		}
		if (lines[i].substring(0,4) == "\\ps ") {
			var pos = lines[i].substring(4);
			word.ps = pos;
		}
		if (lines[i].substring(0,4) == "\\ge ") {
			var gloss = lines[i].substring(4);
			word.ge = gloss;
		}
		if (lines[i].substring(0,6) == "\\root ") {
			var root = lines[i].substring(6);
			word.root = root;
		}
		if (lines[i].substring(0,4) == "\\ph ") {
			var phone = lines[i].substring(4);
			word.ph = phone;
		}
		if (lines[i].substring(0,4) == "\\nt ") {
			var note = lines[i].substring(4);
			word.nt = note;
		}
		if (lines[i].substring(0,4) == "\\dt ") {
			var date = lines[i].substring(4);
			word.dt = date;
		}
	}
};

var format = function(type) {
	return function (input) {
		return "<div class=\"" + type + "\">" + input + "</div>";
	}
};

var formatLx = format("lexeme");
var formatPs = format("pos");
var formatGe = format("gloss");


parseLines(lines);
//console.log(database[0].nt == undefined) undefined is not the same as false!

var formatDatabase = function (database) {
	for (var i = 0; i < database.length; i++) {
		var lx = formatLx(database[i].lx);
		var ps = formatPs(database[i].ps);
		var ge = formatGe(database[i].ge);
		//return [lx, ps, ge]
		console.log(lx);
		console.log(ps);
		console.log(ge);
	}
};

formatDatabase(database);
//console.log(formatDatabase(database));

var formatPs = function(input) {};
var formatGe = function(input) {};
var formatRoot = function(input) {};