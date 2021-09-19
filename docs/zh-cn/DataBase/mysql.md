# windows10下安装
[菜鸟教程](https://www.runoob.com/mysql/mysql-install.html)
[官网下载安装包](https://dev.mysql.com/downloads/mysql/)
Windows (x86, 64-bit), ZIP Archive

## 初始化配置
`my.ini`配置文件
```bash 
[client]
# 设置mysql客户端默认字符集
default-character-set=utf8
 
[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=D:\\soft\\mysql-8.0.26-winx64
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
# datadir=C:\\web\\sqldata
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

## 安装
> 需要在管理员模式下运行cmd 

需要注意 windows10 进入目录命令为`cd /d 目录路径`,在错误的目录下执行安装命令会导致服务启动失败;

`mysqld --initialize --console`初始化配置;

`mysqld install`安装服务;

`net start mysql`启动服务;

安装失败可以执行`mysqld --remove`卸载安装,如果需要重设配置则删除`data`文件夹内容重新执行`mysqld --initialize --console`.
`net start mysql`执行找不到服务多半是没有在指定目录下安装导致的,
如果多次操作失误导致卸载命令失效可以`sc delete MySQL`删除服务然后重新安装;

`mysql -u root -p` 登录,需要初始化时生成的密码`ag9UZzGR&boe`;

`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456'`修改密码为123456;

```bash 
C:\Windows\system32>cd /d d:

D:\>cd /d D:\soft\mysql-8.0.26-winx64\bin

D:\soft\mysql-8.0.26-winx64\bin>mysqld --initialize --console
2021-09-02T01:59:20.020204Z 0 [System] [MY-013169] [Server] D:\soft\mysql-8.0.26-winx64\bin\mysqld.exe (mysqld 8.0.26) initializing of server in progress as process 40196
2021-09-02T01:59:20.021027Z 0 [Warning] [MY-013242] [Server] --character-set-server: 'utf8' is currently an alias for the character set UTF8MB3, but will be an alias for UTF8MB4 in a future release. Please consider using UTF8MB4 in order to be unambiguous.
2021-09-02T01:59:20.036345Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2021-09-02T01:59:20.392541Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2021-09-02T01:59:21.594983Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
2021-09-02T01:59:21.595569Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
2021-09-02T01:59:21.958565Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: ag9UZzGR&boe

D:\soft\mysql-8.0.26-winx64\bin>mysqld install
Service successfully installed.

D:\soft\mysql-8.0.26-winx64\bin>net start mysql
MySQL 服务正在启动 .
MySQL 服务已经启动成功。


D:\soft\mysql-8.0.26-winx64\bin>mysql -u root -p
Enter password: ************
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.26

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
Query OK, 0 rows affected (0.02 sec)

mysql>
```

> mysqld --remove
> mysqld --install
> net start mysql 

## 基本操作命令

```sql
-- 登录数据库
mysql -u root -p
-- 数据库列表
show databases;
-- 使用数据库
use mysql;
-- 数据库表列表
show tables;
```
看到默认初始化了mysql数据库，其中user表里面存储MySQL用户信息。我们可以看一下默认MySQL用户：

```sql 
select user,host,authentication_string from mysql.user;
```
管理员root的host是localhost，代表仅限localhost登录访问。如果要允许开放其他ip登录，则需要添加新的host。如果要允许所有ip访问，可以直接修改成“%”

```sql
-- 创建用户
CREATE USER 'xxh'@'%' IDENTIFIED WITH mysql_native_password BY 'xxh123!@#';
--(需要注意：mysql8.0加密方式修改了)
--检查用户
select user, host, plugin, authentication_string from user\G;
```

授权远程数据库
 
```sql
--授权所有权限
GRANT ALL PRIVILEGES ON *.* TO 'xxh'@'%'；
--授权基本的查询修改权限，按需求设置
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER ON *.* TO 'xxh'@'%';
--查看用户权限
show grants for 'xxh'@'%';
--查看密码加密方式
select user, host, plugin, authentication_string from user;
```
另外，如果需要新增账户，或者本机以外的其他人访问MySQL则还需要设置内置账户的host，具体可以参考：[MySQL创建用户与授权](https://www.cnblogs.com/sos-blue/p/6852945.html)

## 创建用户
```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';

```

username：你将创建的用户名
host：指定该用户在哪个主机上可以登陆，如果是本地用户可用localhost，如果想让该用户可以从任意远程主机登陆，可以使用通配符`%`
password：该用户的登陆密码，密码可以为空，如果为空则该用户可以不需要密码登陆服务器

```sql
CREATE USER 'dog'@'localhost' IDENTIFIED BY '123456';
CREATE USER 'pig'@'192.168.1.101_' IDENDIFIED BY '123456';
CREATE USER 'pig'@'%' IDENTIFIED BY '123456';
CREATE USER 'pig'@'%' IDENTIFIED BY '';
CREATE USER 'pig'@'%';
```

## 授权

```sql
GRANT privileges ON databasename.tablename TO 'username'@'host'
```
privileges：用户的操作权限，如SELECT，INSERT，UPDATE等，如果要授予所的权限则使用ALL
databasename：数据库名
tablename：表名，如果要授予该用户对所有数据库和表的相应操作权限则可用*表示，如*.*

```sql
GRANT SELECT, INSERT ON test.user TO 'pig'@'%';
GRANT ALL ON *.* TO 'pig'@'%';
GRANT ALL ON maindataplus.* TO 'pig'@'%';
```

用以上命令授权的用户不能给其它用户授权，如果想让该用户可以授权，用以下命令:
```sql
GRANT privileges ON databasename.tablename TO 'username'@'host' WITH GRANT OPTION;
```

## 设置与更改用户密码
命令:
```sql
SET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');
```
如果是当前登陆用户用:
```sql
SET PASSWORD = PASSWORD("newpassword");
```
例子:
```sql
SET PASSWORD FOR 'pig'@'%' = PASSWORD("123456");
```
## 撤销用户权限
命令:
```sql
REVOKE privilege ON databasename.tablename FROM 'username'@'host';
```
说明:
privilege, databasename, tablename：同授权部分

例子:
```sql
REVOKE SELECT ON *.* FROM 'pig'@'%';
```
注意:
假如你在给用户`'pig'@'%'`授权的时候是这样的（或类似的）：`GRANT SELECT ON test.user TO 'pig'@'%'`，则在使用`REVOKE SELECT ON *.* FROM 'pig'@'%';`命令
并不能撤销该用户对test数据库中user表的`SELECT` 操作。相反，如果授权使用的是`GRANT SELECT ON *.* TO 'pig'@'%';`则`REVOKE SELECT ON test.user FROM 'pig'@'%';`命令
也不能撤销该用户对test数据库中user表的`Select`权限。

具体信息可以用命令`SHOW GRANTS FOR 'pig'@'%';` 查看。

## 删除用户
命令:
```sql
DROP USER 'username'@'host';
```