# search-index-indexer

### Starting point test and debug your JSON config- and JSON streaming data format with the [search-index si.add API](https://github.com/fergiemcdowall/search-index/blob/master/doc/API.md#add). search-index must be at least v0.9.x.

[![Join the chat at https://gitter.im/fergiemcdowall/search-index][gitter-image]][gitter-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

A generic indexer for the search engine [search-index](https://github.com/fergiemcdowall/search-index). Takes a JSON config file and a JSON streaming data file as input. Easy way to test if `search-index` is buggy or it's your own code that is the problem.

## Install

```console
$ npm install search-index-indexer
```

## Usage

Upload your JSON config and data set to a GIST, or a GitHub repo and test them with the search-index-indexer. Remember to use the raw-file.

### Options

```console
$ node index.js [options]

  Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -c, --config [url]    specify the url for the JSON config file. Just the flag -c will give you the default.
    -d, --data [url]      specify the url for the JSON data set. Just the flag -d will give you the default.
```

### Example

```console
$ node index.js -c https://raw.githubusercontent.com/eklem/search-index-indexer/master/config.json -d https://raw.githubusercontent.com/fergiemcdowall/reuters-21578-json/master/data/justTen/justTen.json
```

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE
[npm-url]: https://npmjs.org/package/search-index-indexer
[npm-version-image]: http://img.shields.io/npm/v/search-index-indexer.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/search-index-indexer.svg?style=flat-square
[gitter-url]: https://gitter.im/fergiemcdowall/search-index?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[gitter-image]: https://img.shields.io/badge/GITTER-join%20chat-green.svg?style=flat-square
