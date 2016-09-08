'use strict';
var yeoman = require('yeoman-generator');
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

    this.log('      _                             _');
    this.log('     / \\     _ __     __ _    ___  | |__     ___');
    this.log('    / _ \\   | \'_ \\   / _` |  / __| | \'_ \\   / _ \\');
    this.log('   / ___ \\  | |_) | | (_| | | (__  | | | | |  __/');
    this.log('  /_/   \\_\\ | .__/   \\__,_|  \\___| |_| |_|  \\___|');
    this.log('            |_|');

    this.log('                           ____                              _');
    this.log('                          / ___|   __ _   _ __ ___     ___  | |');
    this.log('                         | |      / _` | | \'_ ` _ \\   / _ \\ | |');
    this.log('                         | |___  | (_| | | | | | | | |  __/ | |');
    this.log('                          \\____|  \\__,_| |_| |_| |_|  \\___| |_|');
    this.log('');

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'App name: ',
      default: this.appname
    }, {
      type: 'input',
      name: 'package',
      message: 'Package name: ',
      default: 'com.' + this.appname
    }, {
      type: 'confirm',
      name: 'release',
      message: 'Use Maven Release Plugin?',
      default: false
    }, {
      type: 'input',
      name: 'releaseScmUrl',
      message: 'Project Git http url',
      default: 'http://localhost:8080/r/' + this.appname + '.git',
      when: function ( props ) {
        return props.release;
      }
    }, {
      type: 'input',
      name: 'releaseRepoUrl',
      message: 'Project Maven Repository Url)',
      default: 'http://localhost:8081/content/repositories/releases/',
      when: function ( props ) {
        return props.release;
      }
    }, {
      type: 'input',
      name: 'releaseScmServerId',
      message: 'Git Server ID in your maven settings.xml?',
      default: 'git',
      when: function ( props ) {
        return props.release;
      }
    }, {
      type: 'input',
      name: 'releaseRepoServerId',
      message: 'Maven Repo ID in your maven settings.xml',
      default: 'nexus2',
      when: function ( props ) {
        return props.release;
      }
    }];
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

      this.log('Copying dot files');
      this.fs.copy(
        this.templatePath('.*'),
        this.destinationRoot()
      );
    }
  },

  install: function () {
    // this.spawnCommandSync('mvn', ['package']);
  }
});
