const Discord = require('discord.js');
const client = new Discord.Client();

// Configuration
const prefix = "$";
const owner_ids = ["532688425950642198", "505349958967361536"];

function isOwner(id) {
    for(var i of owner_ids) {
        if(i = id) return true;
    }
    return false;
}

// Automated DM for new members in chosen server
const dm = true;
const serverid = "541012770632630272";
const msg = "Welcome to Aeterne's community!";

// Bot commands
client.on('message', message => {
    if (isOwner(message.author.id)) {
        var args = message.content.split(" ");

        // Spam in dm
        if (args[0] == prefix + 'dm') {
            if (args[1] != null && args[2] != null) {
                delete args[0];
                var victimid = client.users.get(args[1]);
                delete args[1];
                var msg = args.join(" ");
                client.fetchUser(victimid).then((victim) => {
                    var interval = setInterval(function () {
                        victim.send(msg);
                    }, 600);
                });        
            }
        }

        // Spam multiple channels in server
        if (args[0] == prefix + 'raid') {
            if (args[1] != null && args[2] != null) {
                delete args[0];
                var gid = args[1];
                delete args[1];
                var msg = args.join(" ");
                var interval = setInterval(function () {
                        client.guilds.get(gid).channels.map(c => {
                            if (c.type == "text") c.send(msg);
                        });
                }, 600);
            }
        }

        // DM all members in a server
        if (args[0] == prefix + 'dms') {
            if (args[1] != null && args[2] != null) {
                delete args[0];
                var serverid = args[1];
                delete args[1];
                var msg = args.join(" ");
                client.guilds.get(serverid).members.map(m => {
                    m.send(msg);
                });
            }
        }
        
        // Restart bot
        if (args[0] == prefix + 'restart') {
               require("child_process").spawn(process.argv.shift(), process.argv, {
                   cwd: process.cwd(),
                   detached : true,
                   stdio: "inherit"
               });
               process.exit();
        }
    }
});

/*
Join handler
*/
client.on('guildMemberAdd', (member, channel, guild) => {
    try {
        if (dm != false && serverid != null && serverid != "" && msg != "") {
            if (typeof (member) != "undefined") {
                var gid = member.guild.id;
                if (gid == serverid) {
                    member.send(msg);
                }
            }
        }
    } catch (err) {
        console.log("[Join] " + err);
    }
});

client.login(process.env.BOT_TOKEN);
