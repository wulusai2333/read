# 开始

前言:调整后NSFW的模型与NovelAI官网上的一致,SFW的模型会有点区别

前提,显卡最好拥有6G及以上显存,并且拥有CODA工具,虽然2G,4G也能跑,但要改配置,参考下面的链接,各种安装问题的解决方案

新用户先看这个,GTX 16XX显卡会比较麻烦,20系,30系显卡问题不大

 [https ://rentry.org/voldy 解决安装过程各种疑难杂症](https://rentry.org/voldy)

确保已经安装了较新的git和python

## 环境搭建

参考资料:https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/2017

下面描述里提到的`文章`均指这篇,本文差不多就是这篇文章的整理和翻译,当然也精简掉了图片,需要测试验证对比原文吧

提醒:建议抛弃原本的项目,重新拉取最新代码,因为旧代码有可能更新代码失败

```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```

在这里可以将旧项目的如下内容复制到新项目,确保下载好了52G的`novelaileak`或者124G的`novelaileak2`中的如下内容:(*.pt表示该目录下所有pt文件)

> novelaileak\stableckpt\modules\modules\\*.pt
>
> novelaileak\stableckpt\animefull-final-pruned\model.ckpt
>
> novelaileak\stableckpt\animevae.pt

```bash
#这个文件夹里面存放着pt文件
stable-diffusion-webui\models\hypernetworks\
	放入novelaileak\stableckpt\modules\modules\*.pt
#放入模型和pt文件,两者名字要相同,这里统一为animefull-final-pruned
stable-diffusion-webui\models\Stable-diffusion\
    放入novelaileak\stableckpt\animefull-final-pruned\model.ckpt并改名为animefull-final-pruned.ckpt
    放入novelaileak\stableckpt\animevae.pt并改名为animefull-final-pruned.vae.pt
#用它生成图片后可以看到Model hash: 925997e9
#而SFW版本的Model hash: 1d4a34af
```

然后更新pip,新代码升级了pip版本

```bash
python -m pip install --upgrade pip
```

执行下载依赖,如果上面的步骤做完了,可以直接执行成功,依赖下载速度因人而异,可能几分钟也可能几小时,如果是`GTX 16xx`显卡的用户,可能是用`webui-user.bat`启动的

```bash
web.bat
```

文章作者建议每次启动项目前`git pull`更新代码,前提是项目带绿色`√`表示项目代码没有改动,可以直接拉取,如果是红色叹号`!`则代表项目代码有改动,直接拉取很可能会失败

启动成功后访问http://localhost:7860/

> V2.pt被我忽略了,想要使用的话可以去原文中找

## AUTOMATIC 1111 WebUi- NovelAi 仿真设置

想要达到与NovelAI一致的效果需调整以下设置

### txt2img页面

Sampling Steps :28

Sampling method: Euler

CFG Scale: 12

Seed:2870305590

### Settings页面

调整完记得Apply settings保存一下

#### Stable Diffusion选项卡

如果按照以上步骤是没有`Stable Diffusion checkpoint`选项卡的,因为只有一个模型,如果有选项卡就选择刚才导入的模型

`Stable Diffusion finetune hypernetwork`测试的时候没必要修改,测试完后根据文章可以选择自己喜欢的风格,每个风格各有优劣,不选择直接使用None效果也挺好

`Stop At last layers of CLIP model`进度条拉到2,如果没有这个进度条说明代码没更新或者更新中遇到了问题,建议重新拉取项目

## 测试效果

如果完全按照以上说明修改,执行之后会得到与文章一致的结果

```bash
masterpiece, best quality, masterpiece, asuka langley sitting cross legged on a chair
Negative prompt: lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry, artist name
Steps: 28, Sampler: Euler, CFG scale: 12, Seed: 2870305590, Size: 512x512, Model hash: 925997e9, Clip skip: 2

```

### 其他选项调整

到这里就已经完成设置了,但其实与NovelAi官网上的结果并不一致

有以下几个测试点:`Sampling method`,`Negative prompt`,`Eta noise seed delta`自测与文章结果一致

**调整了`Eta noise seed delta`为31337后与网页版一致了**

文章得出结论

> EULER A / NSFW (Full) ) + ENSD: 31337 ✔️: Brackets/NAI = Brackets + Backslash/Automatic1111

而 EULER / SFW (Curated) ✔️🚧: working partially, tweak? what's missing?

表示在safe for work条件下不一致?也就是说屏蔽了涩涩有修改吧?

另外,勾选`Filter NSFW content`要下载1.13G内容

Eta noise seed delta选项在settings里

对于nsfw模型来说一切都很好，但对于SWF来说，它可能会遗漏一些东西

也就是说不涩涩的模型会有些不同,不能完全还原

-------------------------

Euler a与Euler在输出结果上相似度很高,可以调整比较一下效果

------

英俊 的黑暗精灵战士穿过阴暗的森林

如果您想要更精细的服装细节和更动漫的外观，请使用 DDIM、Euler 以获得更多对比度和有时更繁忙的图片

------------

另外调整NovelAI的Undesired Content选项会对结果有影响,对SFW的影响比较大,似乎NovelAI有特殊优化

