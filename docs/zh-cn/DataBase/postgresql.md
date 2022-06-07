# postgresql
## 常用sql
[数据库几个重要视图,为优化指明方向](http://blog.itpub.net/31493717/viewspace-2643152/)
### 查询库使用空间
```sql 
select pg_size_pretty(pg_database_size('database_name')) as size; 
```