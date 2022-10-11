# [安装包网址](https://pkgs.org/)
搜索包示例 https://pkgs.org/search/?q=docker-ce
下载并且安装包
> rpm -ivh 安装包
```bash
wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm && rpm -ivh epel-release-6-8.noarch.rpm
```

Download ->Binary Package 下载二进制包

Requires 查找并下载所有依赖

## 使用yum下载rpm依赖
你需要安装几个rpm包，当时当你执行rpm -ivh *.rpm的时候，却提示需要一大堆依赖。
你被不允许配置yum源，你也不能一个一个去尝试包和包之间的依赖关系。
```bash
先在通互联网的机器上配置互联网yum源
再安装#yum -y install yum-util* 工具
缓存你需要安装的rpm，但是不安装，使用yum主要是自动解决依赖关系，把相关的依赖包一网打尽。
使用命令：
mkdir -p /tmp/yum
yum install <package name> --downloadonly --downloaddir=/tmp/yum
将需要的rpm包下载到/tmp/yum中，复制到你的环境中，使用
rpm -Uvh *
安装即可
```

##升级openssh
此篇配置不完整,升级后需要其他设置
[参考博客](https://www.ezeelogin.com/kb/article/how-to-upgrade-openssh-in-centos-331.html)
How to upgrade OpenSSH in Centos ? 

1. First you need to install few dependencies, like development tools or build essentials and the other required packages : 
root@localhost:~ yum groupinstall "Development Tools"
root@localhost:~ yum install zlib-devel openssl-devel
2.   Download the OpenSSH version 8.0 
root@localhost:~ wget -c https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-8.0p1.tar.gz
root@localhost:~ tar -xzf openssh-8.0p1.tar.gz
root@localhost:~ cd openssh-8.0p1/
3.  Install PAM and SELinux Headers
root@localhost:~ yum install pam-devel libselinux-devel
4.  Compile and install SSH from sources.
root@localhost:~ ./configure --with-md5-passwords --with-pam --with-selinux --with-privsep-path=/var/lib/sshd/ --sysconfdir=/etc/ssh
root@localhost:~ make
root@localhost:~ make install
5.    Once you have installed OpenSSH, restart SSH and check the version of OpenSSH
root@localhost:~ ssh -V
OpenSSH_8.0p1, OpenSSL 1.1.0g