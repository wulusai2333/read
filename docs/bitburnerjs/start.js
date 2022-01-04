// run start.js n00dles false -t 1
/** @param {NS} ns **/
export async function main(ns) {
    //服务器名
    var target = ns.args[0];
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    var flag = ns.args[1];
    if (false == flag) {
        ns.nuke(target);
    }

    while (true) {
        ns.print(new Date());
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}