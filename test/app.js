'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-camel:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appName: 'MyAppMock'})
      .withPrompts({package: 'com.rsvalerio.mock'})
      .withOptions({springBootVersion: '1.0.0'})
      .withOptions({camelSpringBootVersion: '2.0.0'})
      .toPromise();
  });

  it('Copy all the files', function () {
    assert.file([
      'pom.xml',
      'README.md',
      'src/main/java/com/rsvalerio/mock/beans/MyBean.java',
      'src/main/java/com/rsvalerio/mock/routes/MyRouter.java',
      'src/main/resources/application.yml'
    ]);
  });
  it('Configure pom.xml', function () {
    assert.noFileContent('pom.xml', /<%=/);
    assert.fileContent('pom.xml', /<groupId>com.rsvalerio.mock<\/groupId>/);
    assert.fileContent('pom.xml', /<artifactId>MyAppMock<\/artifactId>/);
    assert.fileContent('pom.xml', /<spring.boot.version>1.0.0<\/spring.boot.version>/);
    assert.fileContent('pom.xml', /<camel.spring.boot.version>2.0.0<\/camel.spring.boot.version>/);
  });
});
