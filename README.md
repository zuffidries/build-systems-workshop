# What is a build system?



## Ah yes.  It is that time in CS52 to discuss the age old debate of...

![GRUNTVGULP](https://i.ytimg.com/vi/oFu7Wzr1_JA/maxresdefault.jpg)

## But, do they really *need* to be mutually exclusive?


![GruntGulpYum!](http://intuitivecompany.com/app/content/uploads/2015/03/gulpGrunt.png)

# No! And we hope that after this fun tutorial that you will begin to understand some underlying differences.

### Yay!! Colaboration!!!!

A build system is a service that executes a specific chain of commands in order to compile and package your code. Generally, the build system takes the files you have written, modifies them, and maps them to an executable.

(We've been using multiple build systems in this class, but the most common/famous example might be `make`.)

### Why are they so important?

If you didn't use a build system in deploying your code, there would be nothing to see! Without them, your code stays lines of text in an editor. With them, it becomes a program that you can see, and with which you can interact.

The files that you write, as they stand, cannot actually do anything. The build system that you choose will take in your files, modify them, and spit out a program that the computer can interpret and run.

In addition, some build systems provide some pretty cool functionality – for example, did you notice how we've been able to see changes we've made in our code show up automatically on-screen when we're running it on our local machine? That's because the build systems we've been using support **continuous integration and hot reloading**. In effect, they're rebuilding your code each time you make a change.

### What types of build systems are out there?

**npm** is an example of a build system that we have seen already in this class. Some others are **Gulp**, **Grunt**, **Webpack**, **Browserify**, **broccoli**, **brunch**, and **mimosa**. But this is by no means an exhaustive list.

For a comparison of two types of build systems, we'll use **Grunt** and **Gulp** as examples.


## First things first: lets fork!!!

If you are somehow magically reading this ReadMe instruction without being on the github page already, click the chicken!!!!!!! [:chicken:](https://github.com/BenjaminKCooper/build-systems-workshop)

Once on github, fork and then `git clone`!


#### Gulp
![gulp-diagram](http://i.imgur.com/B0B77QN.png)

This diagram shows the flow of files through the **Gulp** build system. This is a code-based system, as opposed to a configuration-based system, which means that it does not use any intermediate files – it just adds what it needs into your files and outputs the result.

**Gulp** has only five primary functions:

- **gulp.task(name, fn)** - this creates a task for the system to execute
- **gulp.run(tasks...)** - runs tasks concurrently
- **gulp.watch(glob, fn)** - watches for changes to your files (continuous integration!)
- **gulp.src(glob)** - returns a readable stream
- **gulp.dest(folder)** - returns a writable stream

#### Grunt
![grunt-diagram](http://i.imgur.com/oeCGJUS.png)

**Grunt** is a configuration-based system that is represented by the data flow above. As you can see, **Grunt** does use intermediate or ‘temp’ folders. **Grunt** is slower than **Gulp**, and involves a greater number and complexity of commands.

----

#### Gulp
![gulp-diagram](http://i.imgur.com/B0B77QN.png)

This diagram shows the flow of files through the **Gulp** build system. This is a code-based system, as opposed to a configuration-based system, which means that it does not use any intermediate files – it just adds what it needs into your files and outputs the result.

**Gulp** has only five primary functions:

- **gulp.task(name, fn)** - this creates a task for the system to execute
- **gulp.run(tasks...)** - runs tasks concurrently
- **gulp.watch(glob, fn)** - watches for changes to your files (continuous integration!)
- **gulp.src(glob)** - returns a readable stream
- **gulp.dest(folder)** - returns a writable stream

#### Grunt
![grunt-diagram](http://i.imgur.com/oeCGJUS.png)

**Grunt** is a configuration-based system that is represented by the data flow above. As you can see, **Grunt** does use intermediate or ‘temp’ folders. **Grunt** is slower than **Gulp**, and involves a greater number and complexity of commands.

----

For this exercise, we will be using **Gulp**.

# Getting Started with Gulp!

#### 1. Install gulp globally:

__If you have previously installed a version of gulp globally, please run `npm rm --global gulp`
to make sure your old version doesn't collide with gulp-cli.__

```sh
$ npm install --global gulp-cli
```

#### 2. Initialize your project directory:

```sh
$ npm init
```

#### 3. Install gulp in your project devDependencies:

```sh
$ npm install gulp --save-dev
```

#### 4. Create a `gulpfile.js` at the root of your project:

```js
var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});
```

#### 5. Run gulp:

```sh
$ gulp
```

The default task will run and do nothing.

To run individual tasks, use `gulp <task> <othertask>`.
#### Now... Something more exciting: Easier Git pushing!


First, we’ll install some extra plugins that you’ll need for this.
Run the following:

```sh
$ npm install yargs --save-dev
$ npm install gulp-git --save-dev
$ npm install run-sequence --save-dev
```

This gets the gulp plugins required for our final gulp task.
-	yargs is a node.js library for parsing optstrings
-	gulp-git is the git plugin for gulp
-	run-sequence runs a series of gulp tasks in the specified order

Next, let’s replace the code in `gulpfile.js` so it actually does something useful. Just go ahead and delete everything in there, and we’ll replace it in sections.

##### First add in some variables from the packages we just installed.

```sh
var gulp = require('gulp');
var argv = require('yargs').argv;
var git = require('gulp-git');
var runSequence = require('run-sequence');
```

##### Next, we’ll add in intermediate tasks:

These tasks can handle adding and committing local changes, and pushing them to github. On their own they don’t save much time, but they’re necessary intermediate steps to our final product.

 ```sh
gulp.task('init', function() {
  console.log(argv.m);
});

gulp.task('add', function() {
  console.log('adding...');
  return gulp.src('.')
    .pipe(git.add());
});

gulp.task('commit', function() {
  console.log('commiting');
  if (argv.m) {
    return gulp.src('.')
      .pipe(git.commit(argv.m));
  }
});

gulp.task('push', function(){
  console.log('pushing...');
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});
```

You could run these individually, but it is more useful to be able to run them all together at the same time! So we will add one more gulp task that incorporates the above tasks.

##### Add the final gulp task to the end of `gulpfile.js`:

```sh
gulp.task('gitsend', function() {
  runSequence('add', 'commit', 'push');
});
```


This is what your `gulpfile.js` should look like in the end:

```sh
var gulp = require('gulp');
var argv = require('yargs').argv;
var git = require('gulp-git');
var runSequence = require('run-sequence');

gulp.task('init', function() {
  console.log(argv.m);
});

gulp.task('add', function() {
  console.log('adding...');
  return gulp.src('.')
    .pipe(git.add());
});

gulp.task('commit', function() {
  console.log('commiting');
  if (argv.m) {
    return gulp.src('.')
      .pipe(git.commit(argv.m));
  }
});

gulp.task('push', function(){
  console.log('pushing...');
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('gitsend', function() {
  runSequence('add', 'commit', 'push');
});

```

##### Now run this simple one line command and watch all your git dreams come true!!


Type this into your terminal, replacing the commit message:

```sh
$ gulp gitsend -m “insert your commit message here”
```

This will run:
-	git add .
-	git commit -am [your message]
-	git push origin master



Yay! All done with the Gulp tutorial!


## How is everyone feeling?

### Confused?

![coufused](http://i.imgur.com/LYjqfnC.gif)

### In awe!?

![awe](http://i258.photobucket.com/albums/hh253/jimifunguzz/doge-so-gif.gif)

### BEYOND EXCITED LIKE THESE AWESOMELY COOL AEROSPACE ENGINEERS FROM NASA!!?!?!?

![SOpumped](http://stream1.gifsoup.com/view2/4018237/nasa-uproar-o.gif)




# Sweet!!!!

### But what about Grunt, you may ask?!?!

## Good question!! And...

# YOU ARE IN LUCK BECAUSE IT IS * **GRUNT TIME** *!!!! yay

# Getting Started with Grunt

![FindingDoryGif](https://66.media.tumblr.com/d769bad2c28a0987808ce472d9ccbad4/tumblr_o9d7y3O2fR1uv90soo1_500.gif)

Yay!!!!  The fun really never ends.


So... lets DO IT!!!!!!!!!!!

## Steps for Grunt Workshop:
#### 1. Lets get set up!
In terminal run:
```sh
$ cd build-systems-workshop

$ atom Gruntfile.js
```

You now have grunt, and created the file that **Grunt** looks for when you run `$ grunt` in terminal. BUT, don't run `$ grunt` yet, as nothing will happen!  So sad :pig_nose:

Lets look at the second command you wrote! `$ atom Gruntfile.js`.  This, as you just might imagine, makes a **Gruntfile**, the aptly named file in which you can control **Grunt**!!

So... on we go!!

#### 2. Lets start the Gruntfile!

So, now that we have created Gruntfile.js, lets do something with it! Lets try and do somthing somewhat useful...

If your ***Gulp*** aspect of the project is running smoothly, what will it do? Well, it *should* make it so that every time you save something in your project that it will commit, push, and generally update your project in its git!

But.. what if you *also* want to make sure that your whole project is linted as well before you update? Not a bad idea! So... lets do it!

First, lets add the following lines

```js
module.exports = function(grunt) {
  ///everything else will go in here!!!
};

```
Everything in a Gruntfile is to be :hamburger:sandwiched:hamburger: between the curly brackets of this `module.exports` statement.  

#### 3. Lets Initialize!

Now we need to initialize the Gruntfile!

```js

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  watch :{
    all :{
      files: ['Gruntfile.js','src//*.js'],
      tasks: ['jshint']
    }
  },
  jshint: {
    options: {
      reporter: require('jshint-stylish')
    },

    build: ['Gruntfile.js', 'src//*.js']
  }
});

```

You will notice `jshint` and `watch`.  These are the the two main modules that we will be using for this **Gruntfile**.  We have talked a bit about `jshint` before in class, but just as a refresher, it is a ***linting*** program, and the one we will use. And, we will use `watch` to, as you just might surmise, *watch* our files for changes!  Just below the `watch :{` clause in the above code, you will notice a line that says `files: ['Gruntfile.js','src//*.js'],`.  What this is doing is telling our `watch` module to watch for changes in either the Gruntfile, **or** anything in our /src folder that is a JavaScript file!

***Super cool!***

![ColbertGif](https://media.giphy.com/media/13hMMtcJiPY2Qg/giphy.gif)

So, using our best friend `npm`...

![npm](https://partners.npmjs.com/weekly/weekly-header-boxes-retina.png)

...lets make sure that we have everything set up in our dependencies!

To get `watch` and `jshint`, put the following commands into your terminal...

```sh
$ npm install grunt-contrib-jshint --save-dev
$ npm install grunt-contrib-watch --save-dev
```

#### 4. LAST STEP!!!!

You are almost there!!!

lets put in these lines of code...

```js

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default',['watch','jshint']);

```

These should be placed ***intermediately*** before closing the brackets from that very first `module.exports`.

So, lets talk about what these three lines do!!

The two that start with `grunt.loadNpmTasks` are a necessary step to load our two modules: `jshint` and `watch`.  The loading here is fairly abstracted, just know that a lot of *behind-the-scenes* stuff is going on to import for **Grunt**.

But, this last line (`grunt.registerTask('default',['watch','jshint']);`) is the most important line of all.  This sets a task!!  In this case we are defining a default task, though this could be anything.  The default task is what is automatically run when you run:

:computer:
```
$ grunt
```

#### 5. Lets make our own task!!!

Now that you know how Grunt works and how to make a Gruntfile, lets design and make our own from scratch!

I am going to walk through the `grunt.registerTask` code structure/formula again to see if that will clarify things...

This is the basic outline:

```js
grunt.registerTask(/*'TASK_NAME'*/,[/*'TASK_1'*/,/*'TASK_2'*/,/*etc...*/]);
```

So, as I mentioned above, when you run...

:computer:
```
$ grunt
```
... the default task will run.  BUT, if you have a task called, let us say, *tastTwo*, then how do you think you would run it?

Like this!!!!
:computer:
```
$ grunt taskTwo
```

#WORKS CITED:

#### 1. https://scotch.io/tutorials/a-simple-guide-to-getting-started-with-grunt
#### 2. https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4
#### 3. http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/
#### 4. http://www.hongkiat.com/blog/gulp-vs-grunt/
#### 5. http://jaysoo.ca/2014/01/27/gruntjs-vs-gulpjs/
