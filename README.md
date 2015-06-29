# Cleancss-transform

> Cleancss transform stream

```
npm i -D cleancss-transform
```

```
import fs from 'fs'
import cleancss from 'autoprefixer-transform'

fs.createReadStream( 'styles.css' )
  .pipe( autoprefixer() )
  .pipe( fs.createWriteStream( 'main.css' ) )
```
