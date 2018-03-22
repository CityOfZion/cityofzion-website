<p align="center">
  <img 
    src="http://res.cloudinary.com/vidsy/image/upload/v1503160820/CoZ_Icon_DARKBLUE_200x178px_oq0gxm.png" 
    width="125px"
    alt="City of Zion logo">
</p>

<h1 align="center">neo-php</h1>

<p align="center">
  The CityOfZion.io website source: https://cityofzion.io
</p>

<p align="center">
	<a href="https://travis-ci.org/CityOfZion/cityofzion-website">
		<img src="https://travis-ci.org/CityOfZion/cityofzion-website.svg?branch=master"/>
	</a>
</p>

## Overview
Very simple, no JS necessary. Using [Hugo](https://gohugo.io/), a fast static website generator and [NodeJS](https://nodejs.org) for building.

## Adding yourself to the team
New to our team? Do a pullrequest to add yourself! Important to know that we have the following roles:
 - Council
 - Advisor
 - Maintainer
 - Developer
 - Contributor

If you're NOT on the [City of Zion Github](https://github.com/orgs/CityOfZion/people), you're a contributor. If you're on there you're a developer. For the other roles: You know when you're a maintainer or advisor ;-)

### Determined your role?
 - Fork the repo
 - Update the [Team.yaml](https://github.com/CityOfZion/cityofzion-website/blob/master/data/Team.yaml)
 - Add a picture in jpg format 480x480px [here](https://github.com/CityOfZion/cityofzion-website/tree/master/static/assets/images/team-images)
 - Create a Pull Request

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

## License

- Open-source [MIT](https://github.com/CityOfZion/neon-js/blob/master/LICENSE.md).
- Main author is [Benjamin de Bos](https://github.com/woodehh).
- Maintainer is [Chris Hager](https://github.com/metachris)
