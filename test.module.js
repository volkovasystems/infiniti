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

const assert = require( "should/as-function" );

//: @server:
const Infiniti = require( "./infiniti.js" );
//: @end-server

//: @client:
const Infiniti = require( "./infiniti.support.js" );
//: @end-client

//: @bridge:
const path = require( "path" );
//: @end-bridge


//: @server:
describe( "infiniti", ( ) => {

	describe( "`Infiniti( new Date( '8/15/2016' ) )`", ( ) => {
		it( "should persist date as true date", ( ) => {
			const data = new Date( "8/15/2016" );
			let result = Infiniti( data );

			assert.equal( typeof result, "object" );

			assert.equal( "date" in result, true );

			assert.equal( "offset" in result, true );

			assert.equal( "trueDate" in result, true );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).printDate( )`", ( ) => {
		it( "should be equal to 'August 15, 2016'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).printDate( ), "August 15, 2016" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).getDate( )`", ( ) => {
		it( "should be equal to 'August 15, 2016'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).getDate( ), "August 15, 2016" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).realDate( )`", ( ) => {
		it( "should be equal to '2016-08-14T16:00:00'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).realDate( ), "2016-08-14T16:00:00" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).relativeDate( )`", ( ) => {
		it( "should be equal to '2016-08-15T00:00:00'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).relativeDate( ), "2016-08-15T00:00:00" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).trueDate`", ( ) => {
		it( "should be equal to '0​2016​08​14​16​00​00​00480'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).trueDate, "0​2016​08​14​16​00​00​00480" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).compact( )`", ( ) => {
		it( "should be equal to [ 2016081416, 480 ]", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.deepEqual( Infiniti( data ).compact( ), [ 2016081416, 480 ] );
		} );
	} );

	describe( "`Infiniti( '0​2016​08​14​16​00​00​00480' ).parse( )`", ( ) => {
		it( "should decompose true date to a moment object", ( ) => {
			const data = "0​2016​08​14​16​00​00​00480";

			let result = Infiniti( data ).parse( );

			assert.equal( typeof result, "object" );

			assert.equal( "date" in result, true );

			assert.equal( "offset" in result, true );

			assert.equal( "trueDate" in result, true );
		} );
	} );

	describe( "`Infiniti( [ 2016081416, 480 ] ).parse( )`", ( ) => {
		it( "should decompose compact date to a moment object", ( ) => {
			const data = [ 2016081416, 480 ];

			let result = Infiniti( data ).parse( );

			assert.equal( typeof result, "object" );

			assert.equal( "date" in result, true );

			assert.equal( "offset" in result, true );

			assert.equal( "trueDate" in result, true );
		} );
	} );

	describe( "`Infiniti parse with trueDate and compact date`", ( ) => {
		it( "should have the same trueDate regardless of how many times it was parsed", ( ) => {
			const dataA = "0​2016​08​14​16​00​00​00480";
			let testA = Infiniti( dataA ).parse( )

			const dataB = [ 2016081416, 480 ];
			let testB = Infiniti( dataB ).parse( );

			assert.equal( dataA.trueDate, dataB.trueDate );
		} );
	} );

} );
//: @end-server


//: @client:
describe( "infiniti", ( ) => {

	describe( "`Infiniti( new Date( '8/15/2016' ) )`", ( ) => {
		it( "should persist date as true date", ( ) => {
			const data = new Date( "8/15/2016" );
			let result = Infiniti( data );

			assert.equal( typeof result, "object" );

			assert.equal( "date" in result, true );

			assert.equal( "offset" in result, true );

			assert.equal( "trueDate" in result, true );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).printDate( )`", ( ) => {
		it( "should be equal to 'August 15, 2016'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).printDate( ), "August 15, 2016" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).getDate( )`", ( ) => {
		it( "should be equal to 'August 15, 2016'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).getDate( ), "August 15, 2016" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).realDate( )`", ( ) => {
		it( "should be equal to '2016-08-14T16:00:00'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).realDate( ), "2016-08-14T16:00:00" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).relativeDate( )`", ( ) => {
		it( "should be equal to '2016-08-15T00:00:00'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).relativeDate( ), "2016-08-15T00:00:00" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).trueDate`", ( ) => {
		it( "should be equal to '0​2016​08​14​16​00​00​00480'", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.equal( Infiniti( data ).trueDate, "0​2016​08​14​16​00​00​00480" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).compact( )`", ( ) => {
		it( "should be equal to [ 2016081416, 480 ]", ( ) => {
			const data = new Date( "8/15/2016" );

			assert.deepEqual( Infiniti( data ).compact( ), [ 2016081416, 480 ] );
		} );
	} );

	describe( "`Infiniti( '0​2016​08​14​16​00​00​00480' ).parse( )`", ( ) => {
		it( "should decompose true date to a moment object", ( ) => {
			const data = "0​2016​08​14​16​00​00​00480";

			let result = Infiniti( data ).parse( );

			assert.equal( typeof result, "object" );

			assert.equal( "date" in result, true );

			assert.equal( "offset" in result, true );

			assert.equal( "trueDate" in result, true );
		} );
	} );

	describe( "`Infiniti( [ 2016081416, 480 ] ).parse( )`", ( ) => {
		it( "should decompose compact date to a moment object", ( ) => {
			const data = [ 2016081416, 480 ];

			let result = Infiniti( data ).parse( );

			assert.equal( typeof result, "object" );

			assert.equal( "date" in result, true );

			assert.equal( "offset" in result, true );

			assert.equal( "trueDate" in result, true );
		} );
	} );

	describe( "`Infiniti parse with trueDate and compact date`", ( ) => {
		it( "should have the same trueDate regardless of how many times it was parsed", ( ) => {
			const dataA = "0​2016​08​14​16​00​00​00480";
			let testA = Infiniti( dataA ).parse( )

			const dataB = [ 2016081416, 480 ];
			let testB = Infiniti( dataB ).parse( );

			assert.equal( dataA.trueDate, dataB.trueDate );
		} );
	} );

} );
//: @end-client

//: @bridge:
describe( "infiniti", ( ) => {

	let bridgeURL = `file://${ path.resolve( __dirname, "bridge.html" ) }`;

	describe( "`Infiniti( new Date( '8/15/2016' ) )`", ( ) => {
		it( "should persist date as true date", ( ) => {
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

			assert.equal( result, true );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).printDate( )`", ( ) => {
		it( "should be equal to 'August 15, 2016'", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					const data = new Date( "8/15/2016" );

					return infiniti( data ).printDate( );
				}

			).value;
			//: @end-ignore

			assert.equal( result, "August 15, 2016" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).getDate( )`", ( ) => {
		it( "should be equal to 'August 15, 2016'", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					const data = new Date( "8/15/2016" );

					return infiniti( data ).getDate( );
				}

			).value;
			//: @end-ignore

			assert.equal( result, "August 15, 2016" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).realDate( )`", ( ) => {
		it( "should be equal to '2016-08-14T16:00:00'", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					const data = new Date( "8/15/2016" );

					return infiniti( data ).realDate( );
				}

			).value;
			//: @end-ignore

			assert.equal( result, "2016-08-14T16:00:00" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).relativeDate( )`", ( ) => {
		it( "should be equal to '2016-08-15T00:00:00'", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					const data = new Date( "8/15/2016" );

					return infiniti( data ).relativeDate( );
				}

			).value;
			//: @end-ignore

			assert.equal( result, "2016-08-15T00:00:00" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).trueDate`", ( ) => {
		it( "should be equal to '0​2016​08​14​16​00​00​00480'", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					const data = new Date( "8/15/2016" );

					return infiniti( data ).trueDate;
				}

			).value;
			//: @end-ignore

			assert.equal( result, "0​2016​08​14​16​00​00​00480" );
		} );
	} );

	describe( "`Infiniti( new Date( '8/15/2016' ) ).compact( )`", ( ) => {
		it( "should be equal to [ 2016081416, 480 ]", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					const data = new Date( "8/15/2016" );

					return JSON.stringify( infiniti( data ).compact( ) );
				}

			).value;
			//: @end-ignore

			assert.deepEqual( JSON.parse( result ), [ 2016081416, 480 ] );
		} );
	} );

	describe( "`Infiniti( '0​2016​08​14​16​00​00​00480' ).parse( )`", ( ) => {
		it( "should decompose true date to a moment object", ( ) => {
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

			assert.equal( result, true );
		} );
	} );

	describe( "`Infiniti( [ 2016081416, 480 ] ).parse( )`", ( ) => {
		it( "should decompose compact date to a moment object", ( ) => {
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

			assert.equal( result, true );
		} );
	} );

	describe( "`Infiniti parse with trueDate and compact date`", ( ) => {
		it( "should have the same trueDate regardless of how many times it was parsed", ( ) => {
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

			assert.equal( result, true );
		} );
	} );

} );
//: @end-bridge
