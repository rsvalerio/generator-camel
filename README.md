[![NPM version][npm-image]][npm-url] [![Travis Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]

# Apache Camel + Spring Boot + Docker project generator

 * Brings SpringBoot auto-configuration to Apache Camel
 * Auto-detection and spring context registration of producers templates, consumer templates and type converter, thanks to [Camel Spring Boot](http://camel.apache.org/spring-boot.html) component.
 * Generates an executable jar that can be easily started as Unix/Linux services using either init.d or systemd, thanks to [Spring Boot Maven Plugin](http://docs.spring.io/spring-boot/docs/1.4.0.RELEASE/maven-plugin/index.html).
 * Easy creation of docker image for the application, using spotify provided [Docker Maven Plugin](https://github.com/spotify/docker-maven-plugin)


## Installation

#### To generate a new project, we assume you have pre-installed

 - [Node.js](https://nodejs.org/)

```bash
brew install nodejs
``` 

 - [Yeoman](http://yeoman.io)

```bash
npm install -g yeoman
```

 - [Camel Generator](https://github.com/rsvalerio/generator-camel)

```bash
npm install -g generator-camel
```

#### To build the generated project, we assume you have pre-installed
 - [Maven](http://maven.apache.org/)

```bash
brew install maven
```

 - Docker - [Installation](https://docs.docker.com/engine/installation/)


## Usage

#### 1. Create new project:

```bash
mkdir myproject
cd myproject
yo camel
```

#### 2. Project structure

```bash
├── README.md                                          Project Readme file
├── pom.xml                                            Maven Project Object Model file
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── yourpackage
    │   │           ├── beans
    │   │           │   └── MyBean.java               Camel Bean Example
    │   │           └── routes
    │   │               ├── AppBootstrapRouter.java   Bootstrap the app
    │   │               └── MyRouter.java             Camel Route Example
    │   └── resources
    │       └── application.yml                       Properties (application.properties) file
    └── test
        ├── java
        └── resources
```

#### 3. Build the project

Generate the JAR package.

```bash
mvn package
```

Generate with the Docker image

***Depends on a docker running instance***

```bash
mvn package docker:build
```

#### 4. Running the project


Using maven

```bash
mvn spring-boot:run
```

As a docker container

***App name is used to name docker image***

```bash
docker run -t your_app
```

#### 5. Release (optional)

 * Doing a simple release (will ask for release versions information)
```bash
mvn release:prepare
mvn release:perform
```

 * We need a source code repository ([gitblit](http://gitblit.com/) git) and binary repository ([nexus](https://www.sonatype.com/nexus-repository-oss) maven).

 * If you don't have the necessary repos, just start a nexus and a gitblit docker container to see releases working

Running a local, ephemeral gitblit git server

*** Don't forget to create a remote git repo, add it as a remote and do the first commit, before release ***

```bash
docker run -d --name=gitblit -p 8080:8080 -p 8443:8443 -p 9418:9418 -p 29418:29418 jacekkow/gitblit //source code repo
```

Running a local, ephemeral nexus2 maven repo server
```bash
docker run -d -p 8081:8081 --name nexus2 -e MAX_HEAP=256m sonatype/nexus
```

 * [Maven Release Plugin](http://maven.apache.org/maven-release/maven-release-plugin/) use <servers> tag in settings.xml as credentials to authenticate on each server, SCM repository and maven repository server e.g.

```xml
	<servers>
		<server>
			<id>gitblit</id>
			<username>admin</username>
			<password>admin</password>
		</server>
		<server>
			<id>nexus</id>
			<username>admin</username>
			<password>admin123</password>
		</server>
	</servers>
```

 * With maven 3.2.1+, the password can be encrypted as. Details [here](https://maven.apache.org/guides/mini/guide-encryption.html).

```bash
mvn --encrypt-master-password
mvn --encrypt-password
```


## Building this generator

#### Install dependencies
```bash
npm install
```

#### Build
```bash
gulp
```

#### Test
```bash
gulp test
```



## License

Apache-2.0 © [Rodrigo Valerio]()


[npm-image]: https://badge.fury.io/js/generator-camel.svg
[npm-url]: https://npmjs.org/package/generator-camel

[travis-image]: https://travis-ci.org/rsvalerio/generator-camel.svg?branch=master
[travis-url]: https://travis-ci.org/rsvalerio/generator-camel

[daviddm-image]: https://david-dm.org/rsvalerio/generator-camel.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/rsvalerio/generator-camel

[coveralls-image]: https://coveralls.io/repos/github/rsvalerio/generator-camel/badge.png
[coveralls-url]: https://coveralls.io/github/rsvalerio/generator-camel