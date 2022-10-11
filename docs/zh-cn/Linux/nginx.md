
[菜鸟教程](https://www.runoob.com/w3cnote/nginx-setup-intro.html) 大概的讲解了配置文件和常用参数意义

### RPM

[源码下载](http://nginx.org/download/)

[RPM](http://nginx.org/packages/centos/7/x86_64/RPMS/)

[RPM文件下载网站](http://fr2.rpmfind.net/linux/rpm2html/search.php)
#### rpm下载地址
[php-fpm](http://fr2.rpmfind.net/linux/openmandriva/4.2/repository/x86_64/main/release/php-fpm-8.0.2-1-omv4002.x86_64.rpm)
[openssl-devel](http://fr2.rpmfind.net/linux/fedora/linux/releases/33/Everything/x86_64/os/Packages/o/openssl-devel-1.1.1g-15.fc33.x86_64.rpm)
[openssl](http://fr2.rpmfind.net/linux/openmandriva/4.2/repository/x86_64/main/release/openssl-3.0.0-0.alpha11.1-omv4002.x86_64.rpm)
[zlib-devel](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/z/zlib-devel-1.2.11-24.fc34.x86_64.rpm)
[zlib](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/z/zlib-1.2.11-24.fc34.x86_64.rpm)
[pcre-devel](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/p/pcre-devel-8.44-3.fc34.1.x86_64.rpm)
[pcre](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/p/pcre-8.44-3.fc34.1.x86_64.rpm)
[gcc-c++](http://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/x86_64/os/Packages/g/gcc-c++-11.0.0-0.19.fc35.x86_64.rpm)

#### rpm安装软件

```bash
rpm -hvi *.rpm
```

zip解压
[unzip](http://fr2.rpmfind.net/linux/mageia/distrib/7/x86_64/media/core/updates/unzip-6.1c-3.1.mga7.x86_64.rpm)
### 依赖安装
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

### nginx负载均衡配置

[一篇博客](https://www.cnblogs.com/1214804270hacker/p/9325150.html)
#### 权重 weight
```bash

    upstream dynamic_zuoyu {
        server localhost:8080 weight=2;  #权重 默认为1 数字表示选择的概率倍数
        server localhost:8081 backup;  #备用
        server localhost:8082 max_fails=3 fail_timeout=20s;  #20s内失败3次认为该服务器停机了
        server localhost:8083 down;  #认为停机了
    }
	server {
		listen 80 ;
		server_name localhost;
		#其他页面反向代理到tomcat容器
        location ~ .*$ {
            index index.jsp index.html;
            proxy_pass http://dynamic_zuoyu;
        }
	}
```
#### ip_hash
不能与 backup同时使用
```bash
    upstream dynamic_zuoyu {
        ip_hash;    #保证每个访客固定访问一个后端服务器
        server localhost:8080   weight=2;  #tomcat 7.0
        server localhost:8081;  #tomcat 8.0
    }
```
#### least_conn
平衡连接数
```bash
    upstream dynamic_zuoyu {
        least_conn;    #把请求转发给连接数较少的后端服务器
        server localhost:8080   weight=2;  #tomcat 7.0
        server localhost:8081;  #tomcat 8.0
    }
```
#### fair
响应时间分配
```bash
    upstream dynamic_zuoyu {
        server localhost:8080   weight=2;  #tomcat 7.0
        server localhost:8081;  #tomcat 8.0
		fair;    #实现响应时间短的优先分配
    }
```
#### url_hash
按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，要配合缓存命中来使用
```bash
    upstream dynamic_zuoyu {
            hash $request_uri;    #实现每个url定向到同一个后端服务器
            server localhost:8080;  #tomcat 7.0
            server localhost:8081;  #tomcat 8.0
    }
```

### location正则匹配
[一篇博客](https://www.cnblogs.com/duhuo/p/8323812.html) 


- =     严格匹配。如果请求匹配这个location，那么将停止搜索并立即处理此请求
- ~     区分大小写匹配(可用正则表达式)
- ~*    不区分大小写匹配(可用正则表达式)
- !~    区分大小写不匹配
- !~*   不区分大小写不匹配
- ^~    如果把这个前缀用于一个常规字符串,那么告诉nginx 如果路径匹配那么不测试正则表达式


```bash
location [=|~|~*|^~] /uri/ { … }

location  / { } #匹配任意请求

location ~* .(gif|jpg|jpeg)$ ｛
    rewrite .(gif|jpg|jpeg)$ /logo.png;
｝#不区分大小写匹配任何以gif、jpg、jpeg结尾的请求，并将该请求重定向到 /logo.png请求

location ~ ^.+\.txt$ {
    root /usr/local/nginx/html/;
} #区分大小写匹配以.txt结尾的请求将访问/usr/local/nginx/html/ 路径下的txt文件


```
#### alias 与 root
alias去掉了请求的路径,只保留文件名
```bash
#请求：http://test.com/sta/  sta1.html
#实际访问：/usr/local/nginx/html/static/  sta1.html 文件
location ^~ /sta/ {  
   alias /usr/local/nginx/html/static/;  
}

#请求：http://test.com/  tea/tea1.html
#实际访问：/usr/local/nginx/html/  tea/tea1.html 文件
location ^~ /tea/ {  
   root /usr/local/nginx/html/;  
}
```
#### last 和 break

（1）last 和 break 当出现在location 之外时，两者的作用是一致的没有任何差异

（2）last 和 break 当出现在location 内部时：

- last        使用了last 指令，rewrite 后会跳出location 作用域，重新开始再走一次刚才的行为
- break    使用了break 指令，rewrite后不会跳出location 作用域，它的生命也在这个location中终结


#### permanent 和 redirect

- rewrite … permanent   永久性重定向，请求日志中的状态码为301
- rewrite … redirect    临时重定向，请求日志中的状态码为302


## 配置https

[openssl生成证书](https://www.huaweicloud.com/articles/54031e9ed6adeec67c026871bb33d6a2.html)

[查看和验证证书信息](https://www.jianshu.com/p/f5f93c89155e)

```bash
检查tls版本
 openssl s_client -connect www.google.com:443
```
## http请求跳转https
[同server监听多端口](https://www.cnblogs.com/digdeep/p/12617075.html)
```bash
error_page  497  https://$host:端口$uri;
```

### nginx平滑升级
[平滑升级](https://zhuanlan.zhihu.com/p/193078620)
或者直接升级
1. 先确定nginx的安装位置
```bash
whereis nginx
find / -name nginx
```
2. 查看现有的nginx编译参数
```bash
/usr/local/nginx/sbin/nginx -V

```
3. 根据configure参数调整和 make
> nginx version: nginx/1.16.1
> built by gcc 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC) 
> built with OpenSSL 1.0.2k-fips  26 Jan 2017
> TLS SNI support enabled
> configure arguments: --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
> 
4. nginx源码下载和编译
```bash
wget http://nginx.org/download/nginx-1.23.1.tar.gz
tar -zxf nginx-1.23.1.tar.gz
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
make
```
5. 备份和替换
```bash
mv /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx_$(date +%F)
cp ./objs/nginx /usr/local/nginx/sbin/
/usr/local/nginx/sbin/nginx -t
```
6. 重启服务
```bash
#如果nginx.pid正常运作
nginx -s restart

#如果需要停止并启动新服务
nginx -s stop
/usr/local/nginx/sbin/nginx
```