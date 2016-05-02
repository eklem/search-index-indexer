# search-index-indexer

### Starting point test and debug your JSON format for both config and data, and the [search-index si.add API](https://github.com/fergiemcdowall/search-index/blob/master/doc/API.md#add).

[![Join the chat at https://gitter.im/fergiemcdowall/search-index][gitter-image]][gitter-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

A generic indexer for the search engine [search-index](https://github.com/fergiemcdowall/search-index). Takes two JSON files as input: One config file, and one data file. Easy way to test if `search-index` is buggy or it's your own code that is the problem.

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

    -h, --help          output usage information
    -V, --version       output the version number
    -c, --config [url]  specify the url for the JSON config file. Just the flag '-c' will give you the default.
    -d, --data [url]    specify the url for the JSON data set. Just the flag '-d' will give you the default.
```

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE
[npm-url]: https://npmjs.org/package/search-index-indexer
[npm-version-image]: http://img.shields.io/npm/v/search-index-indexer.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/search-index-indexer.svg?style=flat-square
[gitter-url]: https://gitter.im/fergiemcdowall/search-index?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[gitter-image]: https://img.shields.io/badge/GITTER-join%20chat-green.svg?style=flat-square
