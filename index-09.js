const JSONStream = require('JSONStream')
const chalk = require('chalk')
const request = require('request')
const tc = require('term-cluster')
var program = require('commander')

const ops = {
  indexPath: 'myCoolIndex',
  logLevel: 'error'
}

var index
// Taking arguments with 'commander'
program
  .version('0.2.0')
  .option('-c, --config [url]', 'specify the url for the JSON config file. Just the flag -c will give you the default.', 'https://github.com/eklem/search-index-indexer/blob/search-index-v0.9.x/config.json')
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
const indexData = function(err, newIndex) {
  if (!err) {
    index = newIndex
    request(dataurl)
      .pipe(JSONStream.parse())
      .pipe(index.defaultPipeline())
      .pipe(index.add())
      .on('data', function(data) {})
      .on('end', searchCLI)
  }
}

// Config const
// Getting config JSON, setting nGramLength in options
const config =  request(configurl, function (error, response, config) {
  if (error) {
    console.log('Config request error for ' + configurl + '\n' + error)
  }
  if (!error && response.statusCode == 200) {
    // Parse file content to JSON and add nGramLength to options
    config = JSON.parse(config)
    console.log('config: ')
    console.dir(config)
   }
})

const printPrompt = function () {
  console.log()
  console.log()
  process.stdout.write('search > ')
}

const searchCLI = function () {
  printPrompt()
  process.stdin.resume()
  process.stdin.on('data', search)
}

const search = function(rawQuery) {
  index.search(rawQuery.toString().slice(0, -1))
    .on('data', printResults)
    .on('end', printPrompt)
}

const printResults = function (data) {
  console.log('\n' + chalk.blue(data.document.Varenummer) + ' : ' + chalk.blue(data.document.Varenavn))
  const terms = Object.keys(data.scoringCriteria[0].df).map(function(item) {
    return item.substring(25)
  })
  for (var key in data.document) {
    if (data.document[key]) {
      var teaser = tc(data.document[key], terms)
      if (teaser) console.log(teaser)
    }
  }
  console.log()
}

require('search-index')(config, indexData)