-------------

**ETA值,有说法让它调到 0.667 或 0.69结果会更好,看例子确实如此,所以与NovelAI一致也并非最好结果**

----------------------------

有测试Stop At last layers of CLIP model调整为2-4效果最好,过高导致与期望变得不一致

##### NovelAI的语法与Automatic1111的本地版有区别

本地版需要`\`让小括号效果与NovelAI一致

Nai prompt:

``` bash
masterpiece portrait of smiling Asuka (evangelion), evangelion (Hideaki), caustics, textile shading, high resolution illustration, blue eyes, contempt, feminine, woman disdain, disgust, no pupils, hair over face,orange hair,  long hair, red suit, ilya kuvshinov
Steps: 28, Sampler: Euler a, CFG scale: 12, Seed: 2870305590, Size: 512x512, No quality tags, Undesired Content: Low quality + Bad Anatomy + headdress, loli, 
```

本地:

```bash
masterpiece portrait of smiling Asuka \(evangelion\), evangelion \(Hideaki\), caustics, textile shading, high resolution illustration, blue eyes, contempt, feminine, woman disdain, disgust, no pupils, hair over face,orange hair,  long hair, red suit, ilya kuvshinov
Negative prompt: nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, headdress, loli,
Steps: 28, Sampler: Euler a, CFG scale: 12, Seed: 2870305590, Size: 512x512, Model hash: 925997e9, Clip skip: 2, ENSD: 31337
```



#### 几乎必选的关键词:

关键词组合,可以点击create style保存关键词组合 建议保存 masterpiece, best quality 这两个关键词,后面使用时直接选择style而不必每次都输入

##### Prompt:

```bash 
Add Quality Tags = masterpiece, best quality
Novelai : masterpiece, asuka langley sitting cross legged on a chair
Automatic: masterpiece, best quality, masterpiece, asuka langley sitting cross legged on a chair

Undesired Content = Negative prompt weights
low quality + bad anatomy = low quality, bad anatomy
---------
添加质量标签 = 杰作、最佳品质
Novelai：杰作、asuka langley 盘腿坐在椅子上
自动：杰作、最佳品质、杰作、asuka langley 盘腿坐在椅子上

不受欢迎的内容=负面提示权重
低质量+不良解剖=低质量，不良解剖
```

##### Negative prompt: 

```bash
low quality

low quality, bad anatomy

lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry, artist name

lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry

nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry

nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name

nsfw, lowres, (bad anatomy:1.21), bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name

---------机翻一下
低质量

低质量，糟糕的解剖结构

低分辨率、不良解剖结构、不良手部、文本、错误、缺少手指、多余数字、更少数字、裁剪、最差质量、低质量、正常质量、jpeg 伪影、签名、水印、用户名、模糊、艺术家姓名

低分辨率、不良解剖结构、不良手部、文本、错误、缺少手指、多余的数字、更少的数字、裁剪、最差质量、低质量、正常质量、jpeg 伪影、签名、水印、用户名、模糊

nsfw，lowres，不良解剖结构，坏手，文本，错误，缺少手指，多余的数字，更少的数字，裁剪，最差质量，低质量，正常质量，jpeg 伪影，签名，水印，用户名，模糊

nsfw，lowres，坏解剖，坏手，文本，错误，丢失手指，多余数字，更少数字，裁剪，最差质量，低质量，正常质量，jpeg 伪影，签名，水印，用户名，模糊，艺术家姓名

nsfw, lowres, (bad anatomy:1.21), bad hands, text, error, 缺少手指, 多余的数字, 更少的数字, 裁剪, 最差质量, 低质量, 正常质量, jpeg 伪影, 签名, 水印, 用户名, 模糊, 艺术家姓名
```

#### Stable Diffusion finetune hypernetwork对结果的影响



none:是 NAI 奇偶校验所需要的，因此如果您只需要这样，您可以忽略此设置。但它确实会影响事情，而且可能很有趣

aini:有一种你可能不喜欢的强烈风格，你必须真正迅速摆脱（我喜欢它🤷) 我会说它具有最高的一致性和质量

anime

anime_2

anime_3:是该系列中质量最高的，但它们都有些不一致. 我一般不会推荐他们。

furry

furry_2

furry_3

furry_kemono:它们看起来都不错，但我认为 furry_kemono 是 nekomimi 的赢家，但是，默认的相当有能力。除了中间的一个例外，他们的尾巴都做得很差。

furry_protogen

furry_scalie:furry控比较喜欢的

furry_transformation

pony:但从这些种子和设置来看，我对“pony”感到惊讶;

## 附录

另外,根据群友测试和其他地方获取的结果,`()`,`[]`是有效的,`{}`是无效的. 

`()`让关键词权重*1.1

`[]`让关键词权重/1.1

`AND`关键字可以让两个tag融合,比如`white hair and pink hair`就会让两者分别渲染,最终效果可以自行尝试

眼睛颜色会影响整幅画的整体颜色,这个可以自行测试,所以眼睛选色要慎重

tag冲突会导致画面畸形或者变丑,如果得出的效果感觉不好,很有可能是tag冲突了,根据生活经验自行调整吧



