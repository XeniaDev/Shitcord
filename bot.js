const Discord = require('discord.js');
const client = new Discord.Client();

// Configuration
const prefix = "/";
const ownerid = "532688425950642198";

// Automated DM for new members in chosen server
const joinDM = false;
const joinGroup = "253908290105376768";
const joinMessage = "Welcome";

/*
Ready handler.
*/
client.on('ready', () => {
    try {
        console.log("Node.js version: " + process.version + "\nDiscord.js version: " + Discord.version);
    } catch (error) {
        console.log("[Ready] " + error);
    }
});

/*
Error handler.
*/
client.on('error', () => {
    try {
        console.log("ERROR: " + error);
    } catch (err) {
        console.log("[Error] " + err);
    }
});

/*
Message handler.
*/
client.on('message', message => {
    try {
        if (message.author.id == ownerid) {
            var channel = message.channel;
            var args = message.content.split(" ");
            // Spam in one place
            if (args[0] == prefix + 'spam') {
                if (args[1] != null) {
                    delete args[0];
                    var msg = args.join(" ");
                    delete args[1];
                    var interval = setInterval(function () {
                            channel.send(msg);
                    }, 600);
                } else {
                    console.log("Invalid spam syntax. (" + prefix + "spam <milliseconds> <milisec between each msg> <message>)");
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
                } else {
                    console.log("Invalid channels syntax. (" + prefix + "channels <milliseconds> <milisec between each msg> <group id> <message>)");
                }
                message.delete();
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
                } else {
                    console.log("Invalid dm syntax. (" + prefix + "dm <group id> <message>)");
                }
                message.delete();
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
                } else {
                    console.log("Invalid dms syntax. (" + prefix + "dms <message>)");
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
