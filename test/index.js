// Index with indexer and test some queries here
/*
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
*/
