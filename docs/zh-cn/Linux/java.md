
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