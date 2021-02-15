# **read**

## 前言

制作docsify需要如下环境,继续阅读咱就默认读者已经安装配置好了环境

> nodejs
> 
> git
> 
> 一个文本编辑器或者IDE

[头像](https://www.pixiv.net/artworks/78208000)

[文档模板参考](https://github.com/mochazi/docsify-demo)

### 徽章查询

[badgen.net](http://badgen.net)

### 自定义徽章

[img.shields.io](http://img.shields.io)

### 切换淘宝镜像源

```bash
npm config set registry https://registry.npm.taobao.org/
npm get registry
```

### docsify官方

[docsify中文](https://docsify.js.org/#/zh-cn/)

```bash
#全局安装工具 初始化项目 启动本地预览
npm i docsify-cli -g
docsify init ./docs
docsify serve docs
```
#### 本地预览
[预览](http://localhost:3000)

```bash
#python2与python3启动本地预览
cd docs && python -m SimpleHTTPServer 3000
cd docs && python -m http.server 3000
```
### 在github上部署
[github预览](https://wulusai2333.github.io/read)

1.将代码上传到github仓库中

2.在仓库上边导航栏找到 齿轮 `Settings`

3.页面往下翻,找到 `GitHub Pages`,也可以直接使用`ctrl+f`搜索

4.`source` 选择分支,我这里是`master`分支,路径`docs`,点击`save`保存

### 配置自定义域名并使用https解析
[配置帖子](https://likfe.com/2018/05/03/github-pages-custom-domains-support-https/) 
我使用的是主域名,记录类型`CNAME`,记录值`wulusai2333.github.io`,线路类型`默认`,
线路类型`国内`是无法成功申请https的,此时在项目的`setting>GitHub Pages`会有绿色提示`Your site is published at 域名`,
等待24小时https证书申请完毕即可勾选`Enforce HTTPS`