## 相关文档
[菜鸟教程](https://www.runoob.com/go/go-tutorial.html) 
[中文标准库文档](https://studygolang.com/pkgdoc) 
[官方github地址](https://github.com/golang/go) 
[安装包下载](https://golang.google.cn/dl/) 
下载安装过程参考菜鸟教程
咱的练习 [练习项目](https://github.com/wulusai2333/gostudy)
## govender
`go get govendor`获取
 将依赖包打包到项目目录下
```cmd
govendor init 
govendor add +local
govendor add +e
```
## 配置国内镜像源
windows
```bash
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct

```
linux
```bash
export GO111MODULE=on
export GOPROXY=https://goproxy.cn

```
或者
```bash
echo "export GO111MODULE=on" >> ~/.profile
echo "export GOPROXY=https://goproxy.cn" >> ~/.profile
source ~/.profile

```
其他镜像源
```bash
阿里云： https://mirrors.aliyun.com/goproxy
 
微软： https://goproxy.io
 
七牛云： https://goproxy.cn
 
GoCenter： https://gocenter.io

```
## 编译linux可执行文件
CGO_ENABLED=0 其中CGO_ENABLED=0的意思是使用C语言版本的GO编译器
```cmd
SET CGO_ENABLED=0
set GOARCH=amd64
set GOOS=linux
go build
```
## 编译windows可执行文件
```cmd
SET CGO_ENABLED=0
set GOARCH=amd64
set GOOS=windows
go build
```
## go mod
go mod 是Golang 1.11 版本引入的官方包（package）依赖管理工具，用于解决之前没有地方记录依赖包具体版本的问题，方便依赖包的管理。
之前Golang 主要依靠vendor和GOPATH来管理依赖库，vendor相对主流，但现在官方更提倡go mod。
[gomod使用帖子](https://www.jianshu.com/p/1da8b06d7b10) 
[知乎上gomod使用帖子](https://zhuanlan.zhihu.com/p/59687626)
生成go.mod文件
```bash
go mod init
```
下载并添加依赖到go.mod中
```bash
go build
go test
```
查看module下所有依赖
```bash
go list -m all
```
根据上面的操作列表信息更新依赖
```bash
go get rsc.io/sampler@v1.2.0
```
