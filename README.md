# CrossRef to MongoDB
CrossRef is "a not-for-profit membership organization for scholarly publishing working to make content easy to find, cite, link, and assess." This app will get article data registered at [CrossRef](https://github.com/CrossRef/rest-api-doc/blob/master/rest_api.md) and store in a MongoDB. Applications include backing up data before batch reregistering articles.

## Installation and Setup
``` bash
$ git clone https://github.com/lawshe/crossref.git
$ cd crossref
```

Use /dois.js.ex to create /dois.js.

The database URL and collection are set in config.js. The defaults are ```mongodb://localhost:27017/crossref``` and ```articles```, respectively.

**Run MongoDB**

``` bash
$ mongod --dbpath ~/data
```
**Start**

``` bash
$ npm start
```

## Schema
```javascript
{
    "doi": "",
    "crossref": {}
}
```
