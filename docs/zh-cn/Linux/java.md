
[下载地址](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html) 


### 解压
```bash
tar -zxvf jdk1.8.tar.gz
mv jdk1.8 /usr/local/java
```

### 配置环境变量
```bash
vi /etc/profile
export JAVA_HOME=/usr/local/java
export PATH=$JAVA_HOME/bin/:$PATH
source /etc/profile
```

### jar包的解压与压缩

```bash
#解压jar包内的文件到当前目录
jar -xvf xxx.jar 
#将当前目录下的所有文件打成jar包，jar包名为xxx.jar
jar -cvf xxx.jar ./
```
### 打印maven依赖树
```bash
mvn dependency:tree > tree.log
```

### maven配置本地仓库
> project.basedir 就是项目的根目录
```xml
<repository>
    <id>in-project</id>
    <name>In Project Repo</name>
    <url>file:///${project.basedir}/libs</url>
</repository>

<dependency>
    <groupId>dropbox</groupId>
    <artifactId>dropbox-sdk</artifactId>
    <version>1.3.1</version>
</dependency>

```