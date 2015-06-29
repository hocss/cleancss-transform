var path = require( 'path' )
var fs = require( 'fs' )
var os = require( 'osenv' )
var pkg = require( '../package.json' )
var test = require( 'tape' )
var Transform = require( '../dist/transform' )

var fixtureCompiled = 'body {\n  -webkit-transform: scale( 2 );\n          transform: scale( 2 );\n}\n'

test( 'Transform stream produces prefixed css', function( t ) {
    t.plan( 1 )

    var transform = new Transform()
    var outPath = path.join( os.tmpdir(), pkg.name + '-' + Math.random() )
    var expectedOutput = 'body { -webkit-transform: scale( 2 ); transform: scale( 2 ); }\n'

    fs.createReadStream( __dirname + '/fixture.css' )
        .pipe( transform )
        .pipe( fs.createWriteStream( outPath )
            .on( 'close', function() {
                t.equal( fs.readFileSync( outPath, { encoding: 'utf8' } ), expectedOutput, 'Transform prefixes css' )
            }))
})

test( 'Browsers to prefix for should be passed through to autoprefixer', function( t ) {
    t.plan( 1 )

    var transform = new Transform({
        browsers: [ 'chrome 40' ]
    })
    
    var outPath = path.join( os.tmpdir(), pkg.name + '-' + Math.random() )
    var expectedOutput = 'body { transform: scale( 2 ); }\n'

    fs.createReadStream( __dirname + '/fixture.css' )
        .pipe( transform )
        .pipe( fs.createWriteStream( outPath )
            .on( 'close', function() {
                t.equal( fs.readFileSync( outPath, { encoding: 'utf8' } ), expectedOutput, 'Transform prefixes css' )
            }))
})
