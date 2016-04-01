
# Paths etc
To work with twitter, twiz has to be run from
http://local.twiz.com:8080/

Change your hosts file (OSX: /etc/hosts)
to point to localhost for that url:
127.0.0.1 http://local.twiz.com

# Usage
Run
```
npm install
```
to install all required node.js packages

Run
```
npm run dev
```
to build a development version and serve it from [http://localhost:8080/](http://localhost:8080/)

Run
```
npm run deploy
```
to build a deployment version (into the build directory)

