# 使用说明



# hashcat(最强破解工具)

安装https://hashcat.net/hashcat/ 下载解压即可

https://www.openwall.com/john/ 用于获取hash值

https://hashcat.net/wiki/ 文档

## john

john目录`run`下执行将加密的zip文件hash打印到txt文本中

```bash
zip2john.exe test.zip >./ziphash.txt
# rar与zip操作过程一致
rar2john.exe test.zip >./rarhash.txt
```

7z 先安装perl再运行 https://www.perl.org/get.html#win32

```bash
perl john-1.9.0-jumbo-1-win64\run\7z2john.pl breakzip.7z >64684113.txt 
```



## 使用暴力破解方式

`-a 3`使用模式3即暴力破解

`-m 13600`指定hash类型为zip https://hashcat.net/wiki/doku.php?id=example_hashes

`?h?h?h?h` 密码正则 https://hashcat.net/wiki/doku.php?id=mask_attack

```bash
hashcat.exe -a 3 -m 17200 $pkzip2$1*1*2*0*1373*2179*....eb353b95*$/pkzip2$ ?d?d?d?d?d?d?d?d?d?d --show

```



7z

```bash
hashcat.exe -a 3 -m 11600 $7z$2$19$0$$16$62d7f347ab1d862c0285....db748edae2$1736$00  --custom-charset3=charsets/chinese/ci1000zi.hcchr ?3?3?3?3

```



可能遇到的问题

> 1.CUDA报错,去官网下载 https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_network 
>
> 2.获取不到风扇转速 nvmlDeviceGetFanSpeed(): Not Supported 反正能跑起来不用管

使用示例

```bash
#8-11位数字+小写
hashcat -m 100 -a 3 text.txt --increment --increment-min 8 --increment-max 11 --custom-charset1 ?l?d ?1?1?1?1?1?1?1?1?1?1?1

```

### 破解中文字符密码

“–hex-charset”,这个参数可以允许用户将待破解的数据以十六进制数值的形式输入给Hashcat

–pot-disable：禁止Hashcat将已破解的哈希添加到potfile中，添加该参数可以避免测试过程中出现某些问题。

–outfile-autohex-disable：将破解出的密码结果以**明文**形式显示出来，如果不输入这个参数的话，密码破解的结果将以十六进制的形式输出。如果密码结果输出为乱码的话，可以去掉该参数，以便得到密码的原始十六进制数值。

-m 0：设置待破解数据的哈希类型，“0”即为MD5。

-a 3：设置攻击模式，“模式3”代表暴力破解。

**_cypher.txt：存放待破解密码哈希的文件。

在破解中文的示例中，我们的参数命令应该如下所示（假设待破解密码为两个汉字）：

```bash
# 此密文已覆盖常用汉字字符
./hashcat --potfile-disable --outfile-autohex-disable -m 0 -a 3 ../zh_cypher.txt --hex-charset -1 e3e4e5e6e7e8e9 -2 808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebf -3 808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebf -i ?1?2?3?1?2?3

```

#### UTF编码

https://www.anquanke.com/post/id/84573  hashcat命令解析文章

http://ibillxia.github.io/blog/2010/08/21/utf8-chinese-coding/  UTF8中文编码范围

http://memory.loc.gov/diglib/codetables/9.1.html utf8编码表

```bash


Unicode汉字编码范围\u4E00-\u9FA5

utf8编码范围是在0080-07FF之间
UTF-8就是以8位为单元对UCS进行编码。从UCS-2到UTF-8的编码方式如下：
UCS-2编码(16进制) UTF-8 字节流(二进制)
0000 - 007F 0xxxxxxx
0080 - 07FF 110xxxxx 10xxxxxx
0800 - FFFF 1110xxxx 10xxxxxx 10xxxxxx

例如“汉”字的Unicode编码是6C49。6C49在0800-FFFF之间，所以肯定要用3字节模板了：1110xxxx 10xxxxxx 10xxxxxx。 将6C49写成二进制是：0110 110001 001001， 用这个比特流依次代替模板中的x，得到：11100110 10110001 10001001，即E6 B1 89。
```

