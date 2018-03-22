[![Build Status](https://travis-ci.org/CityOfZion/cityofzion-website.svg?branch=master)](https://travis-ci.org/CityOfZion/cityofzion-website)

The cityofzion.io website source: https://cityofzion.io

Very simple, no JS necessary. Using [Hugo](https://gohugo.io/), a fast static website generator.


## Getting started

**[Install Hugo](https://gohugo.io/getting-started/installing/):**

* On OSX with [homebrew](https://brew.sh/): `brew install hugo`
* Or download a release from here: https://github.com/gohugoio/hugo/releases

This setup needs at least Hugo version 0.37.1.


### Development

Start development mode (with hot reloading):

```
hugo server -D
```

Then you can visit the generated site at http://localhost:1313. As soon as source
files change, hugo builds and reloads the page.


### Production builds and Gulp tasks

There are several Node.js gulp tasks. For instance, to produce minified production builds,
just run `gulp build`. It will now export a build to the public folder.

* Install [Node.js](https://nodejs.org/en/download/)
* Run `npm install` (or `yarn`)
