"use strict";

/*;
              	@test-license:
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
              	@end-test-license
              
              	@test-configuration:
              		{
              			"package": "infiniti",
              			"path": "infiniti/test.module.js",
              			"file": "test.module.js",
              			"module": "test",
              			"author": "Richeve S. Bebedor",
              			"eMail": "richeve.bebedor@gmail.com",
              			"repository": "https://github.com/volkovasystems/infiniti.git"
              		}
              	@end-test-configuration
              
              	@test-documentation:
              
              	@end-test-documentation
              
              	@include:
              		{
              			"assert": "should/as-function",
              			"infiniti": "infiniti"
              		}
              	@end-include
              */var _typeof2 = require("babel-runtime/helpers/typeof");var _typeof3 = _interopRequireDefault(_typeof2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var assert = require("should/as-function");



//: @client:
var Infiniti = require("./infiniti.support.js");
//: @end-client







//: @client:
describe("infiniti", function () {

	describe("`Infiniti( new Date( '8/15/2016' ) )`", function () {
		it("should persist date as true date", function () {
			var data = new Date("8/15/2016");
			var result = Infiniti(data);

			assert.equal(typeof result === "undefined" ? "undefined" : (0, _typeof3.default)(result), "object");

			assert.equal("date" in result, true);

			assert.equal("offset" in result, true);

			assert.equal("trueDate" in result, true);
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).printDate( )`", function () {
		it("should be equal to 'August 15, 2016'", function () {
			var data = new Date("8/15/2016");

			assert.equal(Infiniti(data).printDate(), "August 15, 2016");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).getDate( )`", function () {
		it("should be equal to 'August 15, 2016'", function () {
			var data = new Date("8/15/2016");

			assert.equal(Infiniti(data).getDate(), "August 15, 2016");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).realDate( )`", function () {
		it("should be equal to '2016-08-14T16:00:00'", function () {
			var data = new Date("8/15/2016");

			assert.equal(Infiniti(data).realDate(), "2016-08-14T16:00:00");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).relativeDate( )`", function () {
		it("should be equal to '2016-08-15T00:00:00'", function () {
			var data = new Date("8/15/2016");

			assert.equal(Infiniti(data).relativeDate(), "2016-08-15T00:00:00");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).trueDate`", function () {
		it("should be equal to '0​2016​08​14​16​00​00​00480'", function () {
			var data = new Date("8/15/2016");

			assert.equal(Infiniti(data).trueDate, "0​2016​08​14​16​00​00​00480");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).compact( )`", function () {
		it("should be equal to [ 2016081416, 480 ]", function () {
			var data = new Date("8/15/2016");

			assert.deepEqual(Infiniti(data).compact(), [2016081416, 480]);
		});
	});

	describe("`Infiniti( '0​2016​08​14​16​00​00​00480' ).parse( )`", function () {
		it("should decompose true date to a moment object", function () {
			var data = "0​2016​08​14​16​00​00​00480";

			var result = Infiniti(data).parse();

			assert.equal(typeof result === "undefined" ? "undefined" : (0, _typeof3.default)(result), "object");

			assert.equal("date" in result, true);

			assert.equal("offset" in result, true);

			assert.equal("trueDate" in result, true);
		});
	});

	describe("`Infiniti( [ 2016081416, 480 ] ).parse( )`", function () {
		it("should decompose compact date to a moment object", function () {
			var data = [2016081416, 480];

			var result = Infiniti(data).parse();

			assert.equal(typeof result === "undefined" ? "undefined" : (0, _typeof3.default)(result), "object");

			assert.equal("date" in result, true);

			assert.equal("offset" in result, true);

			assert.equal("trueDate" in result, true);
		});
	});

	describe("`Infiniti parse with trueDate and compact date`", function () {
		it("should have the same trueDate regardless of how many times it was parsed", function () {
			var dataA = "0​2016​08​14​16​00​00​00480";
			var testA = Infiniti(dataA).parse();

			var dataB = [2016081416, 480];
			var testB = Infiniti(dataB).parse();

			assert.equal(dataA.trueDate, dataB.trueDate);
		});
	});

});
//: @end-client
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Quc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJhc3NlcnQiLCJyZXF1aXJlIiwiSW5maW5pdGkiLCJkZXNjcmliZSIsIml0IiwiZGF0YSIsIkRhdGUiLCJyZXN1bHQiLCJlcXVhbCIsInByaW50RGF0ZSIsImdldERhdGUiLCJyZWFsRGF0ZSIsInJlbGF0aXZlRGF0ZSIsInRydWVEYXRlIiwiZGVlcEVxdWFsIiwiY29tcGFjdCIsInBhcnNlIiwiZGF0YUEiLCJ0ZXN0QSIsImRhdGFCIiwidGVzdEIiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtREEsSUFBTUEsU0FBU0MsUUFBUyxvQkFBVCxDQUFmOzs7O0FBSUE7QUFDQSxJQUFNQyxXQUFXRCxRQUFTLHVCQUFULENBQWpCO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQUUsU0FBVSxVQUFWLEVBQXNCLFlBQU87O0FBRTVCQSxVQUFVLHVDQUFWLEVBQW1ELFlBQU87QUFDekRDLEtBQUksa0NBQUosRUFBd0MsWUFBTztBQUM5QyxPQUFNQyxPQUFPLElBQUlDLElBQUosQ0FBVSxXQUFWLENBQWI7QUFDQSxPQUFJQyxTQUFTTCxTQUFVRyxJQUFWLENBQWI7O0FBRUFMLFVBQU9RLEtBQVAsUUFBcUJELE1BQXJCLHVEQUFxQkEsTUFBckIsR0FBNkIsUUFBN0I7O0FBRUFQLFVBQU9RLEtBQVAsQ0FBYyxVQUFVRCxNQUF4QixFQUFnQyxJQUFoQzs7QUFFQVAsVUFBT1EsS0FBUCxDQUFjLFlBQVlELE1BQTFCLEVBQWtDLElBQWxDOztBQUVBUCxVQUFPUSxLQUFQLENBQWMsY0FBY0QsTUFBNUIsRUFBb0MsSUFBcEM7QUFDQSxHQVhEO0FBWUEsRUFiRDs7QUFlQUosVUFBVSxvREFBVixFQUFnRSxZQUFPO0FBQ3RFQyxLQUFJLHNDQUFKLEVBQTRDLFlBQU87QUFDbEQsT0FBTUMsT0FBTyxJQUFJQyxJQUFKLENBQVUsV0FBVixDQUFiOztB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Z0YsWUFBTztBQUN0RixPQUFNYSxRQUFRLDZCQUFkO0FBQ0EsT0FBSUMsUUFBUWhCLFNBQVVlLEtBQVYsRUFBa0JELEtBQWxCLEVBQVo7O0FBRUEsT0FBTUcsUUFBUSxDQUFFLFVBQUYsRUFBYyxHQUFkLENBQWQ7QUFDQSxPQUFJQyxRQUFRbEIsU0FBVWlCLEtBQVYsRUFBa0JILEtBQWxCLEVBQVo7O0FBRUFoQixVQUFPUSxLQUFQLENBQWNTLE1BQU1KLFFBQXBCLEVBQThCTSxNQUFNTixRQUFwQztBQUNBLEdBUkQ7QUFTQSxFQVZEOztBQVlBLENBN0dEO0FBOEdBIiwiZmlsZSI6InRlc3Quc3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QHRlc3QtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLXRlc3QtbGljZW5zZVxuXG5cdEB0ZXN0LWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwiaW5maW5pdGlcIixcblx0XHRcdFwicGF0aFwiOiBcImluZmluaXRpL3Rlc3QubW9kdWxlLmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJ0ZXN0Lm1vZHVsZS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJ0ZXN0XCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9pbmZpbml0aS5naXRcIlxuXHRcdH1cblx0QGVuZC10ZXN0LWNvbmZpZ3VyYXRpb25cblxuXHRAdGVzdC1kb2N1bWVudGF0aW9uOlxuXG5cdEBlbmQtdGVzdC1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhc3NlcnRcIjogXCJzaG91bGQvYXMtZnVuY3Rpb25cIixcblx0XHRcdFwiaW5maW5pdGlcIjogXCJpbmZpbml0aVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoIFwic2hvdWxkL2FzLWZ1bmN0aW9uXCIgKTtcblxuXG5cbi8vOiBAY2xpZW50OlxuY29uc3QgSW5maW5pdGkgPSByZXF1aXJlKCBcIi4vaW5maW5pdGkuc3VwcG9ydC5qc1wiICk7XG4vLzogQGVuZC1jbGllbnRcblxuXG5cblxuXG5cblxuLy86IEBjbGllbnQ6XG5kZXNjcmliZSggXCJpbmZpbml0aVwiLCAoICkgPT4ge1xuXG5cdGRlc2NyaWJlKCBcImBJbmZpbml0aSggbmV3IERhdGUoICc4LzE1LzIwMTYnICkgKWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgcGVyc2lzdCBkYXRlIGFzIHRydWUgZGF0ZVwiLCAoICkgPT4ge1xuXHRcdFx0Y29uc3QgZGF0YSA9IG5ldyBEYXRlKCBcIjgvMTUvMjAxNlwiICk7XG5cdFx0XHRsZXQgcmVzdWx0ID0gSW5maW5pdGkoIGRhdGEgKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCB0eXBlb2YgcmVzdWx0LCBcIm9iamVjdFwiICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggXCJkYXRlXCIgaW4gcmVzdWx0LCB0cnVlICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggXCJvZmZzZXRcIiBpbiByZXN1bHQsIHRydWUgKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBcInRydWVEYXRlXCIgaW4gcmVzdWx0LCB0cnVlICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYEluZmluaXRpKCBuZXcgRGF0ZSggJzgvMTUvMjAxNicgKSApLnByaW50RGF0ZSggKWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gJ0F1Z3VzdCAxNSwgMjAxNidcIiwgKCApID0+IHtcblx0XHRcdGNvbnN0IGRhdGEgPSBuZXcgRGF0ZSggXCI4LzE1LzIwMTZcIiApO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIEluZmluaXRpKCBkYXRhICkucHJpbnREYXRlKCApLCBcIkF1Z3VzdCAxNSwgMjAxNlwiICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYEluZmluaXRpKCBuZXcgRGF0ZSggJzgvMTUvMjAxNicgKSApLmdldERhdGUoIClgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICdBdWd1c3QgMTUsIDIwMTYnXCIsICggKSA9PiB7XG5cdFx0XHRjb25zdCBkYXRhID0gbmV3IERhdGUoIFwiOC8xNS8yMDE2XCIgKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBJbmZpbml0aSggZGF0YSApLmdldERhdGUoICksIFwiQXVndXN0IDE1LCAyMDE2XCIgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgSW5maW5pdGkoIG5ldyBEYXRlKCAnOC8xNS8yMDE2JyApICkucmVhbERhdGUoIClgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICcyMDE2LTA4LTE0VDE2OjAwOjAwJ1wiLCAoICkgPT4ge1xuXHRcdFx0Y29uc3QgZGF0YSA9IG5ldyBEYXRlKCBcIjgvMTUvMjAxNlwiICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggSW5maW5pdGkoIGRhdGEgKS5yZWFsRGF0ZSggKSwgXCIyMDE2LTA4LTE0VDE2OjAwOjAwXCIgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgSW5maW5pdGkoIG5ldyBEYXRlKCAnOC8xNS8yMDE2JyApICkucmVsYXRpdmVEYXRlKCApYFwiLCAoICkgPT4ge1xuXHRcdGl0KCBcInNob3VsZCBiZSBlcXVhbCB0byAnMjAxNi0wOC0xNVQwMDowMDowMCdcIiwgKCApID0+IHtcblx0XHRcdGNvbnN0IGRhdGEgPSBuZXcgRGF0ZSggXCI4LzE1LzIwMTZcIiApO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIEluZmluaXRpKCBkYXRhICkucmVsYXRpdmVEYXRlKCApLCBcIjIwMTYtMDgtMTVUMDA6MDA6MDBcIiApO1xuXHRcdH0gKTtcblx0fSApO1xuXG5cdGRlc2NyaWJlKCBcImBJbmZpbml0aSggbmV3IERhdGUoICc4LzE1LzIwMTYnICkgKS50cnVlRGF0ZWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gJzDigIsyMDE24oCLMDjigIsxNOKAizE24oCLMDDigIswMOKAizAwNDgwJ1wiLCAoICkgPT4ge1xuXHRcdFx0Y29uc3QgZGF0YSA9IG5ldyBEYXRlKCBcIjgvMTUvMjAxNlwiICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggSW5maW5pdGkoIGRhdGEgKS50cnVlRGF0ZSwgXCIw4oCLMjAxNuKAizA44oCLMTTigIsxNuKAizAw4oCLMDDigIswMDQ4MFwiICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYEluZmluaXRpKCBuZXcgRGF0ZSggJzgvMTUvMjAxNicgKSApLmNvbXBhY3QoIClgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvIFsgMjAxNjA4MTQxNiwgNDgwIF1cIiwgKCApID0+IHtcblx0XHRcdGNvbnN0IGRhdGEgPSBuZXcgRGF0ZSggXCI4LzE1LzIwMTZcIiApO1xuXG5cdFx0XHRhc3NlcnQuZGVlcEVxdWFsKCBJbmZpbml0aSggZGF0YSApLmNvbXBhY3QoICksIFsgMjAxNjA4MTQxNiwgNDgwIF0gKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgSW5maW5pdGkoICcw4oCLMjAxNuKAizA44oCLMTTigIsxNuKAizAw4oCLMDDigIswMDQ4MCcgKS5wYXJzZSggKWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgZGVjb21wb3NlIHRydWUgZGF0ZSB0byBhIG1vbWVudCBvYmplY3RcIiwgKCApID0+IHtcblx0XHRcdGNvbnN0IGRhdGEgPSBcIjDigIsyMDE24oCLMDjigIsxNOKAizE24oCLMDDigIswMOKAizAwNDgwXCI7XG5cblx0XHRcdGxldCByZXN1bHQgPSBJbmZpbml0aSggZGF0YSApLnBhcnNlKCApO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHR5cGVvZiByZXN1bHQsIFwib2JqZWN0XCIgKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBcImRhdGVcIiBpbiByZXN1bHQsIHRydWUgKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBcIm9mZnNldFwiIGluIHJlc3VsdCwgdHJ1ZSApO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIFwidHJ1ZURhdGVcIiBpbiByZXN1bHQsIHRydWUgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgSW5maW5pdGkoIFsgMjAxNjA4MTQxNiwgNDgwIF0gKS5wYXJzZSggKWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgZGVjb21wb3NlIGNvbXBhY3QgZGF0ZSB0byBhIG1vbWVudCBvYmplY3RcIiwgKCApID0+IHtcblx0XHRcdGNvbnN0IGRhdGEgPSBbIDIwMTYwODE0MTYsIDQ4MCBdO1xuXG5cdFx0XHRsZXQgcmVzdWx0ID0gSW5maW5pdGkoIGRhdGEgKS5wYXJzZSggKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCB0eXBlb2YgcmVzdWx0LCBcIm9iamVjdFwiICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggXCJkYXRlXCIgaW4gcmVzdWx0LCB0cnVlICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggXCJvZmZzZXRcIiBpbiByZXN1bHQsIHRydWUgKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBcInRydWVEYXRlXCIgaW4gcmVzdWx0LCB0cnVlICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYEluZmluaXRpIHBhcnNlIHdpdGggdHJ1ZURhdGUgYW5kIGNvbXBhY3QgZGF0ZWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgaGF2ZSB0aGUgc2FtZSB0cnVlRGF0ZSByZWdhcmRsZXNzIG9mIGhvdyBtYW55IHRpbWVzIGl0IHdhcyBwYXJzZWRcIiwgKCApID0+IHtcblx0XHRcdGNvbnN0IGRhdGFBID0gXCIw4oCLMjAxNuKAizA44oCLMTTigIsxNuKAizAw4oCLMDDigIswMDQ4MFwiO1xuXHRcdFx0bGV0IHRlc3RBID0gSW5maW5pdGkoIGRhdGFBICkucGFyc2UoIClcblxuXHRcdFx0Y29uc3QgZGF0YUIgPSBbIDIwMTYwODE0MTYsIDQ4MCBdO1xuXHRcdFx0bGV0IHRlc3RCID0gSW5maW5pdGkoIGRhdGFCICkucGFyc2UoICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggZGF0YUEudHJ1ZURhdGUsIGRhdGFCLnRydWVEYXRlICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cbn0gKTtcbi8vOiBAZW5kLWNsaWVudFxuXG5cbiJdfQ==
//# sourceMappingURL=test.support.js.map
