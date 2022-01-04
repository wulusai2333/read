//下面这条命令启动脚本
//run home.js n00dles --tail
//run home.js neo-net --tail
//run home.js silver-helix --tail
//run home.js comptek --tail
//hack工具集合
var tools = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "SQLInject.exe", "HTTPWorm.exe"];
var hacktools = [];//"NUKE.exe";
var serverNameList = [];
/** @param {NS} ns **/
export async function main(ns) {
	//hack服务器 
	for (var index in tools) {
		if (ns.fileExists(tools[index])) {
			hacktools.push(tools[index]);
		}
	}

	var arg = ns.args[0];
	if (arg == null) {
		//清除脚本
		//ns.scriptKill("start.js","home");
		scanHost(ns, "home")
		var havetools = hacktools.length;
		var maxvalue = 0;
		var s = "n00dles";
		for (var index in serverNameList) {
			var server = serverNameList[index];
			var ports = ns.getServerNumPortsRequired(server);
			if (ports > havetools) { continue; }

			var a = ns.getGrowTime(server);
			var b = ns.getWeakenTime(server);
			var c = ns.getHackTime(server);
			var d = ns.getServerMaxMoney(server);
			var value = d / (a + b + c);
			if (value > maxvalue) {
				maxvalue = value;
				s = server;
			}
		}
		arg = s;
	}
	hackServer(ns, arg);
	//运行脚本
	var jsRam = ns.getScriptRam("start.js");
	var usedRam = ns.getServerUsedRam("home");
	var serverRam = ns.getServerMaxRam("home");
	var threads = Math.floor((serverRam - usedRam - 64) / jsRam);

	ns.print("jsRam: ", jsRam, " serverRam: ", serverRam, " threads: ", threads);
	if (threads > 0) {
		await ns.exec("start.js", "home", threads, arg, ns.hasRootAccess(arg));
	}

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