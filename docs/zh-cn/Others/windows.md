###  路由

```basic
::添加路由
route -p add 20.0.0.0 mask 255.0.0.0 20.200.120.1 METRIC 43
::打印路由
route print -4
::删除路由
route delete 20.0.0.0
```

### 计算hash
```basic
certutil -hashfile C:\win2012.vhd MD5
```