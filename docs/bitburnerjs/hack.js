//下面这条命令启动脚本
//run hack.js home --tail
//backdoor:  CSEC  I.I.I.I
//基础单位
var k = 1000;
var m = 1000 * 1000;
var b = 1000 * 1000 * 1000;
var t = 1000 * 1000 * 1000 * 1000;
//服务器集合
var serverNameList = [];
var server0Ram = [];
var myServerList = [];
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
	//在服务器上启动脚本
	for (var index in serverNameList) {
		var server = serverNameList[index];
		//清除脚本
		ns.killall(server);
		hackServer(ns, server);
		//拷贝文件
		await ns.scp("start.js", "home", server);

		//运行脚本
		var jsRam = ns.getScriptRam("start.js");
		var thisserverRam = ns.getServerMaxRam(server);
		var threads = Math.floor(thisserverRam / jsRam);

		ns.print("jsRam: ", jsRam, " serverRam: ", thisserverRam, " threads: ", threads);
		//正常服务器开启线程
		if (threads > 0 && !serverNameList[index].startsWith("server")) {
			await ns.exec("start.js", server, threads, server, ns.hasRootAccess(server));
		}
		//ram=0的服务器保存起来
		if (thisserverRam == 0) {
			server0Ram.push(serverNameList[index]);
		}
		//自己的服务器
		if (serverNameList[index].startsWith("server")) {
			myServerList.push(serverNameList[index]);
		}

	}

	// //自己的服务器hack ram=0的服务器
	for (var index in server0Ram) {
		var server = server0Ram[index];
		if (myServerList.length == 0) { continue; }
		if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(server) || ns.getServerMaxMoney(server) < 1) { continue; }
		var myserver = myServerList.pop();
		ns.print("hack0 ", myserver);
		var jsRam = ns.getScriptRam("start.js");
		var thisserverRam = ns.getServerMaxRam(myserver);
		var threads = Math.floor(thisserverRam / jsRam);
		ns.print("jsRam: ", jsRam, " serverRam: ", thisserverRam, " threads: ", threads);
		await ns.exec("start.js", myserver, threads, server, ns.hasRootAccess(server));
	}

	//剩下的服务器hack
	while (myServerList.length > 0) {
		for (var index in serverNameList) {
			var server = serverNameList[index];
			if (ns.getServerMaxMoney(server) > 1 * b) {
				if (myServerList.length == 0) { continue; }
				if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(server)) { continue; }
				var myserver = myServerList.pop();
				ns.print("hack1 ", myserver, "server ", server);
				var jsRam = ns.getScriptRam("start.js");
				var thisserverRam = ns.getServerMaxRam(myserver);
				var threads = Math.floor(thisserverRam / jsRam);
				ns.print("jsRam: ", jsRam, " serverRam: ", thisserverRam, " threads: ", threads);
				await ns.exec("start.js", myserver, threads, server, ns.hasRootAccess(server));
			}
		}
	}
	//列出服务器信息
	var list = [];
	for (var index in serverNameList) {
		var server = serverNameList[index];
		var maxMoney = ns.getServerMaxMoney(server);
		var level = ns.getServerRequiredHackingLevel(server);
		if (level > ns.getHackingLevel()) {
			continue;
		}
		if (maxMoney > t) {
			list.push(" " + server + " maxMoney: " + maxMoney / t + "t level: " + level)
		} else if (maxMoney > b) {
			list.push(" " + server + " maxMoney: " + maxMoney / b + "b level: " + level)
		} else if (maxMoney > m) {
			list.push(" " + server + " maxMoney: " + maxMoney / m + "m level: " + level)
		} else if (maxMoney > k) {
			list.push(" " + server + " maxMoney: " + maxMoney / k + "k level: " + level)
		}
		//list.push(" "+server+" maxMoney: "+maxMoney+" level: "+level)
	}
	ns.print("list: ", list);
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
	if (ns.getHackingLevel() > ns.getServerRequiredHackingLevel(serverName)
		&& hacktools.length >= ns.getServerNumPortsRequired(serverName) && !ns.hasRootAccess(serverName)) {
		ns.nuke(serverName);
	}

}