
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
