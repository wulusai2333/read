## 制作openssh的rpm包
需求背景:安全扫描出生产机器openssh版本过旧,存在许多安全漏洞,这些漏洞在最新版本已经修复,需要在无外部网络的条件下升级openssh.
并且openssh为连接主机的工具,可能存在升级失败导致主机失联的风险
[rpm打包脚本制作参考](https://blog.csdn.net/michaelwoshi/article/details/94280798)
[openssh9.0下载地址](https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-9.0p1.tar.gz)
[x11镜像地址](https://mirrors.slackware.com/slackware/slackware-14.2/source/xap/x11-ssh-askpass/x11-ssh-askpass-1.2.4.1.tar.gz.mirrorlist)
[x11-ssh-askpass-1.2.4.1.tar.gz下载](https://mirrors.slackware.com/slackware/slackware-14.2/source/xap/x11-ssh-askpass/x11-ssh-askpass-1.2.4.1.tar.gz)
```bash
#安装依赖 
yum -y install  vim  wget epel-release

yum  -y  install  rpm-build  gcc make

yum -y install  openssl  openssl-devel krb5-devel pam-devel libX11-devel xmkmf libXt-devel 
yum -y install gtk2-devel
#下载tar包,准备好rpm工作文件夹
wget https://ftp.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-9.0p1.tar.gz --no-check-certificate
tar -zxf openssh-9.0p1.tar.gz
mkdir -p  /root/rpmbuild/{SOURCES,SPECS}
cp ./openssh-9.0p1/contrib/redhat/openssh.spec    /root/rpmbuild/SPECS/
cp openssh-9.0p1    /root/rpmbuild/SOURCES/
cd  /root/rpmbuild/SPECS/
#更改配置参数 低版本 global可能是define，需要修改
sed  -i  -e  "s/%global no_gnome_askpass 0/%global no_gnome_askpass 1/g"    openssh.spec
sed  -i  -e  "s/%global no_x11_askpass 0/%global no_x11_askpass 1/g"    openssh.spec
sed  -i  -e  "s/BuildPreReq/BuildRequires/g"    openssh.spec
sed -i  -e  "s/BuildRequires: openssl-devel < 1.1/#BuildRequires: openssl-devel < 1.1/g" openssh.spec

#编译
rpmbuild  -bb  openssh.spec

ll  /root/rpmbuild/RPMS/x86_64
```
### 脚本化操作
```bash
#!/bin/bash

OPENSSH_VERSION=9.0p1
OPENSSH_TAR_GZ=openssh-${OPENSSH_VERSION}.tar.gz

yum -y install  vim  wget epel-release
yum -y install  rpm-build  gcc make
yum -y install  openssl  openssl-devel krb5-devel pam-devel libX11-devel xmkmf libXt-devel
yum -y install gtk2-devel
echo "rpm build dependencies install finish"

if [ ! -d "/root" ]; then
  mkdir /root
fi
cd /root
if [ ! -f "$OPENSSH_TAR_GZ" ]; then
  wget https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-${OPENSSH_VERSION}.tar.gz --no-check-certificate
  echo "${OPENSSH_TAR_GZ} download success"
  wget https://mirrors.slackware.com/slackware/slackware-14.2/source/xap/x11-ssh-askpass/x11-ssh-askpass-1.2.4.1.tar.gz --no-check-certificate
fi
echo "prepare files"
tar -zxf  openssh-${OPENSSH_VERSION}.tar.gz
mkdir -p /root/rpmbuild/{SOURCES,SPECS}
cp openssh-${OPENSSH_VERSION}/contrib/redhat/openssh.spec /root/rpmbuild/SPECS/
cp openssh-${OPENSSH_VERSION}.tar.gz /root/rpmbuild/SOURCES/
cp x11-ssh-askpass-1.2.4.1.tar.gz /root/rpmbuild/SOURCES/
cd /root/rpmbuild/SPECS/

echo "modify openssh.spec"
sed -i -e "s/%global no_gnome_askpass 0/%global no_gnome_askpass 1/g" openssh.spec
sed -i -e "s/%global no_x11_askpass 0/%global no_x11_askpass 1/g" openssh.spec
sed -i -e "s/BuildPreReq/BuildRequires/g" openssh.spec
sed -i -e  "s/BuildRequires: openssl-devel < 1.1/#BuildRequires: openssl-devel < 1.1/g" openssh.spec
echo "modify openssh.spec end"

echo "start rpmbuild"
rpmbuild -bb openssh.spec 
ls -l /root/rpmbuild/RPMS/x86_64
echo "end rpmbuild"
```
默认的 host key 文件授权太大，需要修改 key 文件的权限
```bash
#将644的文件授权改为600
ll  /etc/ssh/ssh_host_*_key
chmod 600  /etc/ssh/ssh_host_*_key
ll /etc/ssh/ssh_host_*_key
```

使用rpm
```bash
cd  /root/rpmbuild/RPMS/x86_64
rpm -Uvh *.rpm
rpm -qa | grep openssh
```
### 升级完成后默认不允许密码登录方式,改配置文件
```bash
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

sed -i -e  "s/#PasswordAuthentication yes/PasswordAuthentication yes/g"  /etc/ssh/sshd_config
sed -i -e  "s/#PermitRootLogin prohibit-password/PermitRootLogin yes/g"    /etc/ssh/sshd_config
sed -i -e  "s/#PermitEmptyPasswords no/PermitEmptyPasswords no/g"  /etc/ssh/sshd_config
sed -i -e  "s/#UsePAM no/UsePAM yes/g"  /etc/ssh/sshd_config

```
### 默认的 /etc/pam.d/sshd 中使用了过时的 pam_stack.so 动态库，需要更新
```bash
cp /etc/pam.d/sshd /etc/pam.d/sshd.bak

cat >  /etc/pam.d/sshd  <<EOF

#%PAM-1.0

auth required pam_sepermit.so

auth include password-auth

account required pam_nologin.so

account include password-auth

password include password-auth

# pam_selinux.so close should be the first session rule

session required pam_selinux.so close

session required pam_loginuid.so

# pam_selinux.so open should only be followed by sessions to be executed in the user context

session required pam_selinux.so open env_params

session optional pam_keyinit.so force revoke

session include password-auth

EOF
```
### 重启服务
```bash
systemctl restart sshd
systemctl enable  sshd
systemctl status sshd

cp /root/openssh-9.0p1/contrib/ssh-copy-id  /usr/bin/
chmod  755  /usr/bin/ssh-copy-id
```
### 制作离线安装包
```bash
yum -y install  yum-utils createrepo
mkdir  /root/localrepo
repotrack  openssl  -p /root/localrepo/
cp  /root/rpmbuild/RPMS/x86_64/*.rpm  /root/localrepo
createrepo -v    /root/localrepo
```
### 离线安装脚本
1.脚本先备份了yum的repos,再创建localrepo,使用localrepo安装 openssl openssh
2.安装完成后再恢复repos
3.sshd_config的一些修改
4.重启openssh
```bash
#!/bin/bash

# 定位脚本当前路径

parent_path=$( cd "$(dirname "${BASH_SOURCE}")"; pwd -P )

cd "$parent_path"
echo "current path is ${parent_path}"
mkdir -p /etc/yum.repos.d/backup

mv /etc/yum.repos.d/*.repo  /etc/yum.repos.d/backup

rm -rf /tmp/localrepo

mkdir -p /tmp/localrepo

cp -rf  ./localrepo/*  /tmp/localrepo

echo "[localrepo]"                              > /etc/yum.repos.d/localrepo.repo

echo "name=Local Repository"          >> /etc/yum.repos.d/localrepo.repo

echo "baseurl=file:///tmp/localrepo"    >> /etc/yum.repos.d/localrepo.repo

echo "gpgcheck=0"                              >> /etc/yum.repos.d/localrepo.repo

echo "enabled=1"                                >> /etc/yum.repos.d/localrepo.repo

yum clean all

yum -y  install openssl

yum -y install openssh*  --disablerepo="*" --enablerepo="localrepo"

rm -rf /tmp/localrepo

rm -f /etc/yum.repos.d/localrepo.repo

mv /etc/yum.repos.d/backup/*.repo  /etc/yum.repos.d

rm -rf /etc/yum.repos.d/backup

chmod 600  /etc/ssh/ssh_host_*_key

# modify /etc/ssh/sshd_config

cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

sed -i -e "s/#PasswordAuthentication yes/PasswordAuthentication yes/g" /etc/ssh/sshd_config

sed -i -e "s/#PermitRootLogin prohibit-password/PermitRootLogin yes/g" /etc/ssh/sshd_config

sed -i -e "s/#PermitEmptyPasswords no/PermitEmptyPasswords no/g"      /etc/ssh/sshd_config

sed -i -e "s/#UsePAM no/UsePAM yes/g"                                  /etc/ssh/sshd_config

# modify /etc/pam.d/sshd

cp /etc/pam.d/sshd /etc/pam.d/sshd.bak

cat > /etc/pam.d/sshd <<EOF

#%PAM-1.0

auth required pam_sepermit.so

auth include password-auth

account required pam_nologin.so

account include password-auth

password include password-auth

# pam_selinux.so close should be the first session rule

session required pam_selinux.so close

session required pam_loginuid.so

# pam_selinux.so open should only be followed by sessions to be executed in the user context

session required pam_selinux.so open env_params

session optional pam_keyinit.so force revoke

session include password-auth

EOF

# copy ssh-copy-id

cp ssh-copy-id /usr/bin

chmod 755 /usr/bin/ssh-copy-id

systemctl restart sshd

systemctl enable sshd

systemctl status sshd

rpm -qa | grep open

systemctl status  sshd| grep  "Active: active (running)"

if [ $? -eq 0 ]; then

  echo -e "\033[32m[INFO] OpenSSH upgraded to 9.0  successfully！\033[0m"

else

  echo -e "\033[31m[ERROR] OpenSSH upgraded to 9.0p1 faild！\033[0m"

fi

```

### 打包离线安装包
```bash
mkdir  /root/opensshUpgrade
cp install.sh  /root/opensshUpgrade
cp  -r  localrepo /root/opensshUpgrade
cp /root/openssh-9.0p1/contrib/ssh-copy-id  /root/opensshUpgrade
tar -czf opensshUpgrade.tar.gz  opensshUpgrade

```
### 在服务器升级
```bash
tar  -zxf  opensshUpgrade.tar.gz
cd  opensshUpgrade
bash install.sh | tee install.log
```