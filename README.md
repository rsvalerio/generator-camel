[![NPM version][npm-image]][npm-url] [![Travis Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]

# Apache Camel with Spring Boot yeoman generator

 * Brings SpringBoot auto-configuration to Apache Camel
 * Auto-detection and spring context registration of producers templates, consumer templates and type converter, thanks to [Camel Spring Boot](http://camel.apache.org/spring-boot.html) component.
 * Generates an executable jar that can be easily started as Unix/Linux services using either init.d or systemd, thansk to [Spring Boot Maven Plugin](http://docs.spring.io/spring-boot/docs/1.4.0.RELEASE/maven-plugin/index.html).
 * Easy creation of docker image for the aplication, using spotify provided [Docker Maven Plugin](https://github.com/spotify/docker-maven-plugin)


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
 - [Docker](https://docs.docker.com/engine/installation/)
```bash
brew install maven
```

## Usage

#### 1. Create new project:

```bash
mkdir myproject
cd myproject
yo camel
```

#### 2. Build the project

Depends on maven

```bash
mvn package
```

#### 3. Build the project and generate docker image

Depends on maven AND a running docker instance

```bash
mvn package docker:build
```

#### 4. Running project using maven plugin

```bash
mvn spring-boot:run
```

#### 5. Running project as docker container

```bash
docker run -t springio/gs-spring-boot-docker

```

## Project structure
```bash

├── README.md                                          Project Readme file
├── pom.xml                                            Maven Project Object Model file
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── conferencia_produto_util
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

## Working with the project locally

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