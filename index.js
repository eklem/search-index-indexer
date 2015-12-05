// Modules and stuff required
var ifttnorch = require('iftt-norch-tools');
var options = {
    indexPath: 'si-debug',
    logLevel: 'info',
    logSilent: false,
    nGramLength: [1, 2, 3, 4]
};
var si = require('search-index')(options);
var jf = require('jsonfile');
var configfile = '/Users/eklem/node_modules/search-index-indexer/config.json';
var data = '/Users/eklem/node_modules/search-index-indexer/data.json';

// Read config file
var config = jf.readFileSync(configfile);
var data = jf.readFileSync(data);

// Add to search-index with si.add
si.add(data, {
  batchName: config.batchname,
  fieldOptions: config.fieldoptions
}, function (err) {
  if (!err) {
    console.log('Indexed!')
    config.newestItemDate = ifttnorch.findnewestdate(datesUpdated)
    config.gsheetLastUpdated = result.updated
    //console.dir(config)
            
    // Write config file to see what's there default
    jf.writeFileSync(configfile, config, {spaces: 4})
  }
};
