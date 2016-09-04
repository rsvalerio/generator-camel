'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var basicProps = {};
var basicOpts = {};

describe('generator-camel:app', function () {

  before(function () {
    basicProps.appName = 'MyAppMock';
    basicProps.package = 'com.generator.mock';
    basicProps.packageFolder = 'com/generator/mock';
    basicProps.docker = true;
    basicOpts.springBootVersion = '1.0.0';
    basicOpts.camelSpringBootVersion = '2.0.0';
    basicOpts.dockerMavenPluginVersion = '5.0.0';
  });

  describe('Should properly scaffold with default config', function () {

    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({ appName: basicProps.appName })
        .withPrompts({ package: basicProps.package })
        .withPrompts({ docker: basicProps.docker })
        .withOptions({ springBootVersion: basicOpts.springBootVersion })
        .withOptions({ camelSpringBootVersion: basicOpts.camelSpringBootVersion })
        .withOptions({ dockerMavenPluginVersion: basicOpts.dockerMavenPluginVersion })
        .toPromise();
    });

    it('Should create the basic structure', function () {
      assert.file([
        'pom.xml',
        'README.md',
        'src/main/java/' + basicProps.packageFolder + '/beans/MyBean.java',
        'src/main/java/' + basicProps.packageFolder + '/routes/AppBootstrapRouter.java',
        'src/main/java/' + basicProps.packageFolder + '/routes/MyRouter.java',
        'src/main/resources/application.yml'
      ]);
    });

    it('Should create pom.xml with default content', function () {
      assert.fileContent('pom.xml', new RegExp('<groupId>' + basicProps.package + '</groupId>') );
      assert.fileContent('pom.xml', new RegExp('<artifactId>' + basicProps.appName + '</artifactId>') );
      assert.fileContent('pom.xml', new RegExp('<spring.boot.version>' + basicOpts.springBootVersion + '</spring.boot.version>') );
      assert.fileContent('pom.xml', new RegExp('<camel.spring.boot.version>' + basicOpts.camelSpringBootVersion + '</camel.spring.boot.version>') );
      assert.fileContent('pom.xml', new RegExp('<docker.maven.plugin.version>' + basicOpts.dockerMavenPluginVersion + '</docker.maven.plugin.version>') );
    });
  });

});
