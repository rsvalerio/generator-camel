'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./lib/prompts');
var glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  initializing: {
    files: function () {
      this.folders = glob.sync('**/*/', {cwd: path.join(__dirname, 'templates')});
      this.files = glob.sync('**/*', {cwd: path.join(__dirname, 'templates'), nodir: true});
    }
  },
  prompting: function () {
    this.log(yosay(
      chalk.red('Apache Camel') + ' generator!'
    ));

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: {
    app: function () {
      var userProps = this.props;
      userProps.options = this.options;

      var packageFolder = userProps.package.replace(/\./g, '/');

      var src = 'src/main/java';

      this.log('Creating folders');

      this.folders.forEach(function (folder) {
        mkdirp.sync(folder.replace(/src\/main\/java/g, path.join(src, packageFolder)));
      });

      this.log('Copying files');

      for (var i = 0; i < this.files.length; i++) {
        this.fs.copyTpl(
          this.templatePath(this.files[i]),
          this.destinationPath(this.files[i].replace(/src\/main\/java/g, path.join(src, packageFolder))),
          {userProps: userProps}
        );
      }
    }
  },

  install: function () {
    //this.spawnCommandSync('mvn', ['package']);
  }
});
