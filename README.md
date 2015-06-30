# Cleancss-transform

> Cleancss transform stream

```
npm i -D cleancss-transform
```

```
import fs from 'fs'
import cleancss from 'cleancss-transform'

fs.createReadStream( 'styles.css' )
  .pipe( cleancss() )
  .pipe( fs.createWriteStream( 'main.css' ) )
```
