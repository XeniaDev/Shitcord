const Discord = require('discord.js');
const client = new Discord.Client();

// Configuration
const prefix = "$";
const ownerid = "532688425950642198";

// Automated DM for new members in chosen server
const joinDM = true;
const joinGroup = "541012770632630272";
const joinMessage = "Welcome to Aeterne's community!";

/*
Message handler.
*/
client.on('message', message => {
    try {
        if (message.author.id == ownerid) {
            var channel = message.channel;
            var args = message.content.split(" ");
            
            // Spam in dm
            if (args[0] == prefix + 'spam') {
                delete args[0];
                var victimid = client.users.get(args[1]);
                delete args[1];
                var msg = args.join(" ");
                delete args[2];
                client.fetchUser(victimid).then((victim) => {
                    var interval = setInterval(function () {
                        victim.send(msg);
                    }, 600);
                });
                
                
            }
            message.delete();
            }
            // Spam multiple channels
            if (args[0] == prefix + 'channels') {
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
            // DM all members in of a server
            if (args[0] == prefix + 'dm') {
                if (args[1] != null && args[2] != null) {
                    delete args[0];
                    var gid = args[1];
                   delete args[1];
                    var msg = args.join(" ");
                    client.guilds.get(gid).members.map(m => {
                        m.send(msg);
                    });
                }
            }
            // Get all server id's
            if (args[0] == prefix + 'gid') {
                client.guilds.map(g => {
                    console.log("Group name: " + g.name + "\nGroup ID: " + g.id);
                });
            }
            // DM all members of all servers
            if (args[0] == prefix + 'dms') {
                if (args[1] != null) {
                    delete args[0];
                    var msg = args.join(" ");
                    client.guilds.map(g => {
                        client.guilds.get(g.id).members.map(m => {
                            m.send(msg);
                        });
                    });
                }
            }
        }
    } catch (err) {
        console.log("[Message] " + err);
    }
});

/*
Join handler
*/
client.on('guildMemberAdd', (member, channel, guild) => {
    try {
        if (joinDM != false && joinGroup != null && joinGroup != "" && joinMessage != "") {
            if (typeof (member) != "undefined") {
                var gid = member.guild.id;
                if (gid == joinGroup) {
                    member.send(joinMessage);
                }
            }
        }
    } catch (err) {
        console.log("[Join] " + err);
    }
});

client.login(process.env.BOT_TOKEN);
