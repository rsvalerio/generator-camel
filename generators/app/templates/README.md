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
