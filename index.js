var searchIndex = require('search-index')
var jf = require('jsonfile')
var request = require('request')
var program = require('commander')

// Taking arguments with 'commander' 
program
    .version('0.1.1')
    .option('-c, --config [url]', 'specify the url for the JSON config file. Just the flag -c will give you the default.', 'https://raw.githubusercontent.com/eklem/search-index-indexer/master/config.json')
    .option('-d, --data [url]', 'specify the url for the JSON data set. Just the flag -d will give you the default.', 'https://raw.githubusercontent.com/eklem/search-index-indexer/master/data.json')
    .parse(process.argv)
//Default displaying --help when no arguments
if (!process.argv.slice(2).length) {
    program.outputHelp()
    process.exit(1)
}

// Assigning the input to variables
var configurl = ('%s', program.config)
var dataurl = ('%s', program.data)


// Error message if variables not set for some reason
if (!program.config) {
    console.log('no config')
}
if (!program.data) {
    console.log('no data')
}

// When bot inputs are present
// (they always are because of the program.option setup with predefineds)
if (program.config || program.data) {
    // Getting config file
    request(configurl, function (error, response, config) {
        if (!error && response.statusCode == 200) {
            // Getting data file
            // I don't know how to work this, so doing async the stupid way
            request(dataurl, function (error, response, data) {
                if (!error && response.statusCode == 200) {
                    
                    // Parse file content to JSON
                    config = JSON.parse(config);
                    data = JSON.parse(data);
                    
                    var options = {
                        indexPath: 'si-debug',
                        logLevel: 'warn',
                        logSilent: false,
                        nGramLength: config.nGramLength
                    }

                    // Time before indexing
                    var timeStart = Date.now();

                    //Add to search - index with si.add
                    searchIndex(options, function(err, si) {
                        si.add(data, {
                            batchName: config.batchname,
                            fieldOptions: config.fieldOptions
                        }, function (err) {
                            if (!err) {
                                var timeEnd = Date.now();
                                var timeUsed = (timeEnd - timeStart) / 1000;
                                console.log('Indexed!')
                                console.log('in ' +  timeUsed + ' seconds')
                            } else if (err) {
                                console.dir('something went wrong');
                            }
                        });
                    });

                }
            })

        }
    })
}
