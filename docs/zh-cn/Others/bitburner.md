# 开始

## hack主机
### start.js
在本机启动一个hack进程
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
## home.js
尝试hack目标主机,并在home启动对应数量进程
```js
//下面这条命令启动脚本
//run home.js n00dles --tail
//hack工具集合
var tools = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "SQLInject.exe", "HTTPWorm.exe"];
var hacktools = [];//"NUKE.exe";
/** @param {NS} ns **/
export async function main(ns) {
	//hack服务器 
	for (var index in tools) {
		if (ns.fileExists(tools[index])) {
			hacktools.push(tools[index]);
		}
	}

	var server = ns.args[0];
	//清除脚本
	//ns.scriptKill("start.js","home");
	hackServer(ns, server);

	//运行脚本
	var jsRam = ns.getScriptRam("start.js");
	var thisjsRam = ns.getScriptRam("home.js");
	var serverRam = ns.getServerMaxRam("home");
	var threads = Math.floor((serverRam - thisjsRam-8) / jsRam);

	ns.print("jsRam: ", jsRam, " serverRam: ", serverRam, " threads: ", threads);
	if (threads > 0) {
		await ns.exec("start.js", "home", threads, server, ns.hasRootAccess(server));
	}

}

// hack server
function hackServer(ns, serverName) {
	if (hacktools.includes("BruteSSH.exe")) {
		ns.brutessh(serverName);
	}
	if (hacktools.includes("FTPCrack.exe")) {
		ns.ftpcrack(serverName);
	}
	if (hacktools.includes("relaySMTP.exe")) {
		ns.relaysmtp(serverName);
	}
	if (hacktools.includes("SQLInject.exe")) {
		ns.sqlinject(serverName);
	}
	if (hacktools.includes("HTTPWorm.exe")) {
		ns.httpworm(serverName);
	}
	//执行nuke失败脚本会抛出异常
	//ns.nuke(serverName);
}
```

### hack.js
复制start.js文件到所有主机上并在其上启动
初始化游戏执行这个会hack失败,缺少必要的工具,无法获取目标服务器的root权限
```js
//下面这条命令启动脚本
//run hack.js home --tail

//服务器集合
var serverNameList = [];
//hack工具集合
var tools = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "SQLInject.exe", "HTTPWorm.exe"];
var hacktools = [];//"NUKE.exe";
/** @param {NS} ns **/
export async function main(ns) {
	//获取机器ip
	var hostname = ns.getHostname();
	//扫描服务器集合
	scanHost(ns, hostname);
	ns.print("final server list: ", serverNameList);
	//hack服务器 
	for (var index in tools) {
		if (ns.fileExists(tools[index])) {
			hacktools.push(tools[index]);
		}
	}
	for (var index in serverNameList) {
		var server = serverNameList[index];
		//清除脚本
		ns.killall(server);
		hackServer(ns, server);
		//拷贝文件
		await ns.scp("start.js","home",server);

		//运行脚本
		var jsRam = ns.getScriptRam("start.js");
		var serverRam = ns.getServerMaxRam(server);
		var threads = Math.floor(serverRam/jsRam);

		ns.print("jsRam: ",jsRam," serverRam: ",serverRam," threads: ",threads);
		if(threads>0){
			await ns.exec("start.js",server,threads,server,ns.hasRootAccess(server));
		}
		
	}
	ns.readPort

}
// sacn server
function scanHost(ns, father) {
	var tempList = ns.scan(father);

	for (var index in tempList) {
		if (tempList[index] == 'home' || tempList[index] == 'darkweb') {
			tempList.splice(index, 1);
			//ns.print(tempList);
		}
		if (!serverNameList.includes(tempList[index])) {
			if (tempList[index] == null) {
				ns.print("father: ", father, " index: ", index);
			} else {
				serverNameList.push(tempList[index]);
				//ns.print(tempList[index]);	
				scanHost(ns, tempList[index]);
			}

		}
	}

}

// hack server
function hackServer(ns, serverName) {
	if (hacktools.includes("BruteSSH.exe")) {
		ns.brutessh(serverName);
	}
	 if (hacktools.includes("FTPCrack.exe")) {
		ns.ftpcrack(serverName);
	}
	if (hacktools.includes("relaySMTP.exe")) {
		ns.relaysmtp(serverName);
	}
	if (hacktools.includes("SQLInject.exe")) {
		ns.sqlinject(serverName);
	}
	if (hacktools.includes("HTTPWorm.exe")) {
		ns.httpworm(serverName);
	}
	//执行nuke失败脚本会抛出异常
	//ns.nuke(serverName);
}
```