// Modules and stuff required
//var ifttnorch = require('iftt-norch-tools');
var options = {
    indexPath: 'si-debug',
    logLevel: 'info',
    logSilent: false,
};
var searchIndex = require('search-index');
var jf = require('jsonfile');
var config = require('./config.json');
var data = require('./data.json');

// Read config file
// var config = jf.readFileSync(configfile);
// var data = jf.readFileSync(data);

// Add to search-index with si.add
searchIndex(options, function(err, si) {
    si.add(data, {
        batchName: config.batchname,
        fieldOptions: config.fieldOptions
    }, function (err) {
        if (!err) {
            console.log('Indexed!')
                //console.dir(config)

            // Write config file to see what's there default    ### NOT WORKING ###
            // jf.writeFileSync(config, config, {
            //     spaces: 4
            // })
        } else if (err) {
            console.dir(err);
        }
    });
});