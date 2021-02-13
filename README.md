# **read**

## 前言

制作docsify需要如下环境,继续阅读咱就默认读者已经安装配置好了环境

> nodejs
> git
> 一个文本编辑器或者IDE

[头像](https://www.pixiv.net/artworks/78208000)

[文档模板参考](https://github.com/mochazi/docsify-demo)

### 徽章查询

[badgen.net](http://badgen.net)

### 自定义徽章

[img.shields.io](http://img.shields.io)

切换淘宝镜像源

```bash
npm config set registry https://registry.npm.taobao.org/
npm get registry
```

docsify官方

[docsify中文](https://docsify.js.org/#/zh-cn/)

```bash
#全局安装工具 初始化项目 启动本地预览
npm i docsify-cli -g
docsify init ./docs
docsify serve docs
```
本地预览
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

## 编写警告
> [!WARNING]
> 在`[]`里面写入`!WARNING`即可
>
> 这是一个使用了Markdown引用样式美化插件的警告

## 编写危险
> [!Danger]
> 在`[]`里面写入`!Danger`即可
>
> 这是一个使用了Markdown引用样式美化插件的危险

## 编写提示
> [!TIP]
> 在`[]`里面写入`!TIP`即可
>
> 这是一个使用了Markdown引用样式美化插件的提示

## 编写注释
> [!NOTE]
> 在`[]`里面写入`!NOTE`即可
>
> 这是一个使用了Markdown引用样式美化插件的注释

## 编写自定义警告
> [!WARNING|label:Important]
> 在`[]`里面写入`!WARNING|label:Important`即可
>
> 同理`Danger`，`TIP`，`NOTE`添加`label:xxx`实现自定义

## 图片缩放
![](style/index.png)

## 访问量统计
<span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>