字典攻击

https://www.freebuf.com/column/175400.html

```bash
hashcat.exe -a 1 -m 17200 $pkzip2$1*1*2*0*1373*2179*....eb353b95*$/pkzip2$  dict1.txt dict2.txt
```





### 常用的hash示例

### 特征

```bash

#zip WinZip
13600 WinZip $zip2$*0*3*0*e3...c*$/zip2$
#zip PKZIP
17200 PKZIP (Compressed) $pkzip2$1*1*2*0*e3*1c5*eda7a8de*0*28*8*e3*eda7*5096*a...c2*$/pkzip2$
17210 PKZIP (Uncompressed) $pkzip2$1*1*2*0*1d1*1c5*eda7a8de*0*28*0*1d1*eda7*5096*1...77*$/pkzip2$
17220 PKZIP (Compressed Multi-File) $pkzip2$3*1*1*0*8*24*a425*8827*d17...ed*$/pkzip2$
17225 PKZIP (Mixed Multi-File) $pkzip2$3*1*1*0*0*24*3e2c*3ef8*0619...0c*$/pkzip2$
17230 PKZIP (Mixed Multi-File Checksum-Only) $pkzip2$8*1*1*0*8*24*a425*8827*3bd4...5f*$/pkzip2$
#zip SecureZIP
23001 SecureZIP AES-128 $zip3$*0*1*128*0*b4630625...bf*0*0*0*file.txt
23002 SecureZIP AES-192 $zip3$*0*1*192*0*53ff...51a5*0*0*0*file.txt
23003 SecureZIP AES-256 $zip3$*0*1*256*0*39bf...af9d*0*0*0*file.txt
#7z
11600 7-Zip $7z$0$19$0$salt$8$f619...3f96
#rar
12500 RAR3-hp $RAR3$*0*4510...d317
13000 RAR5 $rar5$16$7457...2280$15$f8b4064de34ac02ecabfe9abdf93ed6a$8$9843834ed0f7c754
23700 RAR3-p (Uncompressed)  $RAR3$*1*e54a73729887cb53*49b0a846*16*14*1*3462...921e*30
23800 RAR3-p (Compressed) $RAR3$*1*ad56eb40219c9da2*834064ce*32*13*1*eb47...78e1*33
```



