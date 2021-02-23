
[源码下载](http://nginx.org/download/)

[RPM](http://nginx.org/packages/centos/7/x86_64/RPMS/)

[RPM文件下载网站](http://fr2.rpmfind.net/linux/rpm2html/search.php)
### rpm下载地址
[php-fpm](http://fr2.rpmfind.net/linux/openmandriva/4.2/repository/x86_64/main/release/php-fpm-8.0.2-1-omv4002.x86_64.rpm)
[openssl-devel](http://fr2.rpmfind.net/linux/fedora/linux/releases/33/Everything/x86_64/os/Packages/o/openssl-devel-1.1.1g-15.fc33.x86_64.rpm)
[openssl](http://fr2.rpmfind.net/linux/openmandriva/4.2/repository/x86_64/main/release/openssl-3.0.0-0.alpha11.1-omv4002.x86_64.rpm)
[zlib-devel](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/z/zlib-devel-1.2.11-24.fc34.x86_64.rpm)
[zlib](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/z/zlib-1.2.11-24.fc34.x86_64.rpm)
[pcre-devel](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/p/pcre-devel-8.44-3.fc34.1.x86_64.rpm)
[pcre](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/p/pcre-8.44-3.fc34.1.x86_64.rpm)
[gcc-c++](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/g/gcc-c++-11.0.0-0.19.fc35.x86_64.rpm)

### rpm安装软件
```bash
rpm -hvi *.rpm
```

zip解压
[unzip](http://fr2.rpmfind.net/linux/mageia/distrib/7/x86_64/media/core/updates/unzip-6.1c-3.1.mga7.x86_64.rpm)
###依赖安装
```bash
yum -y install gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel php-fpm
```

### 编译安装
```bash
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
make &&make install

```

### 环境变量配置
```bash
vi /etc/profile
export PATH=/usr/local/nginx/sbin/:$PATH
source /etc/profile
```

### 启动 重启 停止 检测配置文件

```bash

nginx -s reload

nginx -s stop

nginx -t


```


### nginx.pid

```bash
nginx -c /usr/local/nginx/conf/nginx.conf

```

### 查看nginx监听端口

```bash
ps aux | grep nginx
netstat -anp | grep nginx进程id
```