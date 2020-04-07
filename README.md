<p align="center">
  <img 
    src="https://raw.githubusercontent.com/CityOfZion/visual-identity/develop/_CoZ%20Branding/_Logo/_Logo%20icon/_PNG%20200x178px/CoZ_Icon_DARKBLUE_200x178px.png" 
    width="125px"
    alt="City of Zion logo">
</p>

<h1 align="center">CityOfZion.io source</h1>

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

## Contributors
- [Austin Hinderer](https://github.com/austinhinderer)
- [Benjamin de Bos](https://github.com/woodehh)
- [Chris Hager](https://github.com/metachris)
- [Zeshon](https://github.com/zeshon)

## Adding yourself to the team
New to our team? Do a pullrequest to add yourself! Important to know that we have the following roles:
 - Council
 - Advisor
 - Maintainer
 - Developer
 - Contributor

If you're NOT on the [City of Zion Github](https://github.com/orgs/CityOfZion/people), you're a contributor. If you're on there you're a developer. For the other roles: You know when you're a maintainer or advisor ;-)

### Determined your role?
If you prefer to be anonymous, it's alright too -- simply don't add your real name,location, etc. but still add yourself. But please use the image: anonymous.jpg.
1. Fork the repo
2. Update the [Team.yaml](https://github.com/CityOfZion/cityofzion-website/blob/master/data/Team.yaml)
3. Add a picture in jpg format 480x480px [here](https://github.com/CityOfZion/cityofzion-website/tree/master/static/assets/images/team-images)
4. Please resize and export the image in 480x480px JPG format, with about 80% quality. You can do this easily in Gimp or Photoshop ot in the command line with this ImageMagick command:

```convert -resize "480x480^" -gravity center -crop 480x480+0+0 -strip -interlace Plane -quality 80% <yourpicture> <yourcozpicture>.jpg```

To just optimize the image if you already have it in the correct size:

```mogrify -strip -interlace Plane -quality 80% <yourpicture>.jpg```

5. Create a Pull Request

<3


## License

- Open-source [MIT](https://github.com/CityOfZion/neon-js/blob/master/LICENSE.md).

## Old repo
There used to be an 'old' website. That is still to be found [here](https://github.com/CityOfZion/website-deprecated)