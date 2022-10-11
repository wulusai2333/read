# postgresql
## 常用sql
[数据库几个重要视图,为优化指明方向](http://blog.itpub.net/31493717/viewspace-2643152/)
### 查询库使用空间
```sql 
select pg_size_pretty(pg_database_size('database_name')) as size; 
```
### docker-compose启动postgres容器
```bash
version: "3"
services:
 postgres:
   image: postgres:9.6
   container_name: pgsql
   restart: always
   environment:
     POSTGRES_DB: renren_fast
     POSTGRES_USER: postgres
     POSTGRES_PASSWORD: 123456
   ports:
       - 5432:5432
   volumes:
     - /data/postgresql/master:/var/lib/postgresql/data
 postgres2:
   image: postgres:9.6
   container_name: pgsql2
   restart: always
   environment:
     POSTGRES_DB: renren_fast
     POSTGRES_USER: postgres
     POSTGRES_PASSWORD: 123456
   ports:
       - 6432:5432
   volumes:
     - /data/postgresql/salve:/var/lib/postgresql/data

```
### 进入容器
```bash
docker exec -it  pgsql bash
```
### 登录postgres
```bash
su - posgtres

#登录
psql

#修改密码
\password

#此时要求输入两次密码
#退出
\q
```
### 创建新用户
```bash
CREATE USER dbuser WITH PASSWORD '*****';
CREATE DATABASE exampledb OWNER dbuser;
GRANT ALL PRIVILEGES ON DATABASE exampledb TO dbuser;
```
### 创建Linux普通用户登录数据库
```bash
sudo adduser dbuser
sudo passwd dbuser
su - dbuser
psql -d exampledb
```
### 赋予用户目录权限

```bash
 chown -R psbcjszj:psbcjszj /app
 
 ```
 
 ### 修改postgres端口
 
```bash
find -name postgresql.conf
在找到postgres安装目录的情况下
vi /var/lib/pgsql/10/data/postgresql.conf
sudo service postgresql restart
service postgresql-10.service restart
```