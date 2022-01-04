# 开始

## hack主机
### start.js
在本机启动一个hack进程
[start.js](https://github.com/wulusai2333/read/tree/master/docs/bitburnerjs/start.js) |2.45GB
```js
// run start.js n00dles false -t 1
/** @param {NS} ns **/
export async function main(ns) {
    //服务器名
    var target = ns.args[0];
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    var flag=ns.args[1];
    if(!flag){
        ns.nuke(target);
    }
    
    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}
```
### home.js
尝试hack目标主机,并在home启动对应数量进程
[home.js](https://github.com/wulusai2333/read/tree/master/docs/bitburnerjs/home.js)  |4.25GB
```bash
run home --tail
```
### hack.js
复制start.js文件到所有主机上并在其上启动
[hack.js](https://github.com/wulusai2333/read/tree/master/docs/bitburnerjs/hack.js) |5.20GB
```bash
run hack.js --tail
```
