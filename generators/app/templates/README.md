<%= userProps.appName %>
=============

#### 1. Build the project

Generate the JAR package.

```bash
mvn package
```

Generate with the Docker image

***Depends on a docker running instance***

```bash
mvn package docker:build
```

#### 2. Running the project


Using maven

```bash
mvn spring-boot:run
```

As a docker container

```bash
docker run -t <%= userProps.appName %>
```

#### 3. Release (optional)

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
docker run -d --name nexus2 -p 8081:8081 -e MAX_HEAP=256m sonatype/nexus
```

Parar e inicicar o container

```bash
docker stop nexus2
docker stop gitlib
docker start nexus2
docker start gitlib
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
