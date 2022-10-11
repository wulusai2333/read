
[github地址](https://github.com/1995chen/dnf)
# 准备工作
> centos 7.5及以上系统主机,内存最好大于8G,否则需要设置SWAP虚拟内存
> dnf台服客户端
> 网关文件
> 网关文件补丁覆盖到客户端文件夹内
> docker
> ssh登录工具
> 
# 服务端搭建
## 创建数据库
```bash
mkdir /dnf

docker run --rm -v /dnf/log:/home/neople/game/log -v /dnf/mysql:/var/lib/mysql -v /dnf/data:/data 1995chen/dnf:stable /bin/bash /home/template/init/init.sh
```

## 搭建服务器端
>  PUBLIC_IP 为公网ip
>  -e 参数可以自行设置数据库账号密码
> -v 参数可以自行设置数据库等位置
```bash
docker run -d -e PUBLIC_IP=192.168.28.200 -e DNF_DB_ROOT_PASSWORD=88888888 -e GM_ACCOUNT=gmuser -e GM_PASSWORD=gmpass -v /data/log:/home/neople/game/log -v /data/mysql:/var/lib/mysql -v /data/data:/data -p 3000:3306/tcp -p 7600:7600/tcp -p 881:881/tcp -p 20303:20303/tcp -p 20303:20303/udp -p 20403:20403/tcp -p 20403:20403/udp -p 40403:40403/tcp -p 40403:40403/udp -p 7000:7000/tcp -p 7000:7000/udp -p 7001:7001/tcp -p 7001:7001/udp -p 7200:7200/tcp -p 7200:7200/udp -p 10011:10011/tcp -p 31100:31100/tcp -p 30303:30303/tcp -p 30303:30303/udp -p 30403:30403/tcp -p 30403:30403/udp -p 10052:10052/tcp -p 20011:20011/tcp -p 20203:20203/tcp -p 20203:20203/udp -p 30703:30703/udp -p 11011:11011/udp -p 2311-2313:2311-2313/udp -p 30503:30503/udp -p 11052:11052/udp --cpus=1 --memory=8g --memory-swap=-1 --shm-size=8g --name=dnf 1995chen/dnf:centos6-2.0.2

docker ps
```
查看执行结果`grep -rHi 'GeoIP Allow Country Code' /dnf/log`
# 客户端准备
打开前面下载的统一网关，点到第二项，把你的服务器地址填上，如果你上面没有修改 Docker 参数的话，可以直接抄我的作业（IP 除外）。确保服务器防火墙放行了对应端口和所有参数都填好了以后点击一下连接。
网关地址: 前面填的PUBLIC_IP

通讯密钥: 763WXRBW3PFTC3IXPFWH

登录器端口: 7600

网关端口：881

GM账户: gm_user

GM密码: gm_pass

登陆器版本：20180307