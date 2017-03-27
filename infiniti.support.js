"use strict";

/*;
              	@module-license:
              		The MIT License (MIT)
              		@mit-license
              
              		Copyright (@c) 2017 Richeve Siodina Bebedor
              		@email: richeve.bebedor@gmail.com
              
              		Permission is hereby granted, free of charge, to any person obtaining a copy
              		of this software and associated documentation files (the "Software"), to deal
              		in the Software without restriction, including without limitation the rights
              		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              		copies of the Software, and to permit persons to whom the Software is
              		furnished to do so, subject to the following conditions:
              
              		The above copyright notice and this permission notice shall be included in all
              		copies or substantial portions of the Software.
              
              		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              		SOFTWARE.
              	@end-module-license
              
              	@module-configuration:
              		{
              			"package": "infiniti",
              			"path": "infiniti/infiniti.js",
              			"file": "infiniti.js",
              			"module": "infiniti",
              			"author": "Richeve S. Bebedor",
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
              			],
              			"eMail": "richeve.bebedor@gmail.com",
              			"repository": "https://github.com:volkovasystems/infiniti.git",
              			"test": "infiniti-test.js",
              			"global": true,
              			"class": true,
              		}
              	@end-module-configuration
              
              	@module-documentation:
              		Take note that the time part is always in zero.
              	@end-module-documentation
              
              	@include:
              		{
              			"clazof": "clazof",
              			"depher": "depher",
              			"diatom": "diatom",
              			"doubt": "doubt",
              			"falze": "falze",
              			"falzy": "falzy",
              			"harden": "harden",
              			"moment": "moment",
              			"optfor": "optfor",
              			"protype": "protype",
              			"raze": "raze",
              			"stringe": "stringe",
              			"truly": "truly",
              			"U200b": "u200b"
              		}
              	@end-include
              */

var clazof = require("clazof");
var depher = require("depher");
var diatom = require("diatom");
var doubt = require("doubt");
var falze = require("falze");
var falzy = require("falzy");
var harden = require("harden");
var moment = require("moment");
var optfor = require("optfor");
var protype = require("protype");
var raze = require("raze");
var truly = require("truly");
var stringe = require("stringe");
var U200b = require("u200b");

var COMPACT_FORMAT = "YYYYMMDDHH";
var DEFAULT_SEPARATOR = " | ";
var ISO8601_FORMAT = "YYYY-MM-DDTHH:00:00";
var NUMERIC_PATTERN = /\d+/;
var SIMPLE_DATE_FORMAT = "MMMM DD, YYYY";
var TRUE_DATE_PATTERN = /^\-[\d\u200b]{26}|^[\d\u200b]{27}$/;

var Infiniti = diatom("Infiniti");

harden("now", function now() {
	return Infiniti().compact();
}, Infiniti);

Infiniti.prototype.toString = function toString() {
	return this.trueDate;
};

Infiniti.prototype.valueOf = function valueOf() {
	return this.trueDate;
};

Infiniti.prototype.initialize = function initialize(date) {
	/*;
                                                           	@meta-configuration:
                                                           		{
                                                           			"date:required": [
                                                           				[ "number", "number" ],
                                                           				"string",
                                                           				Date
                                                           			]
                                                           		}
                                                           	@end-meta-configuration
                                                           */

	if (doubt(date, ARRAY) &&
	protype(date[0], NUMBER) &&
	protype(date[1], NUMBER) &&
	stringe(date[0]).length == 10)
	{
		this.offset = date[1];

		this.date = moment.utc(date[0], COMPACT_FORMAT).
		minute(0).
		second(0).
		millisecond(0).
		utcOffset(this.offset);

		this.persist();

	} else if (protype(date, STRING) && date.length == 27 && TRUE_DATE_PATTERN.test(date)) {
		this.date = date;

		this.parse();

	} else if (truly(date) && protype(date, STRING)) {
		try {
			date = moment(date).
			minute(0).
			second(0).
			millisecond(0);

			if (date.isValid()) {
				this.initialize(date.toDate());

			} else {
				throw new Error("invalid date format, " + arguments[0]);
			}

		} catch (error) {
			throw new Error("error encountered while parsing date, " + error);
		}

	} else if (clazof(date, Date)) {
		this.date = moment(date).
		minute(0).
		second(0).
		millisecond(0);

		this.persist();

	} else {
		this.date = moment(new Date()).
		minute(0).
		second(0).
		millisecond(0);

		this.persist();
	}

	return this;
};

/*
   	@method-documentation:
   		This should be persisted on the machine where the timezone is persisted.
   
   		It will save the true date in utc format + the machine timezone.
   	@end-method-documentation
   */
