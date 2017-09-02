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
              			"eMail": "richeve.bebedor@gmail.com",
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
              				"Vinse Vinalon <vinsevinalon@gmail.com>"
              			],
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
	typeof date[0] == "number" &&
	typeof date[1] == "number" &&
	stringe(date[0]).length == 10)
	{
		this.offset = date[1];

		this.date = moment.utc(date[0], COMPACT_FORMAT).
		minute(0).
		second(0).
		millisecond(0).
		utcOffset(this.offset);

		this.persist();

	} else if (typeof date == "string" && date.length == 27 && TRUE_DATE_PATTERN.test(date)) {
		this.date = date;

		this.parse();

	} else if (truly(date) && typeof date == "string") {
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
			throw new Error("error encountered while parsing date, " + error.stack);
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
		throw new Error("invalid timezone offset, " + error.stack);
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

	if (typeof this.date == "string") {
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
		throw new Error("error parsing true date, " + error.stack);
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
	if (typeof separator != "string") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZmluaXRpLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiY2xhem9mIiwicmVxdWlyZSIsImRlcGhlciIsImRpYXRvbSIsImRvdWJ0IiwiZmFsemUiLCJmYWx6eSIsImhhcmRlbiIsIm1vbWVudCIsIm9wdGZvciIsInJhemUiLCJ0cnVseSIsInN0cmluZ2UiLCJVMjAwYiIsIkNPTVBBQ1RfRk9STUFUIiwiREVGQVVMVF9TRVBBUkFUT1IiLCJJU084NjAxX0ZPUk1BVCIsIk5VTUVSSUNfUEFUVEVSTiIsIlNJTVBMRV9EQVRFX0ZPUk1BVCIsIlRSVUVfREFURV9QQVRURVJOIiwiSW5maW5pdGkiLCJub3ciLCJjb21wYWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJ0cnVlRGF0ZSIsInZhbHVlT2YiLCJpbml0aWFsaXplIiwiZGF0ZSIsIkFSUkFZIiwibGVuZ3RoIiwib2Zmc2V0IiwidXRjIiwibWludXRlIiwic2Vjb25kIiwibWlsbGlzZWNvbmQiLCJ1dGNPZmZzZXQiLCJwZXJzaXN0IiwidGVzdCIsInBhcnNlIiwiaXNWYWxpZCIsInRvRGF0ZSIsIkVycm9yIiwiYXJndW1lbnRzIiwiZXJyb3IiLCJzdGFjayIsIkRhdGUiLCJwYXJzZUludCIsInBvbGFyaXR5IiwiTWF0aCIsImFicyIsInJlcGxhY2UiLCJnZXRVVENGdWxsWWVhciIsImdldFVUQ01vbnRoIiwic2xpY2UiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJqb2luIiwic2VwYXJhdGUiLCJ5ZWFyIiwibW9udGgiLCJob3VyIiwicmVsYXRpdmVEYXRlIiwiZm9ybWF0IiwicmVhbERhdGUiLCJnZXREYXRlIiwicHJpbnREYXRlIiwic2VwYXJhdG9yIiwiY29tcGxldGUiLCJwYXJhbWV0ZXIiLCJTVFJJTkciLCJCT09MRUFOIiwibWFwIiwib25FYWNoVG9rZW4iLCJ0b2tlbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxRUEsSUFBTUEsU0FBU0MsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNQyxTQUFTRCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1FLFNBQVNGLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUcsUUFBUUgsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNSSxRQUFRSixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1LLFFBQVFMLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTU0sU0FBU04sUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNTyxTQUFTUCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1RLFNBQVNSLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTVMsT0FBT1QsUUFBUyxNQUFULENBQWI7QUFDQSxJQUFNVSxRQUFRVixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1XLFVBQVVYLFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1ZLFFBQVFaLFFBQVMsT0FBVCxDQUFkOztBQUVBLElBQU1hLGlCQUFpQixZQUF2QjtBQUNBLElBQU1DLG9CQUFvQixLQUExQjtBQUNBLElBQU1DLGlCQUFpQixxQkFBdkI7QUFDQSxJQUFNQyxrQkFBa0IsS0FBeEI7QUFDQSxJQUFNQyxxQkFBcUIsZUFBM0I7QUFDQSxJQUFNQyxvQkFBb0Isb0NBQTFCOztBQUVBLElBQU1DLFdBQVdqQixPQUFRLFVBQVIsQ0FBakI7O0FBRUFJLE9BQVEsS0FBUixFQUFlLFNBQVNjLEdBQVQsR0FBZTtBQUM3QixRQUFPRCxXQUFZRSxPQUFaLEVBQVA7QUFDQSxDQUZELEVBRUdGLFFBRkg7O0FBSUFBLFNBQVNHLFNBQVQsQ0FBbUJDLFFBQW5CLEdBQThCLFNBQVNBLFFBQVQsR0FBb0I7QUFDakQsUUFBTyxLQUFLQyxRQUFaO0FBQ0EsQ0FGRDs7QUFJQUwsU0FBU0csU0FBVCxDQUFtQkcsT0FBbkIsR0FBNkIsU0FBU0EsT0FBVCxHQUFtQjtBQUMvQyxRQUFPLEtBQUtELFFBQVo7QUFDQSxDQUZEOztBQUlBTCxTQUFTRyxTQUFULENBQW1CSSxVQUFuQixHQUFnQyxTQUFTQSxVQUFULENBQXFCQyxJQUFyQixFQUEyQjtBQUMxRDs7Ozs7Ozs7Ozs7O0FBWUEsS0FBSXhCLE1BQU93QixJQUFQLEVBQWFDLEtBQWI7QUFDSCxRQUFPRCxLQUFNLENBQU4sQ0FBUCxJQUFvQixRQURqQjtBQUVILFFBQU9BLEtBQU0sQ0FBTixDQUFQLElBQW9CLFFBRmpCO0FBR0hoQixTQUFTZ0IsS0FBTSxDQUFOLENBQVQsRUFBcUJFLE1BQXJCLElBQStCLEVBSGhDO0FBSUE7QUFDQyxPQUFLQyxNQUFMLEdBQWNILEtBQU0sQ0FBTixDQUFkOztBQUVBLE9BQUtBLElBQUwsR0FBWXBCLE9BQU93QixHQUFQLENBQVlKLEtBQU0sQ0FBTixDQUFaLEVBQXVCZCxjQUF2QjtBQUNWbUIsUUFEVSxDQUNGLENBREU7QUFFVkMsUUFGVSxDQUVGLENBRkU7QUFHVkMsYUFIVSxDQUdHLENBSEg7QUFJVkMsV0FKVSxDQUlDLEtBQUtMLE1BSk4sQ0FBWjs7QUFNQSxPQUFLTSxPQUFMOztBQUVBLEVBZkQsTUFlTSxJQUFJLE9BQU9ULElBQVAsSUFBZSxRQUFmLElBQTJCQSxLQUFLRSxNQUFMLElBQWUsRUFBMUMsSUFBZ0RYLGtCQUFrQm1CLElBQWxCLENBQXdCVixJQUF4QixDQUFwRCxFQUFvRjtBQUN6RixPQUFLQSxJQUFMLEdBQVlBLElBQVo7O0FBRUEsT0FBS1csS0FBTDs7QUFFQSxFQUxLLE1BS0EsSUFBSTVCLE1BQU9pQixJQUFQLEtBQWlCLE9BQU9BLElBQVAsSUFBZSxRQUFwQyxFQUE4QztBQUNuRCxNQUFHO0FBQ0ZBLFVBQU9wQixPQUFRb0IsSUFBUjtBQUNMSyxTQURLLENBQ0csQ0FESDtBQUVMQyxTQUZLLENBRUcsQ0FGSDtBQUdMQyxjQUhLLENBR1EsQ0FIUixDQUFQOztBQUtBLE9BQUlQLEtBQUtZLE9BQUwsRUFBSixFQUFxQjtBQUNwQixTQUFLYixVQUFMLENBQWlCQyxLQUFLYSxNQUFMLEVBQWpCOztBQUVBLElBSEQsTUFHSztBQUNKLFVBQU0sSUFBSUMsS0FBSiwyQkFBb0NDLFVBQVcsQ0FBWCxDQUFwQyxDQUFOO0FBQ0E7O0FBRUQsR0FiRCxDQWFDLE9BQU9DLEtBQVAsRUFBYztBQUNkLFNBQU0sSUFBSUYsS0FBSiw0Q0FBcURFLE1BQU1DLEtBQTNELENBQU47QUFDQTs7QUFFRCxFQWxCSyxNQWtCQSxJQUFJN0MsT0FBUTRCLElBQVIsRUFBY2tCLElBQWQsQ0FBSixFQUEwQjtBQUMvQixPQUFLbEIsSUFBTCxHQUFZcEIsT0FBUW9CLElBQVI7QUFDVkssUUFEVSxDQUNGLENBREU7QUFFVkMsUUFGVSxDQUVGLENBRkU7QUFHVkMsYUFIVSxDQUdHLENBSEgsQ0FBWjs7QUFLQSxPQUFLRSxPQUFMOztBQUVBLEVBUkssTUFRRDtBQUNKLE9BQUtULElBQUwsR0FBWXBCLE9BQVEsSUFBSXNDLElBQUosRUFBUjtBQUNWYixRQURVLENBQ0YsQ0FERTtBQUVWQyxRQUZVLENBRUYsQ0FGRTtBQUdWQyxhQUhVLENBR0csQ0FISCxDQUFaOztBQUtBLE9BQUtFLE9BQUw7QUFDQTs7QUFFRCxRQUFPLElBQVA7QUFDQSxDQXJFRDs7QUF1RUE7Ozs7Ozs7QUFPQWpCLFNBQVNHLFNBQVQsQ0FBbUJjLE9BQW5CLEdBQTZCLFNBQVNBLE9BQVQsR0FBbUI7QUFDL0MsS0FBSTFCLE1BQU8sS0FBS2MsUUFBWixDQUFKLEVBQTRCO0FBQzNCLFNBQU8sS0FBS0EsUUFBWjtBQUNBOztBQUVELEtBQUlHLE9BQU8sS0FBS0EsSUFBTCxDQUFVYSxNQUFWLEVBQVg7O0FBRUEsS0FBSVYsU0FBUyxLQUFLQSxNQUFMLElBQWUsS0FBS0gsSUFBTCxDQUFVUSxTQUFWLEVBQTVCO0FBQ0EsS0FBRztBQUNGTCxXQUFTZ0IsU0FBVWhCLE1BQVYsQ0FBVDs7QUFFQSxFQUhELENBR0MsT0FBT2EsS0FBUCxFQUFjO0FBQ2QsUUFBTSxJQUFJRixLQUFKLCtCQUF3Q0UsTUFBTUMsS0FBOUMsQ0FBTjtBQUNBOztBQUVELEtBQUlHLFdBQVcsQ0FBZjtBQUNBLEtBQUlqQixVQUFVLENBQWQsRUFBaUI7QUFDaEJpQixhQUFXakIsU0FBU2tCLEtBQUtDLEdBQUwsQ0FBVW5CLE1BQVYsQ0FBcEI7QUFDQTs7QUFFRCxLQUFJTixXQUFXWixNQUFPO0FBQ3JCO0FBQ0FELFNBQVNvQyxRQUFULEVBQW9CRyxPQUFwQixDQUE2QmxDLGVBQTdCLEVBQThDLEVBQTlDLEtBQXNELEdBRmpDOztBQUlyQjtBQUNBVyxNQUFLd0IsY0FBTCxFQUxxQjs7QUFPckI7QUFDQSxFQUFFLE9BQVF4QixLQUFLeUIsV0FBTCxLQUFzQixDQUE5QixDQUFGLEVBQXNDQyxLQUF0QyxDQUE2QyxDQUFDLENBQTlDLENBUnFCOztBQVVyQjtBQUNBLEVBQUUsTUFBUTFCLEtBQUsyQixVQUFMLEVBQVYsRUFBaUNELEtBQWpDLENBQXdDLENBQUMsQ0FBekMsQ0FYcUI7O0FBYXJCO0FBQ0EsRUFBRSxNQUFRMUIsS0FBSzRCLFdBQUwsRUFBVixFQUFrQ0YsS0FBbEMsQ0FBeUMsQ0FBQyxDQUExQyxDQWRxQjs7QUFnQnJCO0FBQ0EsS0FqQnFCOztBQW1CckI7QUFDQSxLQXBCcUI7O0FBc0JyQjtBQUNBLEVBQUUsUUFBUUwsS0FBS0MsR0FBTCxDQUFVbkIsTUFBVixDQUFWLEVBQStCdUIsS0FBL0IsQ0FBc0MsQ0FBQyxDQUF2QyxDQXZCcUIsQ0FBUDtBQXdCWEcsS0F4QlcsRUFBZjs7QUEwQkEsTUFBS2hDLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBLE1BQUtNLE1BQUwsR0FBY0EsTUFBZDs7QUFFQSxRQUFPTixRQUFQO0FBQ0EsQ0FuREQ7O0FBcURBOzs7OztBQUtBTCxTQUFTRyxTQUFULENBQW1CZ0IsS0FBbkIsR0FBMkIsU0FBU0EsS0FBVCxHQUFpQjtBQUMzQyxLQUFJWCxPQUFPLEtBQUtBLElBQWhCOztBQUVBLEtBQUksT0FBTyxLQUFLQSxJQUFaLElBQW9CLFFBQXhCLEVBQWtDO0FBQ2pDQSxTQUFPZixNQUFPLEtBQUtlLElBQVosRUFBbUI4QixRQUFuQixFQUFQOztBQUVBLEVBSEQsTUFHTSxJQUFJL0MsTUFBTyxLQUFLYyxRQUFaLENBQUosRUFBNEI7QUFDakNHLFNBQU9mLE1BQU8sS0FBS1ksUUFBWixFQUF1QmlDLFFBQXZCLEVBQVA7O0FBRUEsRUFISyxNQUdEO0FBQ0osUUFBTSxJQUFJaEIsS0FBSixDQUFXLG9CQUFYLENBQU47QUFDQTs7QUFFRCxLQUFHO0FBQ0YsTUFBSU0sV0FBV0QsU0FBVW5CLEtBQU0sQ0FBTixJQUFZLENBQXRCLENBQWY7O0FBRUEsT0FBS0csTUFBTCxHQUFjaUIsV0FBV0QsU0FBVW5CLEtBQU0sQ0FBTixDQUFWLENBQXpCOztBQUVBQSxTQUFPcEIsT0FBT3dCLEdBQVA7QUFDTDJCLE1BREssQ0FDQ1osU0FBVW5CLEtBQU0sQ0FBTixDQUFWLENBREQ7QUFFTGdDLE9BRkssQ0FFRWIsU0FBVW5CLEtBQU0sQ0FBTixDQUFWLElBQXdCLENBRjFCO0FBR0xBLE1BSEssQ0FHQ21CLFNBQVVuQixLQUFNLENBQU4sQ0FBVixDQUhEO0FBSUxpQyxNQUpLLENBSUNkLFNBQVVuQixLQUFNLENBQU4sQ0FBVixDQUpEO0FBS0xLLFFBTEssQ0FLRyxDQUxIO0FBTUxDLFFBTkssQ0FNRyxDQU5IO0FBT0xDLGFBUEssQ0FPUSxDQVBSLENBQVA7O0FBU0EsRUFkRCxDQWNDLE9BQU9TLEtBQVAsRUFBYztBQUNkLFFBQU0sSUFBSUYsS0FBSiwrQkFBd0NFLE1BQU1DLEtBQTlDLENBQU47QUFDQTs7QUFFRDtBQUNBLE1BQUtqQixJQUFMLEdBQVlBLElBQVo7O0FBRUEsTUFBS1MsT0FBTDs7QUFFQSxRQUFPLElBQVA7QUFDQSxDQXJDRDs7QUF1Q0E7Ozs7Ozs7Ozs7O0FBV0FqQixTQUFTRyxTQUFULENBQW1CdUMsWUFBbkIsR0FBa0MsU0FBU0EsWUFBVCxHQUF3QjtBQUN6RCxLQUFJekQsTUFBTyxLQUFLdUIsSUFBWixDQUFKLEVBQXdCO0FBQ3ZCLFFBQU0sSUFBSWMsS0FBSixDQUFXLHFCQUFYLENBQU47QUFDQTs7QUFFRCxLQUFJcEMsTUFBTyxLQUFLeUIsTUFBWixDQUFKLEVBQTBCO0FBQ3pCLFFBQU0sSUFBSVcsS0FBSixDQUFXLGdDQUFYLENBQU47QUFDQTs7QUFFRCxRQUFPLEtBQUtkLElBQUwsQ0FBVUksR0FBVixHQUFpQkksU0FBakIsQ0FBNEIsS0FBS0wsTUFBakMsRUFBMENnQyxNQUExQyxDQUFrRC9DLGNBQWxELENBQVA7QUFDQSxDQVZEOztBQVlBOzs7Ozs7Ozs7QUFTQUksU0FBU0csU0FBVCxDQUFtQnlDLFFBQW5CLEdBQThCLFNBQVNBLFFBQVQsR0FBb0I7QUFDakQsS0FBSTNELE1BQU8sS0FBS3VCLElBQVosQ0FBSixFQUF3QjtBQUN2QixRQUFNLElBQUljLEtBQUosQ0FBVyxxQkFBWCxDQUFOO0FBQ0E7O0FBRUQsUUFBTyxLQUFLZCxJQUFMLENBQVVJLEdBQVYsR0FBaUIrQixNQUFqQixDQUF5Qi9DLGNBQXpCLENBQVA7QUFDQSxDQU5EOztBQVFBOzs7Ozs7O0FBT0FJLFNBQVNHLFNBQVQsQ0FBbUIwQyxPQUFuQixHQUE2QixTQUFTQSxPQUFULEdBQW1CO0FBQy9DLEtBQUk1RCxNQUFPLEtBQUt1QixJQUFaLENBQUosRUFBd0I7QUFDdkIsUUFBTSxJQUFJYyxLQUFKLENBQVcscUJBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUlwQyxNQUFPLEtBQUt5QixNQUFaLENBQUosRUFBMEI7QUFDekIsUUFBTSxJQUFJVyxLQUFKLENBQVcsZ0NBQVgsQ0FBTjtBQUNBOztBQUVELFFBQU8sS0FBS2QsSUFBTCxDQUFVSSxHQUFWLEdBQWlCSSxTQUFqQixDQUE0QixLQUFLTCxNQUFqQyxFQUEwQ2dDLE1BQTFDLENBQWtEN0Msa0JBQWxELENBQVA7QUFDQSxDQVZEOztBQVlBOzs7Ozs7Ozs7QUFTQUUsU0FBU0csU0FBVCxDQUFtQjJDLFNBQW5CLEdBQStCLFNBQVNBLFNBQVQsQ0FBb0JDLFNBQXBCLEVBQStCQyxRQUEvQixFQUF5QztBQUN2RTs7Ozs7Ozs7O0FBU0EsS0FBSUMsWUFBWTNELEtBQU1pQyxTQUFOLENBQWhCOztBQUVBd0IsYUFBWTFELE9BQVE0RCxTQUFSLEVBQW1CQyxNQUFuQixDQUFaOztBQUVBSCxhQUFZQSxhQUFhcEQsaUJBQXpCO0FBQ0EsS0FBSSxPQUFPb0QsU0FBUCxJQUFvQixRQUF4QixFQUFrQztBQUNqQ0EsY0FBWXBELGlCQUFaO0FBQ0E7O0FBRURxRCxZQUFXbEUsT0FBUW1FLFNBQVIsRUFBbUJFLE9BQW5CLEVBQTRCLEtBQTVCLENBQVg7O0FBRUEsS0FBSUgsUUFBSixFQUFjO0FBQ2IsU0FBTyxDQUFFLEtBQUtILE9BQUwsRUFBRixFQUFtQixLQUFLeEMsUUFBeEIsRUFBbUNnQyxJQUFuQyxDQUF5Q1UsU0FBekMsQ0FBUDs7QUFFQSxFQUhELE1BR0s7QUFDSixTQUFPLEtBQUtGLE9BQUwsRUFBUDtBQUNBO0FBQ0QsQ0EzQkQ7O0FBNkJBOzs7Ozs7O0FBT0E3QyxTQUFTRyxTQUFULENBQW1CRCxPQUFuQixHQUE2QixTQUFTQSxPQUFULEdBQW1CO0FBQy9DLFFBQU8sQ0FBRSxLQUFLTSxJQUFMLENBQVVJLEdBQVYsR0FBaUIrQixNQUFqQixDQUF5QmpELGNBQXpCLENBQUYsRUFBNkMsS0FBS2lCLE1BQWxEO0FBQ0x5QyxJQURLLENBQ0EsU0FBU0MsV0FBVCxDQUFzQkMsS0FBdEIsRUFBNkIsQ0FBRSxPQUFPM0IsU0FBVW5DLFFBQVM4RCxLQUFULENBQVYsQ0FBUCxDQUFzQyxDQURyRSxDQUFQO0FBRUEsQ0FIRDs7QUFLQUMsT0FBT0MsT0FBUCxHQUFpQnhELFFBQWpCIiwiZmlsZSI6ImluZmluaXRpLnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qO1xyXG5cdEBtb2R1bGUtbGljZW5zZTpcclxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxyXG5cdFx0QG1pdC1saWNlbnNlXHJcblxyXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxyXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXHJcblxyXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblx0XHRTT0ZUV0FSRS5cclxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXHJcblxyXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcclxuXHRcdHtcclxuXHRcdFx0XCJwYWNrYWdlXCI6IFwiaW5maW5pdGlcIixcclxuXHRcdFx0XCJwYXRoXCI6IFwiaW5maW5pdGkvaW5maW5pdGkuanNcIixcclxuXHRcdFx0XCJmaWxlXCI6IFwiaW5maW5pdGkuanNcIixcclxuXHRcdFx0XCJtb2R1bGVcIjogXCJpbmZpbml0aVwiLFxyXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxyXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxyXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXHJcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCIsXHJcblx0XHRcdFx0XCJWaW5zZSBWaW5hbG9uIDx2aW5zZXZpbmFsb25AZ21haWwuY29tPlwiXHJcblx0XHRcdF0sXHJcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbTp2b2xrb3Zhc3lzdGVtcy9pbmZpbml0aS5naXRcIixcclxuXHRcdFx0XCJ0ZXN0XCI6IFwiaW5maW5pdGktdGVzdC5qc1wiLFxyXG5cdFx0XHRcImdsb2JhbFwiOiB0cnVlLFxyXG5cdFx0XHRcImNsYXNzXCI6IHRydWUsXHJcblx0XHR9XHJcblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxyXG5cclxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XHJcblx0XHRUYWtlIG5vdGUgdGhhdCB0aGUgdGltZSBwYXJ0IGlzIGFsd2F5cyBpbiB6ZXJvLlxyXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cclxuXHJcblx0QGluY2x1ZGU6XHJcblx0XHR7XHJcblx0XHRcdFwiY2xhem9mXCI6IFwiY2xhem9mXCIsXHJcblx0XHRcdFwiZGVwaGVyXCI6IFwiZGVwaGVyXCIsXHJcblx0XHRcdFwiZGlhdG9tXCI6IFwiZGlhdG9tXCIsXHJcblx0XHRcdFwiZG91YnRcIjogXCJkb3VidFwiLFxyXG5cdFx0XHRcImZhbHplXCI6IFwiZmFsemVcIixcclxuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXHJcblx0XHRcdFwiaGFyZGVuXCI6IFwiaGFyZGVuXCIsXHJcblx0XHRcdFwibW9tZW50XCI6IFwibW9tZW50XCIsXHJcblx0XHRcdFwib3B0Zm9yXCI6IFwib3B0Zm9yXCIsXHJcblx0XHRcdFwicmF6ZVwiOiBcInJhemVcIixcclxuXHRcdFx0XCJzdHJpbmdlXCI6IFwic3RyaW5nZVwiLFxyXG5cdFx0XHRcInRydWx5XCI6IFwidHJ1bHlcIixcclxuXHRcdFx0XCJVMjAwYlwiOiBcInUyMDBiXCJcclxuXHRcdH1cclxuXHRAZW5kLWluY2x1ZGVcclxuKi9cclxuXHJcbmNvbnN0IGNsYXpvZiA9IHJlcXVpcmUoIFwiY2xhem9mXCIgKTtcclxuY29uc3QgZGVwaGVyID0gcmVxdWlyZSggXCJkZXBoZXJcIiApO1xyXG5jb25zdCBkaWF0b20gPSByZXF1aXJlKCBcImRpYXRvbVwiICk7XHJcbmNvbnN0IGRvdWJ0ID0gcmVxdWlyZSggXCJkb3VidFwiICk7XHJcbmNvbnN0IGZhbHplID0gcmVxdWlyZSggXCJmYWx6ZVwiICk7XHJcbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XHJcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcclxuY29uc3QgbW9tZW50ID0gcmVxdWlyZSggXCJtb21lbnRcIiApO1xyXG5jb25zdCBvcHRmb3IgPSByZXF1aXJlKCBcIm9wdGZvclwiICk7XHJcbmNvbnN0IHJhemUgPSByZXF1aXJlKCBcInJhemVcIiApO1xyXG5jb25zdCB0cnVseSA9IHJlcXVpcmUoIFwidHJ1bHlcIiApO1xyXG5jb25zdCBzdHJpbmdlID0gcmVxdWlyZSggXCJzdHJpbmdlXCIgKTtcclxuY29uc3QgVTIwMGIgPSByZXF1aXJlKCBcInUyMDBiXCIgKTtcclxuXHJcbmNvbnN0IENPTVBBQ1RfRk9STUFUID0gXCJZWVlZTU1EREhIXCI7XHJcbmNvbnN0IERFRkFVTFRfU0VQQVJBVE9SID0gXCIgfCBcIjtcclxuY29uc3QgSVNPODYwMV9GT1JNQVQgPSBcIllZWVktTU0tRERUSEg6MDA6MDBcIjtcclxuY29uc3QgTlVNRVJJQ19QQVRURVJOID0gL1xcZCsvO1xyXG5jb25zdCBTSU1QTEVfREFURV9GT1JNQVQgPSBcIk1NTU0gREQsIFlZWVlcIjtcclxuY29uc3QgVFJVRV9EQVRFX1BBVFRFUk4gPSAvXlxcLVtcXGRcXHUyMDBiXXsyNn18XltcXGRcXHUyMDBiXXsyN30kLztcclxuXHJcbmNvbnN0IEluZmluaXRpID0gZGlhdG9tKCBcIkluZmluaXRpXCIgKTtcclxuXHJcbmhhcmRlbiggXCJub3dcIiwgZnVuY3Rpb24gbm93KCApe1xyXG5cdHJldHVybiBJbmZpbml0aSggKS5jb21wYWN0KCApO1xyXG59LCBJbmZpbml0aSApO1xyXG5cclxuSW5maW5pdGkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoICl7XHJcblx0cmV0dXJuIHRoaXMudHJ1ZURhdGU7XHJcbn07XHJcblxyXG5JbmZpbml0aS5wcm90b3R5cGUudmFsdWVPZiA9IGZ1bmN0aW9uIHZhbHVlT2YoICl7XHJcblx0cmV0dXJuIHRoaXMudHJ1ZURhdGU7XHJcbn07XHJcblxyXG5JbmZpbml0aS5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIGluaXRpYWxpemUoIGRhdGUgKXtcclxuXHQvKjtcclxuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XHJcblx0XHRcdHtcclxuXHRcdFx0XHRcImRhdGU6cmVxdWlyZWRcIjogW1xyXG5cdFx0XHRcdFx0WyBcIm51bWJlclwiLCBcIm51bWJlclwiIF0sXHJcblx0XHRcdFx0XHRcInN0cmluZ1wiLFxyXG5cdFx0XHRcdFx0RGF0ZVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cclxuXHQqL1xyXG5cclxuXHRpZiggZG91YnQoIGRhdGUsIEFSUkFZICkgJiZcclxuXHRcdHR5cGVvZiBkYXRlWyAwIF0gPT0gXCJudW1iZXJcIiAmJlxyXG5cdFx0dHlwZW9mIGRhdGVbIDEgXSA9PSBcIm51bWJlclwiICYmXHJcblx0XHRzdHJpbmdlKCBkYXRlWyAwIF0gKS5sZW5ndGggPT0gMTAgKVxyXG5cdHtcclxuXHRcdHRoaXMub2Zmc2V0ID0gZGF0ZVsgMSBdO1xyXG5cclxuXHRcdHRoaXMuZGF0ZSA9IG1vbWVudC51dGMoIGRhdGVbIDAgXSwgQ09NUEFDVF9GT1JNQVQgKVxyXG5cdFx0XHQubWludXRlKCAwIClcclxuXHRcdFx0LnNlY29uZCggMCApXHJcblx0XHRcdC5taWxsaXNlY29uZCggMCApXHJcblx0XHRcdC51dGNPZmZzZXQoIHRoaXMub2Zmc2V0ICk7XHJcblxyXG5cdFx0dGhpcy5wZXJzaXN0KCApO1xyXG5cclxuXHR9ZWxzZSBpZiggdHlwZW9mIGRhdGUgPT0gXCJzdHJpbmdcIiAmJiBkYXRlLmxlbmd0aCA9PSAyNyAmJiBUUlVFX0RBVEVfUEFUVEVSTi50ZXN0KCBkYXRlICkgKXtcclxuXHRcdHRoaXMuZGF0ZSA9IGRhdGU7XHJcblxyXG5cdFx0dGhpcy5wYXJzZSggKTtcclxuXHJcblx0fWVsc2UgaWYoIHRydWx5KCBkYXRlICkgJiYgdHlwZW9mIGRhdGUgPT0gXCJzdHJpbmdcIiApe1xyXG5cdFx0dHJ5e1xyXG5cdFx0XHRkYXRlID0gbW9tZW50KCBkYXRlIClcclxuXHRcdFx0XHQubWludXRlKCAwIClcclxuXHRcdFx0XHQuc2Vjb25kKCAwIClcclxuXHRcdFx0XHQubWlsbGlzZWNvbmQoIDAgKTtcclxuXHJcblx0XHRcdGlmKCBkYXRlLmlzVmFsaWQoICkgKXtcclxuXHRcdFx0XHR0aGlzLmluaXRpYWxpemUoIGRhdGUudG9EYXRlKCApICk7XHJcblxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBpbnZhbGlkIGRhdGUgZm9ybWF0LCAkeyBhcmd1bWVudHNbIDAgXSB9YCApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fWNhdGNoKCBlcnJvciApe1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBlcnJvciBlbmNvdW50ZXJlZCB3aGlsZSBwYXJzaW5nIGRhdGUsICR7IGVycm9yLnN0YWNrIH1gICk7XHJcblx0XHR9XHJcblxyXG5cdH1lbHNlIGlmKCBjbGF6b2YoIGRhdGUsIERhdGUgKSApe1xyXG5cdFx0dGhpcy5kYXRlID0gbW9tZW50KCBkYXRlIClcclxuXHRcdFx0Lm1pbnV0ZSggMCApXHJcblx0XHRcdC5zZWNvbmQoIDAgKVxyXG5cdFx0XHQubWlsbGlzZWNvbmQoIDAgKTtcclxuXHJcblx0XHR0aGlzLnBlcnNpc3QoICk7XHJcblxyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5kYXRlID0gbW9tZW50KCBuZXcgRGF0ZSggKSApXHJcblx0XHRcdC5taW51dGUoIDAgKVxyXG5cdFx0XHQuc2Vjb25kKCAwIClcclxuXHRcdFx0Lm1pbGxpc2Vjb25kKCAwICk7XHJcblxyXG5cdFx0dGhpcy5wZXJzaXN0KCApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKlxyXG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcclxuXHRcdFRoaXMgc2hvdWxkIGJlIHBlcnNpc3RlZCBvbiB0aGUgbWFjaGluZSB3aGVyZSB0aGUgdGltZXpvbmUgaXMgcGVyc2lzdGVkLlxyXG5cclxuXHRcdEl0IHdpbGwgc2F2ZSB0aGUgdHJ1ZSBkYXRlIGluIHV0YyBmb3JtYXQgKyB0aGUgbWFjaGluZSB0aW1lem9uZS5cclxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXHJcbiovXHJcbkluZmluaXRpLnByb3RvdHlwZS5wZXJzaXN0ID0gZnVuY3Rpb24gcGVyc2lzdCggKXtcclxuXHRpZiggdHJ1bHkoIHRoaXMudHJ1ZURhdGUgKSApe1xyXG5cdFx0cmV0dXJuIHRoaXMudHJ1ZURhdGU7XHJcblx0fVxyXG5cclxuXHRsZXQgZGF0ZSA9IHRoaXMuZGF0ZS50b0RhdGUoICk7XHJcblxyXG5cdGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldCB8fCB0aGlzLmRhdGUudXRjT2Zmc2V0KCApO1xyXG5cdHRyeXtcclxuXHRcdG9mZnNldCA9IHBhcnNlSW50KCBvZmZzZXQgKTtcclxuXHJcblx0fWNhdGNoKCBlcnJvciApe1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCBgaW52YWxpZCB0aW1lem9uZSBvZmZzZXQsICR7IGVycm9yLnN0YWNrIH1gICk7XHJcblx0fVxyXG5cclxuXHRsZXQgcG9sYXJpdHkgPSAwO1xyXG5cdGlmKCBvZmZzZXQgIT0gMCApe1xyXG5cdFx0cG9sYXJpdHkgPSBvZmZzZXQgLyBNYXRoLmFicyggb2Zmc2V0ICk7XHJcblx0fVxyXG5cclxuXHRsZXQgdHJ1ZURhdGUgPSBVMjAwYiggW1xyXG5cdFx0Ly86IHBvc2l0aXZlIC8gbmVnYXRpdmUgb2Zmc2V0XHJcblx0XHRzdHJpbmdlKCBwb2xhcml0eSApLnJlcGxhY2UoIE5VTUVSSUNfUEFUVEVSTiwgXCJcIiApIHx8IFwiMFwiLFxyXG5cclxuXHRcdC8vOiB5ZWFyXHJcblx0XHRkYXRlLmdldFVUQ0Z1bGxZZWFyKCApLFxyXG5cclxuXHRcdC8vOiBtb250aFxyXG5cdFx0KCBcIjBcIiArICggZGF0ZS5nZXRVVENNb250aCggKSArIDEgKSApLnNsaWNlKCAtMiApLFxyXG5cclxuXHRcdC8vOiBkYXlcclxuXHRcdCggXCIwXCIgKyAoIGRhdGUuZ2V0VVRDRGF0ZSggKSApICkuc2xpY2UoIC0yICksXHJcblxyXG5cdFx0Ly86IGhvdXJcclxuXHRcdCggXCIwXCIgKyAoIGRhdGUuZ2V0VVRDSG91cnMoICkgKSApLnNsaWNlKCAtMiApLFxyXG5cclxuXHRcdC8vOiBtaW51dGVcclxuXHRcdFwiMDBcIixcclxuXHJcblx0XHQvLzogc2Vjb25kXHJcblx0XHRcIjAwXCIsXHJcblxyXG5cdFx0Ly86IG9mZnNldFxyXG5cdFx0KCBcIjAwMFwiICsgTWF0aC5hYnMoIG9mZnNldCApICkuc2xpY2UoIC01IClcclxuXHRdICkuam9pbiggKTtcclxuXHJcblx0dGhpcy50cnVlRGF0ZSA9IHRydWVEYXRlO1xyXG5cclxuXHR0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuXHJcblx0cmV0dXJuIHRydWVEYXRlO1xyXG59O1xyXG5cclxuLyo7XHJcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxyXG5cdFx0RGVjb21wb3NlIHRydWUgZGF0ZSB0byBhIG1vbWVudCBvYmplY3QuXHJcblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxyXG4qL1xyXG5JbmZpbml0aS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSggKXtcclxuXHRsZXQgZGF0ZSA9IHRoaXMuZGF0ZTtcclxuXHJcblx0aWYoIHR5cGVvZiB0aGlzLmRhdGUgPT0gXCJzdHJpbmdcIiApe1xyXG5cdFx0ZGF0ZSA9IFUyMDBiKCB0aGlzLmRhdGUgKS5zZXBhcmF0ZSggKTtcclxuXHJcblx0fWVsc2UgaWYoIHRydWx5KCB0aGlzLnRydWVEYXRlICkgKXtcclxuXHRcdGRhdGUgPSBVMjAwYiggdGhpcy50cnVlRGF0ZSApLnNlcGFyYXRlKCApO1xyXG5cclxuXHR9ZWxzZXtcclxuXHRcdHRocm93IG5ldyBFcnJvciggXCJkYXRlIG5vdCBzcGVjaWZpZWRcIiApO1xyXG5cdH1cclxuXHJcblx0dHJ5e1xyXG5cdFx0bGV0IHBvbGFyaXR5ID0gcGFyc2VJbnQoIGRhdGVbIDAgXSArIDEgKTtcclxuXHJcblx0XHR0aGlzLm9mZnNldCA9IHBvbGFyaXR5ICogcGFyc2VJbnQoIGRhdGVbIDcgXSApO1xyXG5cclxuXHRcdGRhdGUgPSBtb21lbnQudXRjKCApXHJcblx0XHRcdC55ZWFyKCBwYXJzZUludCggZGF0ZVsgMSBdICkgKVxyXG5cdFx0XHQubW9udGgoIHBhcnNlSW50KCBkYXRlWyAyIF0gKSAtIDEgKVxyXG5cdFx0XHQuZGF0ZSggcGFyc2VJbnQoIGRhdGVbIDMgXSApIClcclxuXHRcdFx0LmhvdXIoIHBhcnNlSW50KCBkYXRlWyA0IF0gKSApXHJcblx0XHRcdC5taW51dGUoIDAgKVxyXG5cdFx0XHQuc2Vjb25kKCAwIClcclxuXHRcdFx0Lm1pbGxpc2Vjb25kKCAwICk7XHJcblxyXG5cdH1jYXRjaCggZXJyb3IgKXtcclxuXHRcdHRocm93IG5ldyBFcnJvciggYGVycm9yIHBhcnNpbmcgdHJ1ZSBkYXRlLCAkeyBlcnJvci5zdGFjayB9YCApO1xyXG5cdH1cclxuXHJcblx0Ly86IFRoaXMgd2lsbCBzZXQgdGhlIHRpbWV6b25lIG9mIHRoZSBEYXRlIG9iamVjdCB0byB0aGUgbWFjaGluZSB0aW1lem9uZS5cclxuXHR0aGlzLmRhdGUgPSBkYXRlO1xyXG5cclxuXHR0aGlzLnBlcnNpc3QoICk7XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyo7XHJcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxyXG5cdFx0UmVsYXRpdmUgZGF0ZSBpcyB0aGUgZGF0ZSBhcHBsaWVkIHdpdGggVVRDIG9mZnNldC5cclxuXHJcblx0XHRUaGlzIHdpbGwgcmV0dXJuIHRoZSBkYXRlIGluIElTTzg2MDEgZm9ybWF0LlxyXG5cclxuXHRcdGBZWVlZLU1NLUREVEhIOjAwOjAwYFxyXG5cclxuXHRcdERvIG5vdCB1c2UgdGhpcyB0byByZWZlcmVuY2UgdHJ1ZSBkYXRlLlxyXG5cdEBlbmQtbWV0aG9kLWRvY3VtZW50YXRpb25cclxuKi9cclxuSW5maW5pdGkucHJvdG90eXBlLnJlbGF0aXZlRGF0ZSA9IGZ1bmN0aW9uIHJlbGF0aXZlRGF0ZSggKXtcclxuXHRpZiggZmFsemUoIHRoaXMuZGF0ZSApICl7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW50ZXJuYWwgZGF0ZSBlbXB0eVwiICk7XHJcblx0fVxyXG5cclxuXHRpZiggZmFsenkoIHRoaXMub2Zmc2V0ICkgKXtcclxuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnRlcm5hbCB0aW1lem9uZSBvZmZzZXQgZW1wdHlcIiApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRoaXMuZGF0ZS51dGMoICkudXRjT2Zmc2V0KCB0aGlzLm9mZnNldCApLmZvcm1hdCggSVNPODYwMV9GT1JNQVQgKTtcclxufTtcclxuXHJcbi8qO1xyXG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcclxuXHRcdFJlYWwgZGF0ZSBpcyB0aGUgZGF0ZSB3aXRoIG5vIFVUQyBvZmZzZXQgYXBwbGllZC5cclxuXHJcblx0XHRUaGlzIHdpbGwgcmV0dXJuIHRoZSBkYXRlIGluIElTTzg2MDFcclxuXHJcblx0XHRgWVlZWS1NTS1ERFRISDowMDowMGBcclxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXHJcbiovXHJcbkluZmluaXRpLnByb3RvdHlwZS5yZWFsRGF0ZSA9IGZ1bmN0aW9uIHJlYWxEYXRlKCApe1xyXG5cdGlmKCBmYWx6ZSggdGhpcy5kYXRlICkgKXtcclxuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnRlcm5hbCBkYXRlIGVtcHR5XCIgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0aGlzLmRhdGUudXRjKCApLmZvcm1hdCggSVNPODYwMV9GT1JNQVQgKTtcclxufTtcclxuXHJcbi8qO1xyXG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcclxuXHRcdFJldHVybnMgYSBzaW1wbGUgaHVtYW4gcmVhZGFibGUgcmVwcmVzZW50YXRpb24gb2YgZGF0ZS5cclxuXHJcblx0XHREYXRlIHdpbGwgYmUgcmVsYXRpdmUuXHJcblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxyXG4qL1xyXG5JbmZpbml0aS5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uIGdldERhdGUoICl7XHJcblx0aWYoIGZhbHplKCB0aGlzLmRhdGUgKSApe1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludGVybmFsIGRhdGUgZW1wdHlcIiApO1xyXG5cdH1cclxuXHJcblx0aWYoIGZhbHp5KCB0aGlzLm9mZnNldCApICl7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW50ZXJuYWwgdGltZXpvbmUgb2Zmc2V0IGVtcHR5XCIgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0aGlzLmRhdGUudXRjKCApLnV0Y09mZnNldCggdGhpcy5vZmZzZXQgKS5mb3JtYXQoIFNJTVBMRV9EQVRFX0ZPUk1BVCApO1xyXG59O1xyXG5cclxuLyo7XHJcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxyXG5cdFx0UmV0dXJucyBhIHNpbXBsZSBodW1hbiByZWFkYWJsZSByZXByZXNlbnRhdGlvbiBvZiBkYXRlLlxyXG5cclxuXHRcdERhdGUgd2lsbCBiZSByZWxhdGl2ZS5cclxuXHJcblx0XHRTZXR0aW5nIGNvbXBsZXRlIHdpbGwgYXBwZW5kIHRydWUgZGF0ZSBmb3JtYXQuXHJcblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxyXG4qL1xyXG5JbmZpbml0aS5wcm90b3R5cGUucHJpbnREYXRlID0gZnVuY3Rpb24gcHJpbnREYXRlKCBzZXBhcmF0b3IsIGNvbXBsZXRlICl7XHJcblx0Lyo7XHJcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJzZXBhcmF0b3JcIjogXCJzdHJpbmdcIixcclxuXHRcdFx0XHRcImNvbXBsZXRlXCI6IFwiYm9vbGVhblwiXHJcblx0XHRcdH1cclxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXHJcblx0Ki9cclxuXHJcblx0bGV0IHBhcmFtZXRlciA9IHJhemUoIGFyZ3VtZW50cyApO1xyXG5cclxuXHRzZXBhcmF0b3IgPSBvcHRmb3IoIHBhcmFtZXRlciwgU1RSSU5HICk7XHJcblxyXG5cdHNlcGFyYXRvciA9IHNlcGFyYXRvciB8fCBERUZBVUxUX1NFUEFSQVRPUjtcclxuXHRpZiggdHlwZW9mIHNlcGFyYXRvciAhPSBcInN0cmluZ1wiICl7XHJcblx0XHRzZXBhcmF0b3IgPSBERUZBVUxUX1NFUEFSQVRPUjtcclxuXHR9XHJcblxyXG5cdGNvbXBsZXRlID0gZGVwaGVyKCBwYXJhbWV0ZXIsIEJPT0xFQU4sIGZhbHNlICk7XHJcblxyXG5cdGlmKCBjb21wbGV0ZSApe1xyXG5cdFx0cmV0dXJuIFsgdGhpcy5nZXREYXRlKCApLCB0aGlzLnRydWVEYXRlIF0uam9pbiggc2VwYXJhdG9yICk7XHJcblxyXG5cdH1lbHNle1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0ZSggKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKjtcclxuXHRAbWV0aG9kLWRvY3VtZW50YXRpb246XHJcblx0XHRSZXR1cm5zIGEgbnVtZXJpY2FsIHJlcHJlc2VudGF0aW9uIG9mIHRydWUgZGF0ZSBpbiBVVEMuXHJcblxyXG5cdFx0VGltZSBwYXJ0IGlzIGV4Y2x1ZGVkIGV4Y2VwdCB0aGUgaG91ci5cclxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXHJcbiovXHJcbkluZmluaXRpLnByb3RvdHlwZS5jb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCggKXtcclxuXHRyZXR1cm4gWyB0aGlzLmRhdGUudXRjKCApLmZvcm1hdCggQ09NUEFDVF9GT1JNQVQgKSwgdGhpcy5vZmZzZXQgXVxyXG5cdFx0Lm1hcCggZnVuY3Rpb24gb25FYWNoVG9rZW4oIHRva2VuICl7IHJldHVybiBwYXJzZUludCggc3RyaW5nZSggdG9rZW4gKSApOyB9ICk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEluZmluaXRpO1xyXG4iXX0=
//# sourceMappingURL=infiniti.support.js.map
