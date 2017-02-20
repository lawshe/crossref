var request = require('request');
var config = require('./config');
var dois = require('./dois.js');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var userMsg = 'DOIs to query';

console.log('/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\');
console.log('CrossRef Data to MongoDB');
console.log('/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\\n');

var crossrefApi = 'http://api.crossref.org/works/';
var dbUrl = (config && config.mongo_url) ? config.mongo_url : null;
var collectionName = (config && config.mongo_collection) ? config.mongo_collection : null;

var insertDocument = function(doi, doc, idx) {
    MongoClient.connect(dbUrl, function(err, db) {
        var collection = db.collection(collectionName);
        collection.insert({doi: doi, crossref: doc}, function(err, result){
            if (err) {
                console.error('Error:', err);
            } else if (result) {
                console.log('\u2713 ' + idx + ' | ' + doi);
            } else {
                console.log('Unable to insert data for', doi);
            }
        });
    });
};

var queryCrossRef = function(doi, idx) {
    setTimeout(function() {
        request(crossrefApi + doi, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                insertDocument(doi, JSON.parse(body), idx);
            } else if (error){
                console.error('error',error);
            } else {
                console.log(doi, response.statusCode);
            }
        });
    }, 100*idx);
};

if (dbUrl && collectionName) {
    if (dois && dois.length > 0) {
        if (dois.length === 1) {
            userMsg = ' DOI to query';
        }
        console.log(dois.length + userMsg + '\n');

        dois.forEach(queryCrossRef);
    } else {
        console.log('No DOIs to query');
    }
} else {
    console.log('Set a Mongo URL in the config file.');
}
