
import stream from 'stream';
import core from 'core-js/library/es6/object';
import autoprefixer from 'autoprefixer-core';


export default class Transformer extends stream.Transform {
    constructor( opts ) {
        super()

        this.opts = core.assign({
            browsers: [ 'last 2 versions' ]
        }, opts )

        this.input = ''
        
        this.processor = autoprefixer({
            browsers: this.opts.browsers
        })
    }

    _transform( chunk, enc, next ) {
        if ( chunk !== null ) {
            this.input += chunk
        }
        next()
    }

    _flush( done ) {
        this.prefix( this.input )
            .then( res => {
                this.push( res )
                done()
            })
            .catch( err => {
                throw new Error( err )
            })
    }

    prefix( input ) {
        return new Promise( ( resolve, reject ) => {
            resolve( this.processor.process( input ).css )
        })
    }
}
