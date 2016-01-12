// https://github.com/nwjs/nw-builder#run-nwjs
var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: '../nw-chat-pack/**',
    buildDir: '../nw-chat-app/',
    platforms: ['osx64'],
    version: '0.12.3'
});

nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
