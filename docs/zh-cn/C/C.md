# 安装编译环境
[参考文章](https://m.php.cn/centos/449612.html)
```bash
yum list gcc*
yum -y install   gcc.x86_64 gcc-c++.x86_64

```
#编译方式
1.无选项编译链接
> 将test.c预处理、汇编、编译并链接形成可执行文件。这里未指定输出文件，默认输出为a.out。
```bash
gcc test.c
```
2.指定输出文件的文件名

```bash
gcc test.c -o test
```
3.将test.c预处理输出test.i文件

```bash
gcc -E test.c -o test.i
```
4.将预处理输出文件test.i汇编成test.s文件

```bash
gcc -S test.i
```
5.将汇编输出文件test.s编译输出test.o文件

```bash
gcc -c test.s
```
6.将编译输出文件test.o链接成最终可执行文件test

```bash
gcc test.o -o test
```
7.使用编译优化级别1编译程序
> 级别为1~3，级别越大优化效果越好，但编译时间越长
```bash
gcc -O1 test.c -o test
```
8.编译使用C++ std库的程序
> 将test.cpp编译链接成test可执行文件。-l std c++指定链接std c++库
```bash
gcc test.cpp -o test -l std c++
```