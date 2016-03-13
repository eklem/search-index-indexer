#!/usr/bin/env node
 
var options = {
    indexPath: 'si-debug',
    logLevel: 'info',
    logSilent: false,
};
var searchIndex = require('search-index');
var config = require('./config.json');
var data = require('./data.json');
var program = require('commander');


// Taking arguments with 'commander' 
program
    .version('0.0.2')
    .option('-c, --config', 'specify the url for the config file. Defaults to https://github.com/eklem/search-index-indexer/blob/master/config.json')
    .option('-d, --data', 'specify the url for the data set. Defaults to https://raw.githubusercontent.com/eklem/search-index-indexer/master/data.json')
    .parse(process.argv);
    //Default displaying --help when no arguments
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
 
// Changing predefined 
if (!program.config) {
    console.log('no config');
    program.config = config;
};
if (!program.data) {
    console.log('no data');
    program.data = data;
};

console.log(program.config);



// Add to search-index with si.add
// searchIndex(options, function(err, si) {
//     si.add(data, {
//         batchName: config.batchname,
//         fieldOptions: config.fieldOptions
//     }, function (err) {
//         if (!err) {
//             console.log('Indexed!')
//                 //console.dir(config)
//         } else if (err) {
//             console.dir(err);
//         }
//     });
// });