// Options and require
var options = {
  indexPath: 'si-debug',
  logLevel: 'info',
  logSilent: false,
}
var searchIndex = require('search-index')
var jf = require('jsonfile')
var request = require('request')
var program = require('commander')


// Taking arguments with 'commander' 
program
  .version('0.1.2')
  .option('-c, --config [url]', 'specify the url for the JSON config file. Just the flag -c will give you the default.', 'https://raw.githubusercontent.com/eklem/search-index-indexer/master/config.json')
  .option('-d, --data [url]', 'specify the url for the JSON data set. Just the flag -d will give you the default.', 'https://raw.githubusercontent.com/eklem/search-index-indexer/master/data.json')
  .option('-i, --items [number]', 'number of items to process each time. Just the flag -i will give you the default (10).',
  10)
  .parse(process.argv)
//Default displaying --help when no arguments
if (!process.argv.slice(3).length) {
  program.outputHelp()
  process.exit(1)
}

// Assigning the input to variables
var configurl = ('%s', program.config)
var dataurl = ('%s', program.data)
var items = ('%s', program.items)

// Error message if variables not set for some reason
if (!program.config) {
  console.log('no config url')
}
if (!program.data) {
  console.log('no data url')
}

// Checking if url not present
// (They always are because of the program.option setup with predefineds)
if (program.config && program.data) {
  console.log('have config and data url')
  requestData(dataurl, options)
}

function requestData (dataurl, options) {
  request(dataurl, function (error, response, data) {
    if (error) {
      console.log('Data request error for ' + dataurl + '\n' + error)
    }
    if (!error && response.statusCode == 200) {
      // Parse file content to JSON
      data = JSON.parse(data)
      console.log('data length: ' + data.length)
      requestConfig(configurl, data, options)
    }
  })
}

function requestConfig (configurl, data, options) {
  request(configurl, function (error, response, config) {
    if (error) {
      console.log('Config request error for ' + configurl + '\n' + error)
    }
    if (!error && response.statusCode == 200) {
      // Parse file content to JSON and add nGramLength to options
      config = JSON.parse(config)
      options.nGramLength = config.nGramLength
      console.log('config: ')
      console.dir(config)
      indexData(config, data, options)
     }
  })
}

function indexData (config, data, options) {
  // Create a subset of data
  console.log('options: ')
  console.dir(options)
  var dataSubset = data.slice(0,items)
  //console.dir(dataSubset)
  data = null
  // Time before indexing
  var timeStart = Date.now()  
  //Add to search - index with si.add
  searchIndex(options, function(err, si) {
    si.add(dataSubset, {
      batchName: config.batchname,
      fieldOptions: config.fieldOptions
    }, function (err) {
      if (!err) {
        var timeEnd = Date.now()
        var timeUsed = (timeEnd - timeStart) / 1000;
        console.log('Indexed!')
        console.log('in ' +  timeUsed + ' seconds')
      } else if (err) {
        console.dir('something went wrong')
        config = null
      }
    })
  })
}