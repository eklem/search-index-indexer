var options = {
    indexPath: 'si-debug',
    logLevel: 'info',
    logSilent: false,
};
var searchIndex = require('search-index');
var jf = require('jsonfile');
var request = require('request');
var async = require('async');
var program = require('commander');

// Read config file
// var config = jf.readFileSync(configfile);
// var data = jf.readFileSync(data);


// Taking arguments with 'commander' 
program
    .version('0.0.2')
    .option('-c, --config [url]', 'specify the url for the JSON config file', 'https://github.com/eklem/search-index-indexer/blob/master/config.json')
    .option('-d, --data [url]', 'specify the url for the JSON data set', 'https://raw.githubusercontent.com/eklem/search-index-indexer/master/data.json')
    .parse(process.argv);
//Default displaying --help when no arguments
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

configurl = ('%s', program.config);
dataurl = ('%s', program.data);


// Changing predefined 
if (!program.config) {
    console.log('no config');
    //    program.config = config;
};
if (!program.data) {
    console.log('no data');
    //    program.data = data;
};
if (program.config || program.data) {
    //    console.log('\nLets do this: ' + config)
    request(configurl, function (error, response, config) {
        if (!error && response.statusCode == 200) {
            //          console.log(config);
            request(dataurl, function (error, response, data) {
                if (!error && response.statusCode == 200) {
                    console.log(config);
                    console.log(data);
                    
                    // Parse file content to JSON
                    config = JSON.parse(config);
                    data = JSON.parse(data);


                    //Add to search - index with si.add
                    searchIndex(options, function (err, si) {
                        si.add(data, {
                            batchName: config.batchname,
                            fieldOptions: config.fieldOptions
                        }, function (err) {
                            if (!err) {
                                console.log('Indexed!')
                                    //console.dir(config)
                            } else if (err) {
                                console.dir(err);
                            }
                        });
                    });

                }
            })

        }
    })
}
