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

In addition, some build systems provide some pretty cool functionality – for example, did you notice how we've been able to see changes we've made in our code show up automatically on-screen when we're running it on our local machine? That's because the build systems we've been using support **continuous integration**. In effect, they're rebuilding your code each time you make a change.

### What types of build systems are out there?

**npm** is an example of a build system that we have seen already in this class. Some others are **Gulp**, **Grunt**, **Webpack**, **Browserify**, **broccoli**, **brunch**, and **mimosa**. But this is by no means an exhaustive list.

For a comparison of two types of build systems, we'll use **Grunt** and **Gulp** as examples.


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
$ npm install --save-dev gulp
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

## How is everyone feeling?

### Confused?

![coufused](http://i.imgur.com/LYjqfnC.gif)

### In awe!?

![awe](http://i258.photobucket.com/albums/hh253/jimifunguzz/doge-so-gif.gif)

### BEYOND EXCITED LIKE THESE AWESOMELY COOL AEROSPACE ENGINEERS FROM NASA!!?!?!?

![SOpumped](http://stream1.gifsoup.com/view2/4018237/nasa-uproar-o.gif)


# Getting Started with Grunt!

#### 1. Install the CLI (Command Line Interface:

```sh
$ npm install -g grunt-cli
```

This will put the `grunt` command in your system path, allowing it to be run from any directory.

Note that installing `grunt-cli` does not install the Grunt task runner! The job of the Grunt CLI is simple: run the version of Grunt which has been installed next to a `Gruntfile`. This allows multiple versions of Grunt to be installed on the same machine simultaneously.

#### 2. How the CLI works
Each time `grunt` is run, it looks for a locally installed Grunt using node's `require()` system. Because of this, you can run `grunt` from any subfolder in your project.

If a locally installed Grunt is found, the CLI loads the local installation of the Grunt library, applies the configuration from your `Gruntfile`, and executes any tasks you've requested for it to run

#### 3. Preparing a new Grunt Project

A typical setup will involve adding two files to your project: `package.json` and the `Gruntfile`.

**package.json**: This file is used by npm to store metadata for projects published as npm modules. You will list grunt and the Grunt plugins your project needs as devDependencies in this file.

**Gruntfile**: This file is named `Gruntfile.js` and is used to configure or define tasks and load Grunt plugins.


#### 4. Create a `package.json` file at the root of your project:


The `package.json` file belongs in the root directory of your project, next to the `Gruntfile`, and should be committed with your project source. Running `npm install` in the same folder as a `package.json` file will install the correct version of each dependency listed therein.

There are a few ways to create a `package.json` file for your project:

Most **grunt-init** templates will automatically create a project-specific `package.json` file.
The **npm init** command will create a basic `package.json` file.
Start with the example below,


```sh
{
  "name": "my-project-name",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-nodeunit": "~0.4.1",
    "grunt-contrib-uglify": "~0.5.0"
  }
}
```

#### 5. Intalling Grunt:

```sh
$ npm install grunt --save-dev

```


#### 6. Install the Jshint plugin!

```sh
$ npm install grunt-contrib-jshint --save-dev
```

#### 7. Create a Gruntfile

The `Gruntfile.js` file is a valid JavaScript or CoffeeScript file that belongs in the root directory of your project, next to the `package.json` file, and should be committed with your project source.

A `Gruntfile` is comprised of the following parts:

- The "wrapper" function
- Project and task configuration
- Loading Grunt plugins and tasks
- Custom tasks


#### 8. An Example Gruntfile
```sh
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};

```

#### 9. Defining default tasks

If your project requires tasks not provided by a Grunt plugin, you may define custom tasks right inside the `Gruntfile`. For example, this `Gruntfile` defines a completely custom `default` task that doesn't even utilize task configuration:

```sh
module.exports = function(grunt) {

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};
```


# Sweet!!!!

### But what about Grunt, you may ask?!?!

## Good question!! And...

# YOU ARE IN LUCK BECAUSE IT IS * **GRUNT TIME** *!!!! yay

![FindingDoryGif](https://66.media.tumblr.com/d769bad2c28a0987808ce472d9ccbad4/tumblr_o9d7y3O2fR1uv90soo1_500.gif)

Yay!!!!  The fun really never ends.


So... lets DO IT!!!!!!!!!!!

## Steps for Grunt Workshop:
#### 1. In terminal run:
```sh
$ cd build-systems-workshop

$ atom Gruntfile.js
```
