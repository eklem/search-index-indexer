# search-index-indexer
A generic indexer for the search engine [search-index](https://github.com/fergiemcdowall/search-index). Takes two JSON files as input: One config file, and one data file.

Created to test and debug your JSON format for both config and data, and the [search-index si.add API](https://github.com/fergiemcdowall/search-index/blob/master/doc/API.md#add).


## Install

```console
  npm install search-index-indexer
```

## Usage & options

```console
$ node index.js [options]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -c, --config [url]  specify the url for the JSON config file. Just the flag '-c' will give you the default.
    -d, --data [url]    specify the url for the JSON data set. Just the flag '-d' will give you the default.
```
