"use strict";

const assert = require( "assert" );
const Infiniti = require( "./infiniti.js" );

let sample1 = new Date( "8/15/2016" );

assert.equal( Infiniti( sample1 ).printDate( ), "August 15, 2016" );
assert.equal( Infiniti( sample1 ).getDate( ), "August 15, 2016" );
assert.equal( Infiniti( sample1 ).realDate( ), "2016-08-14T16:00:00" );
assert.equal( Infiniti( sample1 ).relativeDate( ), "2016-08-15T00:00:00" );

let Infiniti_date = Infiniti( sample1 ).trueDate;
assert.equal( Infiniti_date, "0​2016​08​14​16​00​00​00480" );

let compact1 = Infiniti( sample1 ).compact( );
assert.deepEqual( compact1, [ 2016081416, 480 ] );

let comparison1 = Infiniti( Infiniti_date ).parse( );
let comparison2 = Infiniti( compact1 ).parse( );
assert.equal( comparison1.trueDate, comparison2.trueDate );

console.log( "ok" );
