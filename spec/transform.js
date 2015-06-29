var path = require( 'path' )
var fs = require( 'fs' )
var os = require( 'osenv' )
var pkg = require( '../package.json' )
var test = require( 'tape' )
var Transform = require( '../dist/transform' )

test( 'Transform stream produces minified css', function( t ) {
    t.plan( 1 )

    var transform = new Transform()
    var outPath = path.join( os.tmpdir(), pkg.name + '-' + Math.random() )
    var expectedOutput = 'body{transform:scale(2)}'

    fs.createReadStream( __dirname + '/fixture.css' )
        .pipe( transform )
        .pipe( fs.createWriteStream( outPath )
            .on( 'close', function() {
                t.equal( fs.readFileSync( outPath, { encoding: 'utf8' } ), expectedOutput, 'Transform prefixes css' )
            }))
})
