const JSONStream = require('JSONStream')
const chalk = require('chalk')
const request = require('request')
const tc = require('term-cluster')
var program = require('commander')

var index
// Taking arguments with 'commander'
program
  .version('0.2.6')
  .option('-c, --config [url]', 'specify the url for the JSON config file. Just the flag -c will give you the default.', 'https://raw.githubusercontent.com/eklem/search-index-indexer/master/config.json')
  .option('-d, --data [url]', 'specify the url for the JSON data set. Just the flag -d will give you the default.', 'https://raw.githubusercontent.com/eklem/dataset-vinmonopolet/master/dataset-vinmonopolet-test.str')
  .parse(process.argv)
//Default displaying --help when no arguments
if (!process.argv.slice(1).length) {
  program.outputHelp()
  process.exit(1)
}

// Assigning the input to variables
var configurl = ('%s', program.config)
var dataurl = ('%s', program.data)


// indexData const with pipeline pipeline
var indexData = function(error, newIndex) {
  if (error) {
    console.log('Data error for ' + dataurl + '\n' + error)
  }
  if (!error) {
    index = newIndex
    request(dataurl)
      .pipe(JSONStream.parse())
      .pipe(index.defaultPipeline())
      .pipe(index.add())
      .on('data', function(data) {})
  }
}

// Config const
var config = request(configurl, function (error, response, conf) {
  if (error) {
    console.log('Config request error for ' + configurl + '\n' + error)
  }
  if (!error && response.statusCode == 200) {
    // Parse file content to JSON and add nGramLength to options
    config = JSON.parse(conf)
    console.log('config: ')
    console.dir(config)
   }
})

require('search-index')(config, indexData)


