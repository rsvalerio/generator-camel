'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var basicProps = {};

describe('generator-camel:app', function () {

  before(function () {
    basicProps.appName = 'MyAppMock';
    basicProps.package = 'com.generator.mock';
    basicProps.packageFolder = 'com/generator/mock';
    basicProps.release = false;
  });

  describe('Should properly scaffold with default config', function () {

    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({ appName: basicProps.appName })
        .withPrompts({ package: basicProps.package })
        .withPrompts({ release: basicProps.release })
        .toPromise();
    });

    it('Should create the basic structure', function () {
      assert.file([
        '.gitignore',
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
      assert.noFileContent('pom.xml', new RegExp('<artifactId>maven-release-plugin</artifactId>') );
      assert.noFileContent('pom.xml', new RegExp('<scm>') );
      assert.noFileContent('pom.xml', new RegExp('<distributionManagement>') );
    });
  });

  describe('Should properly scaffold with release = true', function () {

    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({ appName: basicProps.appName })
        .withPrompts({ package: basicProps.package })
        .withPrompts({ release: true })
        .withPrompts({ releaseScmUrl: 'http://localhost:8080/r/hellodatarest.git' })
        .withPrompts({ releaseScmServerId: 'gitblit' })
        .withPrompts({ releaseRepoUrl: 'http://localhost:8081/content/repositories/releases/' })
        .withPrompts({ releaseRepoServerId: 'nexus2' })
        .toPromise();
    });

    it('Should create the basic structure', function () {
      assert.file([
        '.gitignore',
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
      assert.fileContent('pom.xml', new RegExp('<artifactId>maven-release-plugin</artifactId>') );
      assert.fileContent('pom.xml', new RegExp('<scm>') );
      assert.fileContent('pom.xml', new RegExp('<developerConnection>scm:git:http://localhost:8080/r/hellodatarest.git</developerConnection>') );
      assert.fileContent('pom.xml', new RegExp('<distributionManagement>') );
      assert.fileContent('pom.xml', new RegExp('<url>http://localhost:8081/content/repositories/releases/</url>') );
    });
  });
});
