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
              */

var assert = require("should/as-function");





//: @bridge:
var path = require("path");
//: @end-bridge







//: @bridge:
describe("infiniti", function () {

	var bridgeURL = "file://" + path.resolve(__dirname, "bridge.html");

	describe("`Infiniti( new Date( '8/15/2016' ) )`", function () {
		it("should persist date as true date", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const data = new Date( "8/15/2016" );
   					let result = infiniti( data );
   
   					return typeof result == "object" &&
   						"date" in result == true &&
   						"offset" in result == true &&
   						"trueDate" in result == true;
   				}
   
   			).value;
   			//: @end-ignore

			assert.equal(result, true);
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).printDate( )`", function () {
		it("should be equal to 'August 15, 2016'", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const data = new Date( "8/15/2016" );
   
   					return infiniti( data ).printDate( );
   				}
   
   			).value;
   			//: @end-ignore

			assert.equal(result, "August 15, 2016");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).getDate( )`", function () {
		it("should be equal to 'August 15, 2016'", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const data = new Date( "8/15/2016" );
   
   					return infiniti( data ).getDate( );
   				}
   
   			).value;
   			//: @end-ignore

			assert.equal(result, "August 15, 2016");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).realDate( )`", function () {
		it("should be equal to '2016-08-14T16:00:00'", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const data = new Date( "8/15/2016" );
   
   					return infiniti( data ).realDate( );
   				}
   
   			).value;
   			//: @end-ignore

			assert.equal(result, "2016-08-14T16:00:00");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).relativeDate( )`", function () {
		it("should be equal to '2016-08-15T00:00:00'", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const data = new Date( "8/15/2016" );
   
   					return infiniti( data ).relativeDate( );
   				}
   
   			).value;
   			//: @end-ignore

			assert.equal(result, "2016-08-15T00:00:00");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).trueDate`", function () {
		it("should be equal to '0​2016​08​14​16​00​00​00480'", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const data = new Date( "8/15/2016" );
   
   					return infiniti( data ).trueDate;
   				}
   
   			).value;
   			//: @end-ignore

			assert.equal(result, "0​2016​08​14​16​00​00​00480");
		});
	});

	describe("`Infiniti( new Date( '8/15/2016' ) ).compact( )`", function () {
		it("should be equal to [ 2016081416, 480 ]", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const data = new Date( "8/15/2016" );
   
   					return JSON.stringify( infiniti( data ).compact( ) );
   				}
   
   			).value;
   			//: @end-ignore

			assert.deepEqual(JSON.parse(result), [2016081416, 480]);
		});
	});

	describe("`Infiniti( '0​2016​08​14​16​00​00​00480' ).parse( )`", function () {
		it("should decompose true date to a moment object", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const data = "0​2016​08​14​16​00​00​00480";
   
   					let result = infiniti( data ).parse( );
   
   					return typeof result == "object" &&
   						"date" in result == true &&
   						"offset" in result == true &&
   						"trueDate" in result == true;
   				}
   
   			).value;
   			//: @end-ignore

			assert.equal(result, true);
		});
	});

	describe("`Infiniti( [ 2016081416, 480 ] ).parse( )`", function () {
		it("should decompose compact date to a moment object", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const data = [ 2016081416, 480 ];
   
   					let result = infiniti( data ).parse( );
   
   					return typeof result == "object" &&
   						"date" in result == true &&
   						"offset" in result == true &&
   						"trueDate" in result == true;
    				}
   
   			).value;
   			//: @end-ignore

			assert.equal(result, true);
		});
	});

	describe("`Infiniti parse with trueDate and compact date`", function () {
		it("should have the same trueDate regardless of how many times it was parsed", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					const dataA = "0​2016​08​14​16​00​00​00480";
   					let testA = infiniti( dataA ).parse( )
   
   					const dataB = [ 2016081416, 480 ];
   					let testB = infiniti( dataB ).parse( );
   
   					return dataA.trueDate == dataB.trueDate;
   				}
   
   			).value;
   			//: @end-ignore

			assert.equal(result, true);
		});
	});

});
//: @end-bridge
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuYnJpZGdlLmpzIl0sIm5hbWVzIjpbImFzc2VydCIsInJlcXVpcmUiLCJwYXRoIiwiZGVzY3JpYmUiLCJicmlkZ2VVUkwiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwiaXQiLCJlcXVhbCIsInJlc3VsdCIsImRlZXBFcXVhbCIsIkpTT04iLCJwYXJzZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1EQSxJQUFNQSxTQUFTQyxRQUFTLG9CQUFULENBQWY7Ozs7OztBQU1BO0FBQ0EsSUFBTUMsT0FBT0QsUUFBUyxNQUFULENBQWI7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBRSxTQUFVLFVBQVYsRUFBc0IsWUFBTzs7QUFFNUIsS0FBSUMsd0JBQXVCRixLQUFLRyxPQUFMLENBQWNDLFNBQWQsRUFBeUIsYUFBekIsQ0FBM0I7O0FBRUFILFVBQVUsdUNBQVYsRUFBbUQsWUFBTztBQUN6REksS0FBSSxrQ0FBSixFQUF3QyxZQUFPO0FBQzlDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUVHUCxVQUFPUSxLQUFQLENBQWNDLE1BQWQsRUFBc0IsSUFBdEI7QUFDQSxHQXBCRDtBQXFCQSxFQXRCRDs7QUF3QkFOLFVBQVUsb0RBQVYsRUFBZ0UsWUFBTztBQUN0RUksS0FBSSxzQ0FBSixFQUE0QyxZQUFPO0FBQ2xEO0FBQ0g7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUdQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQixpQkFBdEI7QUFDQSxHQWhCRDtBQWlCQSxFQWxCRDs7QUFvQkFOLFVBQVUsa0RBQVYsRUFBOEQsWUFBTztBQUNwRUksS0FBSSxzQ0FBSixFQUE0QyxZQUFPO0FBQ2xEO0FBQ0g7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUdQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQixpQkFBdEI7QUFDQSxHQWhCRDtBQWlCQSxFQWxCRDs7QUFvQkFOLFVBQVUsbURBQVYsRUFBK0QsWUFBTztBQUNyRUksS0FBSSwwQ0FBSixFQUFnRCxZQUFPO0FBQ3REO0FBQ0g7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUdQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQixxQkFBdEI7QUFDQSxHQWhCRDtBQWlCQSxFQWxCRDs7QUFvQkFOLFVBQVUsdURBQVYsRUFBbUUsWUFBTztBQUN6RUksS0FBSSwwQ0FBSixFQUFnRCxZQUFPO0FBQ3REO0FBQ0g7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUdQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQixxQkFBdEI7QUFDQSxHQWhCRDtBQWlCQSxFQWxCRDs7QUFvQkFOLFVBQVUsZ0RBQVYsRUFBNEQsWUFBTztBQUNsRUksS0FBSSxrREFBSixFQUF3RCxZQUFPO0FBQzlEO0FBQ0g7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUdQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQiw2QkFBdEI7QUFDQSxHQWhCRDtBQWlCQSxFQWxCRDs7QUFvQkFOLFVBQVUsa0RBQVYsRUFBOEQsWUFBTztBQUNwRUksS0FBSSx3Q0FBSixFQUE4QyxZQUFPO0FBQ3BEO0FBQ0g7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUdQLFVBQU9VLFNBQVAsQ0FBa0JDLEtBQUtDLEtBQUwsQ0FBWUgsTUFBWixDQUFsQixFQUF3QyxDQUFFLFVBQUYsRUFBYyxHQUFkLENBQXhDO0FBQ0EsR0FoQkQ7QUFpQkEsRUFsQkQ7O0FBb0JBTixVQUFVLHNEQUFWLEVBQWtFLFlBQU87QUFDeEVJLEtBQUksK0NBQUosRUFBcUQsWUFBTztBQUMzRDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUVHUCxVQUFPUSxLQUFQLENBQWNDLE1BQWQsRUFBc0IsSUFBdEI7QUFDQSxHQXJCRDtBQXNCQSxFQXZCRDs7QUF5QkFOLFVBQVUsNENBQVYsRUFBd0QsWUFBTztBQUM5REksS0FBSSxrREFBSixFQUF3RCxZQUFPO0FBQzlEO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBRUdQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQixJQUF0QjtBQUNBLEdBckJEO0FBc0JBLEVBdkJEOztBQXlCQU4sVUFBVSxpREFBVixFQUE2RCxZQUFPO0FBQ25FSSxLQUFJLDBFQUFKLEVBQWdGLFlBQU87QUFDdEY7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7O0FBRUdQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQixJQUF0QjtBQUNBLEdBcEJEO0FBcUJBLEVBdEJEOztBQXdCQSxDQTlORDtBQStOQSIsImZpbGUiOiJ0ZXN0LmJyaWRnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QHRlc3QtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLXRlc3QtbGljZW5zZVxuXG5cdEB0ZXN0LWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwiaW5maW5pdGlcIixcblx0XHRcdFwicGF0aFwiOiBcImluZmluaXRpL3Rlc3QubW9kdWxlLmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJ0ZXN0Lm1vZHVsZS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJ0ZXN0XCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9pbmZpbml0aS5naXRcIlxuXHRcdH1cblx0QGVuZC10ZXN0LWNvbmZpZ3VyYXRpb25cblxuXHRAdGVzdC1kb2N1bWVudGF0aW9uOlxuXG5cdEBlbmQtdGVzdC1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhc3NlcnRcIjogXCJzaG91bGQvYXMtZnVuY3Rpb25cIixcblx0XHRcdFwiaW5maW5pdGlcIjogXCJpbmZpbml0aVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoIFwic2hvdWxkL2FzLWZ1bmN0aW9uXCIgKTtcblxuXG5cblxuXG4vLzogQGJyaWRnZTpcbmNvbnN0IHBhdGggPSByZXF1aXJlKCBcInBhdGhcIiApO1xuLy86IEBlbmQtYnJpZGdlXG5cblxuXG5cblxuXG5cbi8vOiBAYnJpZGdlOlxuZGVzY3JpYmUoIFwiaW5maW5pdGlcIiwgKCApID0+IHtcblxuXHRsZXQgYnJpZGdlVVJMID0gYGZpbGU6Ly8keyBwYXRoLnJlc29sdmUoIF9fZGlybmFtZSwgXCJicmlkZ2UuaHRtbFwiICkgfWA7XG5cblx0ZGVzY3JpYmUoIFwiYEluZmluaXRpKCBuZXcgRGF0ZSggJzgvMTUvMjAxNicgKSApYFwiLCAoICkgPT4ge1xuXHRcdGl0KCBcInNob3VsZCBwZXJzaXN0IGRhdGUgYXMgdHJ1ZSBkYXRlXCIsICggKSA9PiB7XG5cdFx0XHQvLzogQGlnbm9yZTpcbi8qXG5cdFx0XHRsZXQgcmVzdWx0ID0gYnJvd3Nlci51cmwoIGJyaWRnZVVSTCApLmV4ZWN1dGUoXG5cblx0XHRcdFx0ZnVuY3Rpb24oICl7XG5cdFx0XHRcdFx0Y29uc3QgZGF0YSA9IG5ldyBEYXRlKCBcIjgvMTUvMjAxNlwiICk7XG5cdFx0XHRcdFx0bGV0IHJlc3VsdCA9IGluZmluaXRpKCBkYXRhICk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdHlwZW9mIHJlc3VsdCA9PSBcIm9iamVjdFwiICYmXG5cdFx0XHRcdFx0XHRcImRhdGVcIiBpbiByZXN1bHQgPT0gdHJ1ZSAmJlxuXHRcdFx0XHRcdFx0XCJvZmZzZXRcIiBpbiByZXN1bHQgPT0gdHJ1ZSAmJlxuXHRcdFx0XHRcdFx0XCJ0cnVlRGF0ZVwiIGluIHJlc3VsdCA9PSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdCkudmFsdWU7XG5cdFx0XHQqL1xuLy86IEBlbmQtaWdub3JlXG5cblx0XHRcdGFzc2VydC5lcXVhbCggcmVzdWx0LCB0cnVlICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYEluZmluaXRpKCBuZXcgRGF0ZSggJzgvMTUvMjAxNicgKSApLnByaW50RGF0ZSggKWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gJ0F1Z3VzdCAxNSwgMjAxNidcIiwgKCApID0+IHtcblx0XHRcdC8vOiBAaWdub3JlOlxuLypcblx0XHRcdGxldCByZXN1bHQgPSBicm93c2VyLnVybCggYnJpZGdlVVJMICkuZXhlY3V0ZShcblxuXHRcdFx0XHRmdW5jdGlvbiggKXtcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gbmV3IERhdGUoIFwiOC8xNS8yMDE2XCIgKTtcblxuXHRcdFx0XHRcdHJldHVybiBpbmZpbml0aSggZGF0YSApLnByaW50RGF0ZSggKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQpLnZhbHVlO1xuXHRcdFx0Ki9cbi8vOiBAZW5kLWlnbm9yZVxuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHJlc3VsdCwgXCJBdWd1c3QgMTUsIDIwMTZcIiApO1xuXHRcdH0gKTtcblx0fSApO1xuXG5cdGRlc2NyaWJlKCBcImBJbmZpbml0aSggbmV3IERhdGUoICc4LzE1LzIwMTYnICkgKS5nZXREYXRlKCApYFwiLCAoICkgPT4ge1xuXHRcdGl0KCBcInNob3VsZCBiZSBlcXVhbCB0byAnQXVndXN0IDE1LCAyMDE2J1wiLCAoICkgPT4ge1xuXHRcdFx0Ly86IEBpZ25vcmU6XG4vKlxuXHRcdFx0bGV0IHJlc3VsdCA9IGJyb3dzZXIudXJsKCBicmlkZ2VVUkwgKS5leGVjdXRlKFxuXG5cdFx0XHRcdGZ1bmN0aW9uKCApe1xuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSBuZXcgRGF0ZSggXCI4LzE1LzIwMTZcIiApO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGluZmluaXRpKCBkYXRhICkuZ2V0RGF0ZSggKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQpLnZhbHVlO1xuXHRcdFx0Ki9cbi8vOiBAZW5kLWlnbm9yZVxuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHJlc3VsdCwgXCJBdWd1c3QgMTUsIDIwMTZcIiApO1xuXHRcdH0gKTtcblx0fSApO1xuXG5cdGRlc2NyaWJlKCBcImBJbmZpbml0aSggbmV3IERhdGUoICc4LzE1LzIwMTYnICkgKS5yZWFsRGF0ZSggKWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gJzIwMTYtMDgtMTRUMTY6MDA6MDAnXCIsICggKSA9PiB7XG5cdFx0XHQvLzogQGlnbm9yZTpcbi8qXG5cdFx0XHRsZXQgcmVzdWx0ID0gYnJvd3Nlci51cmwoIGJyaWRnZVVSTCApLmV4ZWN1dGUoXG5cblx0XHRcdFx0ZnVuY3Rpb24oICl7XG5cdFx0XHRcdFx0Y29uc3QgZGF0YSA9IG5ldyBEYXRlKCBcIjgvMTUvMjAxNlwiICk7XG5cblx0XHRcdFx0XHRyZXR1cm4gaW5maW5pdGkoIGRhdGEgKS5yZWFsRGF0ZSggKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQpLnZhbHVlO1xuXHRcdFx0Ki9cbi8vOiBAZW5kLWlnbm9yZVxuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHJlc3VsdCwgXCIyMDE2LTA4LTE0VDE2OjAwOjAwXCIgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgSW5maW5pdGkoIG5ldyBEYXRlKCAnOC8xNS8yMDE2JyApICkucmVsYXRpdmVEYXRlKCApYFwiLCAoICkgPT4ge1xuXHRcdGl0KCBcInNob3VsZCBiZSBlcXVhbCB0byAnMjAxNi0wOC0xNVQwMDowMDowMCdcIiwgKCApID0+IHtcblx0XHRcdC8vOiBAaWdub3JlOlxuLypcblx0XHRcdGxldCByZXN1bHQgPSBicm93c2VyLnVybCggYnJpZGdlVVJMICkuZXhlY3V0ZShcblxuXHRcdFx0XHRmdW5jdGlvbiggKXtcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gbmV3IERhdGUoIFwiOC8xNS8yMDE2XCIgKTtcblxuXHRcdFx0XHRcdHJldHVybiBpbmZpbml0aSggZGF0YSApLnJlbGF0aXZlRGF0ZSggKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQpLnZhbHVlO1xuXHRcdFx0Ki9cbi8vOiBAZW5kLWlnbm9yZVxuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHJlc3VsdCwgXCIyMDE2LTA4LTE1VDAwOjAwOjAwXCIgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgSW5maW5pdGkoIG5ldyBEYXRlKCAnOC8xNS8yMDE2JyApICkudHJ1ZURhdGVgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICcw4oCLMjAxNuKAizA44oCLMTTigIsxNuKAizAw4oCLMDDigIswMDQ4MCdcIiwgKCApID0+IHtcblx0XHRcdC8vOiBAaWdub3JlOlxuLypcblx0XHRcdGxldCByZXN1bHQgPSBicm93c2VyLnVybCggYnJpZGdlVVJMICkuZXhlY3V0ZShcblxuXHRcdFx0XHRmdW5jdGlvbiggKXtcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gbmV3IERhdGUoIFwiOC8xNS8yMDE2XCIgKTtcblxuXHRcdFx0XHRcdHJldHVybiBpbmZpbml0aSggZGF0YSApLnRydWVEYXRlO1xuXHRcdFx0XHR9XG5cblx0XHRcdCkudmFsdWU7XG5cdFx0XHQqL1xuLy86IEBlbmQtaWdub3JlXG5cblx0XHRcdGFzc2VydC5lcXVhbCggcmVzdWx0LCBcIjDigIsyMDE24oCLMDjigIsxNOKAizE24oCLMDDigIswMOKAizAwNDgwXCIgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgSW5maW5pdGkoIG5ldyBEYXRlKCAnOC8xNS8yMDE2JyApICkuY29tcGFjdCggKWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gWyAyMDE2MDgxNDE2LCA0ODAgXVwiLCAoICkgPT4ge1xuXHRcdFx0Ly86IEBpZ25vcmU6XG4vKlxuXHRcdFx0bGV0IHJlc3VsdCA9IGJyb3dzZXIudXJsKCBicmlkZ2VVUkwgKS5leGVjdXRlKFxuXG5cdFx0XHRcdGZ1bmN0aW9uKCApe1xuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSBuZXcgRGF0ZSggXCI4LzE1LzIwMTZcIiApO1xuXG5cdFx0XHRcdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KCBpbmZpbml0aSggZGF0YSApLmNvbXBhY3QoICkgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQpLnZhbHVlO1xuXHRcdFx0Ki9cbi8vOiBAZW5kLWlnbm9yZVxuXG5cdFx0XHRhc3NlcnQuZGVlcEVxdWFsKCBKU09OLnBhcnNlKCByZXN1bHQgKSwgWyAyMDE2MDgxNDE2LCA0ODAgXSApO1xuXHRcdH0gKTtcblx0fSApO1xuXG5cdGRlc2NyaWJlKCBcImBJbmZpbml0aSggJzDigIsyMDE24oCLMDjigIsxNOKAizE24oCLMDDigIswMOKAizAwNDgwJyApLnBhcnNlKCApYFwiLCAoICkgPT4ge1xuXHRcdGl0KCBcInNob3VsZCBkZWNvbXBvc2UgdHJ1ZSBkYXRlIHRvIGEgbW9tZW50IG9iamVjdFwiLCAoICkgPT4ge1xuXHRcdFx0Ly86IEBpZ25vcmU6XG4vKlxuXHRcdFx0bGV0IHJlc3VsdCA9IGJyb3dzZXIudXJsKCBicmlkZ2VVUkwgKS5leGVjdXRlKFxuXG5cdFx0XHRcdGZ1bmN0aW9uKCApe1xuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSBcIjDigIsyMDE24oCLMDjigIsxNOKAizE24oCLMDDigIswMOKAizAwNDgwXCI7XG5cblx0XHRcdFx0XHRsZXQgcmVzdWx0ID0gaW5maW5pdGkoIGRhdGEgKS5wYXJzZSggKTtcblxuXHRcdFx0XHRcdHJldHVybiB0eXBlb2YgcmVzdWx0ID09IFwib2JqZWN0XCIgJiZcblx0XHRcdFx0XHRcdFwiZGF0ZVwiIGluIHJlc3VsdCA9PSB0cnVlICYmXG5cdFx0XHRcdFx0XHRcIm9mZnNldFwiIGluIHJlc3VsdCA9PSB0cnVlICYmXG5cdFx0XHRcdFx0XHRcInRydWVEYXRlXCIgaW4gcmVzdWx0ID09IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0KS52YWx1ZTtcblx0XHRcdCovXG4vLzogQGVuZC1pZ25vcmVcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCByZXN1bHQsIHRydWUgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgSW5maW5pdGkoIFsgMjAxNjA4MTQxNiwgNDgwIF0gKS5wYXJzZSggKWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgZGVjb21wb3NlIGNvbXBhY3QgZGF0ZSB0byBhIG1vbWVudCBvYmplY3RcIiwgKCApID0+IHtcblx0XHRcdC8vOiBAaWdub3JlOlxuLypcblx0XHRcdGxldCByZXN1bHQgPSBicm93c2VyLnVybCggYnJpZGdlVVJMICkuZXhlY3V0ZShcblxuXHRcdFx0XHRmdW5jdGlvbiggKXtcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gWyAyMDE2MDgxNDE2LCA0ODAgXTtcblxuXHRcdFx0XHRcdGxldCByZXN1bHQgPSBpbmZpbml0aSggZGF0YSApLnBhcnNlKCApO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHR5cGVvZiByZXN1bHQgPT0gXCJvYmplY3RcIiAmJlxuXHRcdFx0XHRcdFx0XCJkYXRlXCIgaW4gcmVzdWx0ID09IHRydWUgJiZcblx0XHRcdFx0XHRcdFwib2Zmc2V0XCIgaW4gcmVzdWx0ID09IHRydWUgJiZcblx0XHRcdFx0XHRcdFwidHJ1ZURhdGVcIiBpbiByZXN1bHQgPT0gdHJ1ZTtcbiBcdFx0XHRcdH1cblxuXHRcdFx0KS52YWx1ZTtcblx0XHRcdCovXG4vLzogQGVuZC1pZ25vcmVcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCByZXN1bHQsIHRydWUgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgSW5maW5pdGkgcGFyc2Ugd2l0aCB0cnVlRGF0ZSBhbmQgY29tcGFjdCBkYXRlYFwiLCAoICkgPT4ge1xuXHRcdGl0KCBcInNob3VsZCBoYXZlIHRoZSBzYW1lIHRydWVEYXRlIHJlZ2FyZGxlc3Mgb2YgaG93IG1hbnkgdGltZXMgaXQgd2FzIHBhcnNlZFwiLCAoICkgPT4ge1xuXHRcdFx0Ly86IEBpZ25vcmU6XG4vKlxuXHRcdFx0bGV0IHJlc3VsdCA9IGJyb3dzZXIudXJsKCBicmlkZ2VVUkwgKS5leGVjdXRlKFxuXG5cdFx0XHRcdGZ1bmN0aW9uKCApe1xuXHRcdFx0XHRcdGNvbnN0IGRhdGFBID0gXCIw4oCLMjAxNuKAizA44oCLMTTigIsxNuKAizAw4oCLMDDigIswMDQ4MFwiO1xuXHRcdFx0XHRcdGxldCB0ZXN0QSA9IGluZmluaXRpKCBkYXRhQSApLnBhcnNlKCApXG5cblx0XHRcdFx0XHRjb25zdCBkYXRhQiA9IFsgMjAxNjA4MTQxNiwgNDgwIF07XG5cdFx0XHRcdFx0bGV0IHRlc3RCID0gaW5maW5pdGkoIGRhdGFCICkucGFyc2UoICk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGF0YUEudHJ1ZURhdGUgPT0gZGF0YUIudHJ1ZURhdGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0KS52YWx1ZTtcblx0XHRcdCovXG4vLzogQGVuZC1pZ25vcmVcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCByZXN1bHQsIHRydWUgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxufSApO1xuLy86IEBlbmQtYnJpZGdlXG4iXX0=
//# sourceMappingURL=test.bridge.js.map
