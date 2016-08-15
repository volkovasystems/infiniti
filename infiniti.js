"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
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
			"asea": "asea",
			"diatom": "diatom",
			"harden": "harden",
			"moment": "moment",
			"optfor": "optfor",
			"U200b": "u200b"
		}
	@end-include
*/

if( typeof window == "undefined" ){
	var asea = require( "asea" );
	var diatom = require( "diatom" );
	var harden = require( "harden" );
	var moment = require( "moment" );
	var optfor = require( "optfor" );
	var U200b = require( "u200b" );
}

if( typeof window != "undefined" &&
	!( "asea" in window ) )
{
	throw new Error( "asea is not defined" );
}

if( asea.client &&
	!( "diatom" in window ) )
{
	throw new Error( "diatom is not defined" );
}

if( asea.client &&
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" );
}

if( asea.client &&
	!( "moment" in window ) )
{
	throw new Error( "moment is not defined" );
}

if( asea.client &&
	!( "optfor" in window ) )
{
	throw new Error( "optfor is not defined" );
}

if( asea.client &&
	!( "U200b" in window ) )
{
	throw new Error( "U200b is not defined" );
}

var Infiniti = diatom( "Infiniti" );

harden( "now", function now( ){
	return Infiniti( ).compact( );
}, Infiniti );

Infiniti.prototype.toString = function toString( ){
	return this.trueDate;
};

Infiniti.prototype.valueOf = function valueOf( ){
	return this.trueDate;
};

Infiniti.prototype.initialize = function initialize( date ){
	if( Array.isArray( date ) &&
		typeof date[ 0 ] == NUMBER &&
		typeof date[ 1 ] == NUMBER &&
		date[ 0 ].toString( ).length == 17 )
	{
		this.date = moment( date[ 0 ], "YYYYMMDDHHmmssSSS" )
			.hour( 0 )
			.minute( 0 )
			.second( 0 )
			.millisecond( 0 );

		this.offset = date[ 1 ];

		this.persist( );

	}else if( typeof date == STRING &&
		date.length == 31 &&
		( /^\-[\d\u200b]{30}|^[\d\u200b]{31}$/ ).test( date ) )
	{
		this.date = date;

		this.parse( );

	}else if( typeof date == STRING &&
		date )
	{
		try{
			date = moment( date )
				.hour( 0 )
				.minute( 0 )
				.second( 0 )
				.millisecond( 0 );

			if( date.isValid( ) ){
				this.initialize( date.toDate( ) );

			}else{
				throw new Error( "invalid format, " + arguments[ 0 ] );
			}

		}catch( error ){
			throw new Error( "error encountered while parsing, " + error.message );
		}

	}else if( date instanceof Date ){
		this.date = moment( date )
			.hour( 0 )
			.minute( 0 )
			.second( 0 )
			.millisecond( 0 );

		this.persist( );

	}else{
		this.date = moment( new Date( ) )
			.hour( 0 )
			.minute( 0 )
			.second( 0 )
			.millisecond( 0 );

		this.persist( );
	}

	return this;
};

/*
	@method-documentation:
		This should be persisted on the machine where the timezone is persisted.

		It will save the true date in utc format + the machine timezone.
	@end-method-documentation
*/
Infiniti.prototype.persist = function persist( ){
	if( this.trueDate ){
		return this.trueDate;
	}

	var date = this.date.toDate( );

	var offset = this.offset || this.date.utcOffset( );
	var polarity = offset / Math.abs( offset );

	var trueDate = U200b( [
		polarity.toString( ).replace( /\d+/, "" ) || "0",
		date.getUTCFullYear( ),
		( "0" + ( date.getUTCMonth( ) + 1 ) ).slice( -2 ),
		( "0" + ( date.getUTCDate( ) ) ).slice( -2 ),
		"00",
		"00",
		"00",
		"000",
		( "000" + Math.abs( offset ) ).slice( -5 )
	] ).join( );

	this.trueDate = trueDate;

	this.offset = offset;

	return trueDate;
};

/*;
	@method-documentation:
		Decompose true date to a moment object.
	@end-method-documentation
*/
Infiniti.prototype.parse = function parse( ){
	var date = this.date;
	if( typeof this.date == STRING ){
		date = U200b( this.date ).separate( );

	}else if( this.trueDate ){
		date = U200b( this.trueDate ).separate( );

	}else{
		throw new Error( "date not specified" );
	}

	var polarity = parseInt( date[ 0 ] + 1 );

	this.offset = polarity * parseInt( date[ 8 ] );

	date = moment.utc( )
		.year( parseInt( date[ 1 ] ) )
		.month( parseInt( date[ 2 ] ) - 1 )
		.date( parseInt( date[ 3 ] ) )
		.hour( 0 )
		.minute( 0 )
		.second( 0 )
		.millisecond( 0 );

	//: This will set the timezone of the Date object to the machine timezone.
	this.date = date;

	this.persist( );

	return this;
};

/*;
	@method-documentation:
		Relative date is the date applied with UTC offset.

		This will return the date in ISO8601 format.
			@code:YYYY-MM-DDT00:00:00.000;

		Do not use this to reference true date.
	@end-method-documentation
*/
Infiniti.prototype.relativeDate = function relativeDate( ){
	return this.date.utc( ).utcOffset( this.offset ).format( "YYYY-MM-DDTHH:mm:ss:SSS" );
};

/*;
	@method-documentation:
		Real date is the date with no UTC offset applied.

		This will return the date in ISO8601
			@code:YYYY-MM-DDT00:00:00.000;
	@end-method-documentation
*/
Infiniti.prototype.realDate = function realDate( ){
	return this.date.utc( ).format( "YYYY-MM-DDTHH:mm:ss:SSS" );
};

/*;
	@method-documentation:
		Returns a simple human readable representation of date.

		Date will be relative.
	@end-method-documentation
*/
Infiniti.prototype.getDate = function getDate( ){
	return this.date.utc( ).utcOffset( this.offset ).format( "MMMM DD, YYYY" );
};

/*;
	@method-documentation:
		Returns a simple human readable representation of date.

		Date will be relative.

		Setting complete will append true date format.
	@end-method-documentation
*/
Infiniti.prototype.printDate = function printDate( separator, complete ){
	/*;
		@meta-configuration:
			{
				"separator": "string",
				"complete": "boolean"
			}
		@end-meta-configuration
	*/

	separator = optfor( arguments, STRING );

	complete = optfor( arguments, BOOLEAN );

	if( typeof separator != "string" ){
		separator = " | ";
	}

	separator = separator || " | ";

	if( complete ){
		return [ this.getDate( ), this.trueDate ].join( separator );

	}else{
		return this.getDate( );
	}
};

/*;
	@method-documentation:
		Returns a numerical representation of true date.
	@end-method-documentation
*/
Infiniti.prototype.compact = function compact( ){
	return [
		parseInt( this.date.utc( ).format( "YYYYMMDDHHmmssSSS" ) ),
		this.offset
	];
};

if( asea.server ){
	module.exports = Infiniti;
}
