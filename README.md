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


```bash
mvn package docker:build
```

#### 4. Running the project


Using maven

```bash
mvn spring-boot:run
```

As a docker container

```bash
docker run -t <%= userProps.appName %>
```

#### 5. Release (optional)

1 - Initialize local git repository and do the first commit, at project root directory

```bash
git init
git add .
git commit -am'Initial commit'
```

2 - Start a local maven and git servers using docker-compose.

```bash
cd src/main/docker/ci
docker-compose up -d
```

3 - Create the remote source code repository 

```bash
docker-compose exec --user gitblit gitblit git init /opt/gitblit-data/git/<%= userProps.appName %>.git --bare
```

4 - Doing a simple release (will ask for release versions information)

```bash
mvn release:prepare
mvn release:perform
```

[Maven Release Plugin](http://maven.apache.org/maven-release/maven-release-plugin/) use <servers> tag in settings.xml as credentials to authenticate on each server, SCM repository and maven repository server e.g.

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

With maven 3.2.1+, the password can be encrypted as. Details [here](https://maven.apache.org/guides/mini/guide-encryption.html).

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
