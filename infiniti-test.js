"use strict";

const Infiniti = require( "./infiniti.js" );

let sample1 = new Date( "8/15/2016" );

console.log( Infiniti( sample1 ).printDate( ) );

console.log( Infiniti( sample1 ).getDate( ) );

console.log( Infiniti( sample1 ).realDate( ) );

console.log( Infiniti( sample1 ).relativeDate( ) );

let Infiniti_date = Infiniti( sample1 ).trueDate;

console.log( "True Date", Infiniti_date );

let compact1 = Infiniti( sample1 ).compact( );

console.log( "Compact", compact1 );

let comparison1 = Infiniti( Infiniti_date ).parse( );

console.log( "Comparison1", comparison1  );

let comparison2 = Infiniti( compact1 ).parse( );

console.log( "Comparison2", comparison2 );

console.log( comparison1.trueDate === comparison2.trueDate );
