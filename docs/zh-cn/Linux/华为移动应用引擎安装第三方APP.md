# 华为移动应用引擎(EMUI模拟器)安装第三方APP

## 准备工作

- 华为移动应用引擎安装包

- adb调试工具

- 第三方应用apk包

## 参考资料

[安装第三方app](https://www.bilibili.com/video/BV17f4y1E7xX) 

[引擎安装包](https://www.aliyundrive.com/s/uXjpeLfeAQX)

[adb工具](https://adb.clockworkmod.com/)

> 安装引擎,adb工作省略,大家应该都懂

## 安装

### 1.打开华为应用市场

1. 右键安装后桌面的`阅读`app快捷方式,找到根目录
2. 复制`app\com.huawei.hwireader`目录下`config.ini` `阅读.exe` `uninstall.exe`到上级目录`app\com.huawei.appmarket`
3. 打开`config.ini`修改为

```ini
[AppInfo]
packageName=com.huawei.appmarket
```

重命名`app\com.huawei.appmarket`下的`阅读.exe`(非必须),打开它,此时进入华为应用市场

### 2.开启usb调试

1. 在应用市场下载`͏FX Launcher`并打开,点击`Apps`,点击`设置`,此时打开与EMUI风格相似的设置界面
2. 点击版本号`7次`直到出现已开启开发人员选项提示
3. 打开开发人员选项,找到`usb调试`并打开,并关闭`监控ADB安装应用`

### 3.adb连接模拟器

> 默认大家已经安装好adb工具了

管理员模式打开`cmd`并输入`adb devices`,有下面的提示证明已经连接上模拟器了

```bash
C:\Windows\system32>adb devices
List of devices attached
emulator-5554   device
```

### 4.安装应用

执行如下命令`adb install E:\download\xxx.apk` 等待应用安装完毕

```bash
C:\Windows\system32>adb install E:\download\blhx_6.0.5_bilibili_20210907_702196.apk
Performing Streamed Install
Success
```



