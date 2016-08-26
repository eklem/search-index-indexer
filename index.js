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
  .version('0.1.8')
  .option('-c, --config [url]', 'specify the url for the JSON config file. Just the flag -c will give you the default.', 'https://raw.githubusercontent.com/eklem/search-index-indexer/master/config.json')
  .option('-d, --data [url]', 'specify the url for the JSON data set. Just the flag -d will give you the default.', 'https://raw.githubusercontent.com/fergiemcdowall/reuters-21578-json/master/data/justTen/justTen.json')
  .option('-s, --start [number]', 'Which item in your array to start with. Defaults to 0', 0)
  .option('-e, --end [number]', 'Which item in your array to end with. Defaults to length of array')
  .parse(process.argv)
//Default displaying --help when no arguments
if (!process.argv.slice(5).length) {
  program.outputHelp()
  process.exit(1)
}

// Assigning the input to variables
var configurl = ('%s', program.config)
var dataurl = ('%s', program.data)
var start = ('%s', program.start)
var end = ('%s', program.end)


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
  requestData(dataurl, options, start, end)
}

// Getting data JSON
function requestData (dataurl, options, start, end) {
  request(dataurl, function (error, response, data) {
    if (error) {
      console.log('Data request error for ' + dataurl + '\n' + error)
    }
    if (!error && response.statusCode == 200) {
      // Parse file content to JSON
      data = JSON.parse(data)
      requestConfig(configurl, data, options, start, end)
    }
  })
}

// Getting config JSON, setting nGramLength in options
function requestConfig (configurl, data, options, start, end) {
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
      indexData(config, data, options, start, end)
     }
  })
}


// Indexer
function indexData (config, data, options, start, end) {
  // Create a subset of data
  var end = parseInt(end)
  var start = parseInt(start)
  if (start > end) {
    console.log('ERROR: Start higher than end. Unable to slice data array.')
    return;
  }
  else if (!end || end >= data.length) {
    var dataSubset = data.slice(start)
  }
  else if (end < data.length) {
    var end = (+end) + 1
    var dataSubset = data.slice(start, end)
  }
  
  console.dir(dataSubset)
  console.log('data.length: ' + data.length)
  console.log('start: ' + start + '\nend: ' + end)
  console.log('dataSubset.length: ' + dataSubset.length)
  data = null

  //Add to search - index with si.add
  var timeStart = Date.now()  
  searchIndex(options, function(err, si) {
    si.add(dataSubset, {
      batchName: config.batchname,
      fieldOptions: config.fieldOptions
    }, function (err) {
      if (!err) {
        var timeEnd = Date.now()
        console.log('Ending indexing at:   ' + timeEnd)
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
