# Bouncing Ball

Each time you click in the white canvas a new bouncing ball with a random angle and speed will appear. There is an option that will disable this functionallity allowing the balls to be fired only from the left/right down corner.

You can click with the left button and the bouncing balls will have a right direction or with the middle/right button and they will have a left direction.

Demo: http://rustico.github.io/bouncing-ball/

In the directory ./src/index.html there is also a working version.

And executing: 

```
$ npm install
$ node build
```

Will create a compressed version from ./src to ./public and it will open ./public/index.html in your default browser.


## Tests

For testing you will need to install https://github.com/caolan/nodeunit and then execute:

```
$ nodeunit tests/ball.js
```