```bash
#zip
13600 WinZip $zip2$*0*3*0*e3222d3b65b5a2785b192d31e39ff9de*1320*e*19648c3e063c82a9ad3ef08ed833*3135c79ecb86cd6f48fc*$/zip2$

17200 PKZIP (Compressed) $pkzip2$1*1*2*0*e3*1c5*eda7a8de*0*28*8*e3*eda7*5096*a9fc1f4e951c8fb3031a6f903e5f4e3211c8fdc4671547bf77f6f682afbfcc7475d83898985621a7af9bccd1349d1976500a68c48f630b7f22d7a0955524d768e34868880461335417ddd149c65a917c0eb0a4bf7224e24a1e04cf4ace5eef52205f4452e66ded937db9545f843a68b1e84a2e933cc05fb36d3db90e6c5faf1bee2249fdd06a7307849902a8bb24ec7e8a0886a4544ca47979a9dfeefe034bdfc5bd593904cfe9a5309dd199d337d3183f307c2cb39622549a5b9b8b485b7949a4803f63f67ca427a0640ad3793a519b2476c52198488e3e2e04cac202d624fb7d13c2*$/pkzip2$
17210 PKZIP (Uncompressed) $pkzip2$1*1*2*0*1d1*1c5*eda7a8de*0*28*0*1d1*eda7*5096*1dea673da43d9fc7e2be1a1f4f664269fceb6cb88723a97408ae1fe07f774d31d1442ea8485081e63f919851ca0b7588d5e3442317fff19fe547a4ef97492ed75417c427eea3c4e146e16c100a2f8b6abd7e5988dc967e5a0e51f641401605d673630ea52ebb04da4b388489901656532c9aa474ca090dbac7cf8a21428d57b42a71da5f3d83fed927361e5d385ca8e480a6d42dea5b4bf497d3a24e79fc7be37c8d1721238cbe9e1ea3ae1eb91fc02aabdf33070d718d5105b70b3d7f3d2c28b3edd822e89a5abc0c8fee117c7fbfbfd4b4c8e130977b75cb0b1da080bfe1c0859e6483c42f459c8069d45a76220e046e6c2a2417392fd87e4aa4a2559eaab3baf78a77a1b94d8c8af16a977b4bb45e3da211838ad044f209428dba82666bf3d54d4eed82c64a9b3444a44746b9e398d0516a2596d84243b4a1d7e87d9843f38e45b6be67fd980107f3ad7b8453d87300e6c51ac9f5e3f6c3b702654440c543b1d808b62f7a313a83b31a6faaeedc2620de7057cd0df80f70346fe2d4dccc318f0b5ed128bcf0643e63d754bb05f53afb2b0fa90b34b538b2ad3648209dff587df4fa18698e4fa6d858ad44aa55d2bba3b08dfdedd3e28b8b7caf394d5d9d95e452c2ab1c836b9d74538c2f0d24b9b577*$/pkzip2$
17220 PKZIP (Compressed Multi-File) $pkzip2$3*1*1*0*8*24*a425*8827*d1730095cd829e245df04ebba6c52c0573d49d3bbeab6cb385b7fa8a28dcccd3098bfdd7*1*0*8*24*2a74*882a*51281ac874a60baedc375ca645888d29780e20d4076edd1e7154a99bde982152a736311f*2*0*e3*1c5*eda7a8de*0*29*8*e3*eda7*5096*1455781b59707f5151139e018bdcfeebfc89bc37e372883a7ec0670a5eafc622feb338f9b021b6601a674094898a91beac70e41e675f77702834ca6156111a1bf7361bc9f3715d77dfcdd626634c68354c6f2e5e0a7b1e1ce84a44e632d0f6e36019feeab92fb7eac9dda8df436e287aafece95d042059a1b27d533c5eab62c1c559af220dc432f2eb1a38a70f29e8f3cb5a207704274d1e305d7402180fd47e026522792f5113c52a116d5bb25b67074ffd6f4926b221555234aabddc69775335d592d5c7d22462b75de1259e8342a9ba71cb06223d13c7f51f13be2ad76352c3b8ed*$/pkzip2$
17225 PKZIP (Mixed Multi-File) $pkzip2$3*1*1*0*0*24*3e2c*3ef8*0619e9d17ff3f994065b99b1fa8aef41c056edf9fa4540919c109742dcb32f797fc90ce0*1*0*8*24*431a*3f26*18e2461c0dbad89bd9cc763067a020c89b5e16195b1ac5fa7fb13bd246d000b6833a2988*2*0*23*17*1e3c1a16*2e4*2f*0*23*1e3c*3f2d*54ea4dbc711026561485bbd191bf300ae24fa0997f3779b688cdad323985f8d3bb8b0c*$/pkzip2$
17230 PKZIP (Mixed Multi-File Checksum-Only) $pkzip2$8*1*1*0*8*24*a425*8827*3bd479d541019c2f32395046b8fbca7e1dca218b9b5414975be49942c3536298e9cc939e*1*0*8*24*2a74*882a*537af57c30fd9fd4b3eefa9ce55b6bff3bbfada237a7c1dace8ebf3bb0de107426211da3*1*0*8*24*2a74*882a*5f406b4858d3489fd4a6a6788798ac9b924b5d0ca8b8e5a6371739c9edcfd28c82f75316*1*0*8*24*2a74*882a*1843aca546b2ea68bd844d1e99d4f74d86417248eb48dd5e956270e42a331c18ea13f5ed*1*0*8*24*2a74*882a*aca3d16543bbfb2e5d2659f63802e0fa5b33e0a1f8ae47334019b4f0b6045d3d8eda3af1*1*0*8*24*2a74*882a*fbe0efc9e10ae1fc9b169bd060470bf3e39f09f8d83bebecd5216de02b81e35fe7e7b2f2*1*0*8*24*2a74*882a*537886dbabffbb7cac77deb01dc84760894524e6966183b4478a4ef56f0c657375a235a1*1*0*8*24*eda7*5096*40eb30ef1ddd9b77b894ed46abf199b480f1e5614fde510855f92ae7b8026a11f80e4d5f*$/pkzip2$


23001 SecureZIP AES-128 $zip3$*0*1*128*0*b4630625c92b6e7848f6fd86*df2f62611b3d02d2c7e05a48dad57c7d93b0bac1362261ab533807afb69db856676aa6e350320130b5cbf27c55a48c0f75739654ac312f1cf5c37149557fc88a92c7e3dde8d23edd2b839036e88092a708b7e818bf1b6de92f0efb5cce184cceb11db6b3ca0527d0bdf1f1137ee6660d9890928cd80542ac1f439515519147c14d965b5ba107c6227f971e3e115170bf*0*0*0*file.txt

23002 SecureZIP AES-192 $zip3$*0*1*192*0*53ff2de8c280778e1e0ab997*603eb37dbab9ea109e2c405e37d8cae1ec89e1e0d0b9ce5bf55d1b571c343b6a3df35fe381c30249cb0738a9b956ba8e52dfc5552894296300446a771032776c811ff8a71d9bb3c4d6c37016c027e41fea2d157d5b0ce17804b1d7c1606b7c1121d37851bd705e001f2cd755bbf305966d129a17c1d48ff8e87cfa41f479090cd456527db7d1d43f9020ad8e73f851a5*0*0*0*file.txt

23003 SecureZIP AES-256 $zip3$*0*1*256*0*39bff47df6152a0214d7a967*65ff418ffb3b1198cccdef0327c03750f328d6dd5287e00e4c467f33b92a6ef40a74bb11b5afad61a6c3c9b279d8bd7961e96af7b470c36fc186fd3cfe059107021c9dea0cf206692f727eeca71f18f5b0b6ee1f702b648bba01aa21c7b7f3f0f7d547838aad46868155a04214f22feef7b31d7a15e1abe6dba5e569c62ee640783bb4a54054c2c69e93ece9f1a2af9d*0*0*0*file.txt




#7z
11600 7-Zip $7z$0$19$0$salt$8$f6196259a7326e3f0000000000000000$185065650$112$98$f3bc2a88062c419a25acd40c0c2d75421cf23263f69c51b13f9b1aada41a8a09f9adeae45d67c60b56aad338f20c0dcc5eb811c7a61128ee0746f922cdb9c59096869f341c7a9cb1ac7bb7d771f546b82cf4e6f11a5ecd4b61751e4d8de66dd6e2dfb5b7d1022d2211e2d66ea1703f96


#rar
12500 RAR3-hp $RAR3$*0*45109af8ab5f297a*adbf6c5385d7a40373e8f77d7b89d317

13000 RAR5 $rar5$16$74575567518807622265582327032280$15$f8b4064de34ac02ecabfe9abdf93ed6a$8$9843834ed0f7c754


23700 RAR3-p (Uncompressed)  $RAR3$*1*e54a73729887cb53*49b0a846*16*14*1*34620bcca8176642a210b1051901921e*30

23800 RAR3-p (Compressed) $RAR3$*1*ad56eb40219c9da2*834064ce*32*13*1*eb47b1abe17a1a75bce6c92ab1cef3f4126035ea95deaf08b3f32a0c7b8078e1*33


```