Infiniti.prototype.persist = function persist() {
	if (truly(this.trueDate)) {
		return this.trueDate;
	}

	var date = this.date.toDate();

	var offset = this.offset || this.date.utcOffset();
	try {
		offset = parseInt(offset);

	} catch (error) {
		throw new Error("invalid timezone offset, " + error);
	}

	var polarity = 0;
	if (offset != 0) {
		polarity = offset / Math.abs(offset);
	}

	var trueDate = U200b([
	//: positive / negative offset
	stringe(polarity).replace(NUMERIC_PATTERN, "") || "0",

	//: year
	date.getUTCFullYear(),

	//: month
	("0" + (date.getUTCMonth() + 1)).slice(-2),

	//: day
	("0" + date.getUTCDate()).slice(-2),

	//: hour
	("0" + date.getUTCHours()).slice(-2),

	//: minute
	"00",

	//: second
	"00",

	//: offset
	("000" + Math.abs(offset)).slice(-5)]).
	join();

	this.trueDate = trueDate;

	this.offset = offset;

	return trueDate;
};

/*;
   	@method-documentation:
   		Decompose true date to a moment object.
   	@end-method-documentation
   */
Infiniti.prototype.parse = function parse() {
	var date = this.date;

	if (protype(this.date, STRING)) {
		date = U200b(this.date).separate();

	} else if (truly(this.trueDate)) {
		date = U200b(this.trueDate).separate();

	} else {
		throw new Error("date not specified");
	}

	try {
		var polarity = parseInt(date[0] + 1);

		this.offset = polarity * parseInt(date[7]);

		date = moment.utc().
		year(parseInt(date[1])).
		month(parseInt(date[2]) - 1).
		date(parseInt(date[3])).
		hour(parseInt(date[4])).
		minute(0).
		second(0).
		millisecond(0);

	} catch (error) {
		throw new Error("error parsing true date, " + error);
	}

	//: This will set the timezone of the Date object to the machine timezone.
	this.date = date;

	this.persist();

	return this;
};

/*;
   	@method-documentation:
   		Relative date is the date applied with UTC offset.
   
   		This will return the date in ISO8601 format.
   
   		`YYYY-MM-DDTHH:00:00`
   
   		Do not use this to reference true date.
   	@end-method-documentation
   */
Infiniti.prototype.relativeDate = function relativeDate() {
	if (falze(this.date)) {
		throw new Error("internal date empty");
	}

	if (falzy(this.offset)) {
		throw new Error("internal timezone offset empty");
	}

	return this.date.utc().utcOffset(this.offset).format(ISO8601_FORMAT);
};

/*;
   	@method-documentation:
   		Real date is the date with no UTC offset applied.
   
   		This will return the date in ISO8601
   
   		`YYYY-MM-DDTHH:00:00`
   	@end-method-documentation
   */
Infiniti.prototype.realDate = function realDate() {
	if (falze(this.date)) {
		throw new Error("internal date empty");
	}

	return this.date.utc().format(ISO8601_FORMAT);
};

/*;
   	@method-documentation:
   		Returns a simple human readable representation of date.
   
   		Date will be relative.
   	@end-method-documentation
   */
Infiniti.prototype.getDate = function getDate() {
	if (falze(this.date)) {
		throw new Error("internal date empty");
	}

	if (falzy(this.offset)) {
		throw new Error("internal timezone offset empty");
	}

	return this.date.utc().utcOffset(this.offset).format(SIMPLE_DATE_FORMAT);
};

/*;
   	@method-documentation:
   		Returns a simple human readable representation of date.
   
   		Date will be relative.
   
   		Setting complete will append true date format.
   	@end-method-documentation
   */
Infiniti.prototype.printDate = function printDate(separator, complete) {
	/*;
                                                                        	@meta-configuration:
                                                                        		{
                                                                        			"separator": "string",
                                                                        			"complete": "boolean"
                                                                        		}
                                                                        	@end-meta-configuration
                                                                        */

	var parameter = raze(arguments);

	separator = optfor(parameter, STRING);

	separator = separator || DEFAULT_SEPARATOR;
	if (!protype(separator, STRING)) {
		separator = DEFAULT_SEPARATOR;
	}

	complete = depher(parameter, BOOLEAN, false);

	if (complete) {
		return [this.getDate(), this.trueDate].join(separator);

	} else {
		return this.getDate();
	}
};

/*;
   	@method-documentation:
   		Returns a numerical representation of true date in UTC.
   
   		Time part is excluded except the hour.
   	@end-method-documentation
   */
Infiniti.prototype.compact = function compact() {
	return [this.date.utc().format(COMPACT_FORMAT), this.offset].
	map(function onEachToken(token) {return parseInt(stringe(token));});
};

module.exports = Infiniti;

//# sourceMappingURL=infiniti.support.js.map