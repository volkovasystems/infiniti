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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZmluaXRpLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiY2xhem9mIiwicmVxdWlyZSIsImRlcGhlciIsImRpYXRvbSIsImRvdWJ0IiwiZmFsemUiLCJmYWx6eSIsImhhcmRlbiIsIm1vbWVudCIsIm9wdGZvciIsInJhemUiLCJ0cnVseSIsInN0cmluZ2UiLCJVMjAwYiIsIkNPTVBBQ1RfRk9STUFUIiwiREVGQVVMVF9TRVBBUkFUT1IiLCJJU084NjAxX0ZPUk1BVCIsIk5VTUVSSUNfUEFUVEVSTiIsIlNJTVBMRV9EQVRFX0ZPUk1BVCIsIlRSVUVfREFURV9QQVRURVJOIiwiSW5maW5pdGkiLCJub3ciLCJjb21wYWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJ0cnVlRGF0ZSIsInZhbHVlT2YiLCJpbml0aWFsaXplIiwiZGF0ZSIsIkFSUkFZIiwibGVuZ3RoIiwib2Zmc2V0IiwidXRjIiwibWludXRlIiwic2Vjb25kIiwibWlsbGlzZWNvbmQiLCJ1dGNPZmZzZXQiLCJwZXJzaXN0IiwidGVzdCIsInBhcnNlIiwiaXNWYWxpZCIsInRvRGF0ZSIsIkVycm9yIiwiYXJndW1lbnRzIiwiZXJyb3IiLCJzdGFjayIsIkRhdGUiLCJwYXJzZUludCIsInBvbGFyaXR5IiwiTWF0aCIsImFicyIsInJlcGxhY2UiLCJnZXRVVENGdWxsWWVhciIsImdldFVUQ01vbnRoIiwic2xpY2UiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJqb2luIiwic2VwYXJhdGUiLCJ5ZWFyIiwibW9udGgiLCJob3VyIiwicmVsYXRpdmVEYXRlIiwiZm9ybWF0IiwicmVhbERhdGUiLCJnZXREYXRlIiwicHJpbnREYXRlIiwic2VwYXJhdG9yIiwiY29tcGxldGUiLCJwYXJhbWV0ZXIiLCJTVFJJTkciLCJCT09MRUFOIiwibWFwIiwib25FYWNoVG9rZW4iLCJ0b2tlbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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SCxhQUFZQSxhQUFhcEQsaUJBQXpCO0FBQ0EsS0FBSSxPQUFPb0QsU0FBUCxJQUFvQixRQUF4QixFQUFrQztBQUNqQ0EsY0FBWXBELGlCQUFaO0FBQ0E7O0FBRURxRCxZQUFXbEUsT0FBUW1FLFNBQVIsRUFBbUJFLE9BQW5CLEVBQTRCLEtBQTVCLENBQVg7O0FBRUEsS0FBSUgsUUFBSixFQUFjO0FBQ2IsU0FBTyxDQUFFLEtBQUtILE9BQUwsRUFBRixFQUFtQixLQUFLeEMsUUFBeEIsRUFBbUNnQyxJQUFuQyxDQUF5Q1UsU0FBekMsQ0FBUDs7QUFFQSxFQUhELE1BR0s7QUFDSixTQUFPLEtBQUtGLE9BQUwsRUFBUDtBQUNBO0FBQ0QsQ0EzQkQ7O0FBNkJBOzs7Ozs7O0FBT0E3QyxTQUFTRyxTQUFULENBQW1CRCxPQUFuQixHQUE2QixTQUFTQSxPQUFULEdBQW1CO0FBQy9DLFFBQU8sQ0FBRSxLQUFLTSxJQUFMLENBQVVJLEdBQVYsR0FBaUIrQixNQUFqQixDQUF5QmpELGNBQXpCLENBQUYsRUFBNkMsS0FBS2lCLE1BQWxEO0FBQ0x5QyxJQURLLENBQ0EsU0FBU0MsV0FBVCxDQUFzQkMsS0FBdEIsRUFBNkIsQ0FBRSxPQUFPM0IsU0FBVW5DLFFBQVM4RCxLQUFULENBQVYsQ0FBUCxDQUFzQyxDQURyRSxDQUFQO0FBRUEsQ0FIRDs7QUFLQUMsT0FBT0MsT0FBUCxHQUFpQnhELFFBQWpCIiwiZmlsZSI6ImluZmluaXRpLnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcImluZmluaXRpXCIsXG5cdFx0XHRcInBhdGhcIjogXCJpbmZpbml0aS9pbmZpbml0aS5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwiaW5maW5pdGkuanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwiaW5maW5pdGlcIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIixcblx0XHRcdFx0XCJWaW5zZSBWaW5hbG9uIDx2aW5zZXZpbmFsb25AZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tOnZvbGtvdmFzeXN0ZW1zL2luZmluaXRpLmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwiaW5maW5pdGktdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZSxcblx0XHRcdFwiY2xhc3NcIjogdHJ1ZSxcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0VGFrZSBub3RlIHRoYXQgdGhlIHRpbWUgcGFydCBpcyBhbHdheXMgaW4gemVyby5cblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxuXG5cdEBpbmNsdWRlOlxuXHRcdHtcblx0XHRcdFwiY2xhem9mXCI6IFwiY2xhem9mXCIsXG5cdFx0XHRcImRlcGhlclwiOiBcImRlcGhlclwiLFxuXHRcdFx0XCJkaWF0b21cIjogXCJkaWF0b21cIixcblx0XHRcdFwiZG91YnRcIjogXCJkb3VidFwiLFxuXHRcdFx0XCJmYWx6ZVwiOiBcImZhbHplXCIsXG5cdFx0XHRcImZhbHp5XCI6IFwiZmFsenlcIixcblx0XHRcdFwiaGFyZGVuXCI6IFwiaGFyZGVuXCIsXG5cdFx0XHRcIm1vbWVudFwiOiBcIm1vbWVudFwiLFxuXHRcdFx0XCJvcHRmb3JcIjogXCJvcHRmb3JcIixcblx0XHRcdFwicmF6ZVwiOiBcInJhemVcIixcblx0XHRcdFwic3RyaW5nZVwiOiBcInN0cmluZ2VcIixcblx0XHRcdFwidHJ1bHlcIjogXCJ0cnVseVwiLFxuXHRcdFx0XCJVMjAwYlwiOiBcInUyMDBiXCJcblx0XHR9XG5cdEBlbmQtaW5jbHVkZVxuKi9cblxuY29uc3QgY2xhem9mID0gcmVxdWlyZSggXCJjbGF6b2ZcIiApO1xuY29uc3QgZGVwaGVyID0gcmVxdWlyZSggXCJkZXBoZXJcIiApO1xuY29uc3QgZGlhdG9tID0gcmVxdWlyZSggXCJkaWF0b21cIiApO1xuY29uc3QgZG91YnQgPSByZXF1aXJlKCBcImRvdWJ0XCIgKTtcbmNvbnN0IGZhbHplID0gcmVxdWlyZSggXCJmYWx6ZVwiICk7XG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xuY29uc3QgaGFyZGVuID0gcmVxdWlyZSggXCJoYXJkZW5cIiApO1xuY29uc3QgbW9tZW50ID0gcmVxdWlyZSggXCJtb21lbnRcIiApO1xuY29uc3Qgb3B0Zm9yID0gcmVxdWlyZSggXCJvcHRmb3JcIiApO1xuY29uc3QgcmF6ZSA9IHJlcXVpcmUoIFwicmF6ZVwiICk7XG5jb25zdCB0cnVseSA9IHJlcXVpcmUoIFwidHJ1bHlcIiApO1xuY29uc3Qgc3RyaW5nZSA9IHJlcXVpcmUoIFwic3RyaW5nZVwiICk7XG5jb25zdCBVMjAwYiA9IHJlcXVpcmUoIFwidTIwMGJcIiApO1xuXG5jb25zdCBDT01QQUNUX0ZPUk1BVCA9IFwiWVlZWU1NRERISFwiO1xuY29uc3QgREVGQVVMVF9TRVBBUkFUT1IgPSBcIiB8IFwiO1xuY29uc3QgSVNPODYwMV9GT1JNQVQgPSBcIllZWVktTU0tRERUSEg6MDA6MDBcIjtcbmNvbnN0IE5VTUVSSUNfUEFUVEVSTiA9IC9cXGQrLztcbmNvbnN0IFNJTVBMRV9EQVRFX0ZPUk1BVCA9IFwiTU1NTSBERCwgWVlZWVwiO1xuY29uc3QgVFJVRV9EQVRFX1BBVFRFUk4gPSAvXlxcLVtcXGRcXHUyMDBiXXsyNn18XltcXGRcXHUyMDBiXXsyN30kLztcblxuY29uc3QgSW5maW5pdGkgPSBkaWF0b20oIFwiSW5maW5pdGlcIiApO1xuXG5oYXJkZW4oIFwibm93XCIsIGZ1bmN0aW9uIG5vdyggKXtcblx0cmV0dXJuIEluZmluaXRpKCApLmNvbXBhY3QoICk7XG59LCBJbmZpbml0aSApO1xuXG5JbmZpbml0aS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyggKXtcblx0cmV0dXJuIHRoaXMudHJ1ZURhdGU7XG59O1xuXG5JbmZpbml0aS5wcm90b3R5cGUudmFsdWVPZiA9IGZ1bmN0aW9uIHZhbHVlT2YoICl7XG5cdHJldHVybiB0aGlzLnRydWVEYXRlO1xufTtcblxuSW5maW5pdGkucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiBpbml0aWFsaXplKCBkYXRlICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwiZGF0ZTpyZXF1aXJlZFwiOiBbXG5cdFx0XHRcdFx0WyBcIm51bWJlclwiLCBcIm51bWJlclwiIF0sXG5cdFx0XHRcdFx0XCJzdHJpbmdcIixcblx0XHRcdFx0XHREYXRlXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCBkb3VidCggZGF0ZSwgQVJSQVkgKSAmJlxuXHRcdHR5cGVvZiBkYXRlWyAwIF0gPT0gXCJudW1iZXJcIiAmJlxuXHRcdHR5cGVvZiBkYXRlWyAxIF0gPT0gXCJudW1iZXJcIiAmJlxuXHRcdHN0cmluZ2UoIGRhdGVbIDAgXSApLmxlbmd0aCA9PSAxMCApXG5cdHtcblx0XHR0aGlzLm9mZnNldCA9IGRhdGVbIDEgXTtcblxuXHRcdHRoaXMuZGF0ZSA9IG1vbWVudC51dGMoIGRhdGVbIDAgXSwgQ09NUEFDVF9GT1JNQVQgKVxuXHRcdFx0Lm1pbnV0ZSggMCApXG5cdFx0XHQuc2Vjb25kKCAwIClcblx0XHRcdC5taWxsaXNlY29uZCggMCApXG5cdFx0XHQudXRjT2Zmc2V0KCB0aGlzLm9mZnNldCApO1xuXG5cdFx0dGhpcy5wZXJzaXN0KCApO1xuXG5cdH1lbHNlIGlmKCB0eXBlb2YgZGF0ZSA9PSBcInN0cmluZ1wiICYmIGRhdGUubGVuZ3RoID09IDI3ICYmIFRSVUVfREFURV9QQVRURVJOLnRlc3QoIGRhdGUgKSApe1xuXHRcdHRoaXMuZGF0ZSA9IGRhdGU7XG5cblx0XHR0aGlzLnBhcnNlKCApO1xuXG5cdH1lbHNlIGlmKCB0cnVseSggZGF0ZSApICYmIHR5cGVvZiBkYXRlID09IFwic3RyaW5nXCIgKXtcblx0XHR0cnl7XG5cdFx0XHRkYXRlID0gbW9tZW50KCBkYXRlIClcblx0XHRcdFx0Lm1pbnV0ZSggMCApXG5cdFx0XHRcdC5zZWNvbmQoIDAgKVxuXHRcdFx0XHQubWlsbGlzZWNvbmQoIDAgKTtcblxuXHRcdFx0aWYoIGRhdGUuaXNWYWxpZCggKSApe1xuXHRcdFx0XHR0aGlzLmluaXRpYWxpemUoIGRhdGUudG9EYXRlKCApICk7XG5cblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBpbnZhbGlkIGRhdGUgZm9ybWF0LCAkeyBhcmd1bWVudHNbIDAgXSB9YCApO1xuXHRcdFx0fVxuXG5cdFx0fWNhdGNoKCBlcnJvciApe1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBgZXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgcGFyc2luZyBkYXRlLCAkeyBlcnJvci5zdGFjayB9YCApO1xuXHRcdH1cblxuXHR9ZWxzZSBpZiggY2xhem9mKCBkYXRlLCBEYXRlICkgKXtcblx0XHR0aGlzLmRhdGUgPSBtb21lbnQoIGRhdGUgKVxuXHRcdFx0Lm1pbnV0ZSggMCApXG5cdFx0XHQuc2Vjb25kKCAwIClcblx0XHRcdC5taWxsaXNlY29uZCggMCApO1xuXG5cdFx0dGhpcy5wZXJzaXN0KCApO1xuXG5cdH1lbHNle1xuXHRcdHRoaXMuZGF0ZSA9IG1vbWVudCggbmV3IERhdGUoICkgKVxuXHRcdFx0Lm1pbnV0ZSggMCApXG5cdFx0XHQuc2Vjb25kKCAwIClcblx0XHRcdC5taWxsaXNlY29uZCggMCApO1xuXG5cdFx0dGhpcy5wZXJzaXN0KCApO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKlxuXHRAbWV0aG9kLWRvY3VtZW50YXRpb246XG5cdFx0VGhpcyBzaG91bGQgYmUgcGVyc2lzdGVkIG9uIHRoZSBtYWNoaW5lIHdoZXJlIHRoZSB0aW1lem9uZSBpcyBwZXJzaXN0ZWQuXG5cblx0XHRJdCB3aWxsIHNhdmUgdGhlIHRydWUgZGF0ZSBpbiB1dGMgZm9ybWF0ICsgdGhlIG1hY2hpbmUgdGltZXpvbmUuXG5cdEBlbmQtbWV0aG9kLWRvY3VtZW50YXRpb25cbiovXG5JbmZpbml0aS5wcm90b3R5cGUucGVyc2lzdCA9IGZ1bmN0aW9uIHBlcnNpc3QoICl7XG5cdGlmKCB0cnVseSggdGhpcy50cnVlRGF0ZSApICl7XG5cdFx0cmV0dXJuIHRoaXMudHJ1ZURhdGU7XG5cdH1cblxuXHRsZXQgZGF0ZSA9IHRoaXMuZGF0ZS50b0RhdGUoICk7XG5cblx0bGV0IG9mZnNldCA9IHRoaXMub2Zmc2V0IHx8IHRoaXMuZGF0ZS51dGNPZmZzZXQoICk7XG5cdHRyeXtcblx0XHRvZmZzZXQgPSBwYXJzZUludCggb2Zmc2V0ICk7XG5cblx0fWNhdGNoKCBlcnJvciApe1xuXHRcdHRocm93IG5ldyBFcnJvciggYGludmFsaWQgdGltZXpvbmUgb2Zmc2V0LCAkeyBlcnJvci5zdGFjayB9YCApO1xuXHR9XG5cblx0bGV0IHBvbGFyaXR5ID0gMDtcblx0aWYoIG9mZnNldCAhPSAwICl7XG5cdFx0cG9sYXJpdHkgPSBvZmZzZXQgLyBNYXRoLmFicyggb2Zmc2V0ICk7XG5cdH1cblxuXHRsZXQgdHJ1ZURhdGUgPSBVMjAwYiggW1xuXHRcdC8vOiBwb3NpdGl2ZSAvIG5lZ2F0aXZlIG9mZnNldFxuXHRcdHN0cmluZ2UoIHBvbGFyaXR5ICkucmVwbGFjZSggTlVNRVJJQ19QQVRURVJOLCBcIlwiICkgfHwgXCIwXCIsXG5cblx0XHQvLzogeWVhclxuXHRcdGRhdGUuZ2V0VVRDRnVsbFllYXIoICksXG5cblx0XHQvLzogbW9udGhcblx0XHQoIFwiMFwiICsgKCBkYXRlLmdldFVUQ01vbnRoKCApICsgMSApICkuc2xpY2UoIC0yICksXG5cblx0XHQvLzogZGF5XG5cdFx0KCBcIjBcIiArICggZGF0ZS5nZXRVVENEYXRlKCApICkgKS5zbGljZSggLTIgKSxcblxuXHRcdC8vOiBob3VyXG5cdFx0KCBcIjBcIiArICggZGF0ZS5nZXRVVENIb3VycyggKSApICkuc2xpY2UoIC0yICksXG5cblx0XHQvLzogbWludXRlXG5cdFx0XCIwMFwiLFxuXG5cdFx0Ly86IHNlY29uZFxuXHRcdFwiMDBcIixcblxuXHRcdC8vOiBvZmZzZXRcblx0XHQoIFwiMDAwXCIgKyBNYXRoLmFicyggb2Zmc2V0ICkgKS5zbGljZSggLTUgKVxuXHRdICkuam9pbiggKTtcblxuXHR0aGlzLnRydWVEYXRlID0gdHJ1ZURhdGU7XG5cblx0dGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cblx0cmV0dXJuIHRydWVEYXRlO1xufTtcblxuLyo7XG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcblx0XHREZWNvbXBvc2UgdHJ1ZSBkYXRlIHRvIGEgbW9tZW50IG9iamVjdC5cblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxuKi9cbkluZmluaXRpLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKCApe1xuXHRsZXQgZGF0ZSA9IHRoaXMuZGF0ZTtcblxuXHRpZiggdHlwZW9mIHRoaXMuZGF0ZSA9PSBcInN0cmluZ1wiICl7XG5cdFx0ZGF0ZSA9IFUyMDBiKCB0aGlzLmRhdGUgKS5zZXBhcmF0ZSggKTtcblxuXHR9ZWxzZSBpZiggdHJ1bHkoIHRoaXMudHJ1ZURhdGUgKSApe1xuXHRcdGRhdGUgPSBVMjAwYiggdGhpcy50cnVlRGF0ZSApLnNlcGFyYXRlKCApO1xuXG5cdH1lbHNle1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJkYXRlIG5vdCBzcGVjaWZpZWRcIiApO1xuXHR9XG5cblx0dHJ5e1xuXHRcdGxldCBwb2xhcml0eSA9IHBhcnNlSW50KCBkYXRlWyAwIF0gKyAxICk7XG5cblx0XHR0aGlzLm9mZnNldCA9IHBvbGFyaXR5ICogcGFyc2VJbnQoIGRhdGVbIDcgXSApO1xuXG5cdFx0ZGF0ZSA9IG1vbWVudC51dGMoIClcblx0XHRcdC55ZWFyKCBwYXJzZUludCggZGF0ZVsgMSBdICkgKVxuXHRcdFx0Lm1vbnRoKCBwYXJzZUludCggZGF0ZVsgMiBdICkgLSAxIClcblx0XHRcdC5kYXRlKCBwYXJzZUludCggZGF0ZVsgMyBdICkgKVxuXHRcdFx0LmhvdXIoIHBhcnNlSW50KCBkYXRlWyA0IF0gKSApXG5cdFx0XHQubWludXRlKCAwIClcblx0XHRcdC5zZWNvbmQoIDAgKVxuXHRcdFx0Lm1pbGxpc2Vjb25kKCAwICk7XG5cblx0fWNhdGNoKCBlcnJvciApe1xuXHRcdHRocm93IG5ldyBFcnJvciggYGVycm9yIHBhcnNpbmcgdHJ1ZSBkYXRlLCAkeyBlcnJvci5zdGFjayB9YCApO1xuXHR9XG5cblx0Ly86IFRoaXMgd2lsbCBzZXQgdGhlIHRpbWV6b25lIG9mIHRoZSBEYXRlIG9iamVjdCB0byB0aGUgbWFjaGluZSB0aW1lem9uZS5cblx0dGhpcy5kYXRlID0gZGF0ZTtcblxuXHR0aGlzLnBlcnNpc3QoICk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKjtcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxuXHRcdFJlbGF0aXZlIGRhdGUgaXMgdGhlIGRhdGUgYXBwbGllZCB3aXRoIFVUQyBvZmZzZXQuXG5cblx0XHRUaGlzIHdpbGwgcmV0dXJuIHRoZSBkYXRlIGluIElTTzg2MDEgZm9ybWF0LlxuXG5cdFx0YFlZWVktTU0tRERUSEg6MDA6MDBgXG5cblx0XHREbyBub3QgdXNlIHRoaXMgdG8gcmVmZXJlbmNlIHRydWUgZGF0ZS5cblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxuKi9cbkluZmluaXRpLnByb3RvdHlwZS5yZWxhdGl2ZURhdGUgPSBmdW5jdGlvbiByZWxhdGl2ZURhdGUoICl7XG5cdGlmKCBmYWx6ZSggdGhpcy5kYXRlICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW50ZXJuYWwgZGF0ZSBlbXB0eVwiICk7XG5cdH1cblxuXHRpZiggZmFsenkoIHRoaXMub2Zmc2V0ICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW50ZXJuYWwgdGltZXpvbmUgb2Zmc2V0IGVtcHR5XCIgKTtcblx0fVxuXG5cdHJldHVybiB0aGlzLmRhdGUudXRjKCApLnV0Y09mZnNldCggdGhpcy5vZmZzZXQgKS5mb3JtYXQoIElTTzg2MDFfRk9STUFUICk7XG59O1xuXG4vKjtcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxuXHRcdFJlYWwgZGF0ZSBpcyB0aGUgZGF0ZSB3aXRoIG5vIFVUQyBvZmZzZXQgYXBwbGllZC5cblxuXHRcdFRoaXMgd2lsbCByZXR1cm4gdGhlIGRhdGUgaW4gSVNPODYwMVxuXG5cdFx0YFlZWVktTU0tRERUSEg6MDA6MDBgXG5cdEBlbmQtbWV0aG9kLWRvY3VtZW50YXRpb25cbiovXG5JbmZpbml0aS5wcm90b3R5cGUucmVhbERhdGUgPSBmdW5jdGlvbiByZWFsRGF0ZSggKXtcblx0aWYoIGZhbHplKCB0aGlzLmRhdGUgKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnRlcm5hbCBkYXRlIGVtcHR5XCIgKTtcblx0fVxuXG5cdHJldHVybiB0aGlzLmRhdGUudXRjKCApLmZvcm1hdCggSVNPODYwMV9GT1JNQVQgKTtcbn07XG5cbi8qO1xuXHRAbWV0aG9kLWRvY3VtZW50YXRpb246XG5cdFx0UmV0dXJucyBhIHNpbXBsZSBodW1hbiByZWFkYWJsZSByZXByZXNlbnRhdGlvbiBvZiBkYXRlLlxuXG5cdFx0RGF0ZSB3aWxsIGJlIHJlbGF0aXZlLlxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXG4qL1xuSW5maW5pdGkucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbiBnZXREYXRlKCApe1xuXHRpZiggZmFsemUoIHRoaXMuZGF0ZSApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludGVybmFsIGRhdGUgZW1wdHlcIiApO1xuXHR9XG5cblx0aWYoIGZhbHp5KCB0aGlzLm9mZnNldCApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludGVybmFsIHRpbWV6b25lIG9mZnNldCBlbXB0eVwiICk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcy5kYXRlLnV0YyggKS51dGNPZmZzZXQoIHRoaXMub2Zmc2V0ICkuZm9ybWF0KCBTSU1QTEVfREFURV9GT1JNQVQgKTtcbn07XG5cbi8qO1xuXHRAbWV0aG9kLWRvY3VtZW50YXRpb246XG5cdFx0UmV0dXJucyBhIHNpbXBsZSBodW1hbiByZWFkYWJsZSByZXByZXNlbnRhdGlvbiBvZiBkYXRlLlxuXG5cdFx0RGF0ZSB3aWxsIGJlIHJlbGF0aXZlLlxuXG5cdFx0U2V0dGluZyBjb21wbGV0ZSB3aWxsIGFwcGVuZCB0cnVlIGRhdGUgZm9ybWF0LlxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXG4qL1xuSW5maW5pdGkucHJvdG90eXBlLnByaW50RGF0ZSA9IGZ1bmN0aW9uIHByaW50RGF0ZSggc2VwYXJhdG9yLCBjb21wbGV0ZSApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcInNlcGFyYXRvclwiOiBcInN0cmluZ1wiLFxuXHRcdFx0XHRcImNvbXBsZXRlXCI6IFwiYm9vbGVhblwiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRsZXQgcGFyYW1ldGVyID0gcmF6ZSggYXJndW1lbnRzICk7XG5cblx0c2VwYXJhdG9yID0gb3B0Zm9yKCBwYXJhbWV0ZXIsIFNUUklORyApO1xuXG5cdHNlcGFyYXRvciA9IHNlcGFyYXRvciB8fCBERUZBVUxUX1NFUEFSQVRPUjtcblx0aWYoIHR5cGVvZiBzZXBhcmF0b3IgIT0gXCJzdHJpbmdcIiApe1xuXHRcdHNlcGFyYXRvciA9IERFRkFVTFRfU0VQQVJBVE9SO1xuXHR9XG5cblx0Y29tcGxldGUgPSBkZXBoZXIoIHBhcmFtZXRlciwgQk9PTEVBTiwgZmFsc2UgKTtcblxuXHRpZiggY29tcGxldGUgKXtcblx0XHRyZXR1cm4gWyB0aGlzLmdldERhdGUoICksIHRoaXMudHJ1ZURhdGUgXS5qb2luKCBzZXBhcmF0b3IgKTtcblxuXHR9ZWxzZXtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRlKCApO1xuXHR9XG59O1xuXG4vKjtcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxuXHRcdFJldHVybnMgYSBudW1lcmljYWwgcmVwcmVzZW50YXRpb24gb2YgdHJ1ZSBkYXRlIGluIFVUQy5cblxuXHRcdFRpbWUgcGFydCBpcyBleGNsdWRlZCBleGNlcHQgdGhlIGhvdXIuXG5cdEBlbmQtbWV0aG9kLWRvY3VtZW50YXRpb25cbiovXG5JbmZpbml0aS5wcm90b3R5cGUuY29tcGFjdCA9IGZ1bmN0aW9uIGNvbXBhY3QoICl7XG5cdHJldHVybiBbIHRoaXMuZGF0ZS51dGMoICkuZm9ybWF0KCBDT01QQUNUX0ZPUk1BVCApLCB0aGlzLm9mZnNldCBdXG5cdFx0Lm1hcCggZnVuY3Rpb24gb25FYWNoVG9rZW4oIHRva2VuICl7IHJldHVybiBwYXJzZUludCggc3RyaW5nZSggdG9rZW4gKSApOyB9ICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluZmluaXRpO1xuIl19
//# sourceMappingURL=infiniti.support.js.map
