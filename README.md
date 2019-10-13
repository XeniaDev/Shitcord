# Shitcord

My name is Shitcord and I'm a bot used to:
- Raid servers
- Nuke servers
- Mass dm all members in a server
- Spam dm individual discord users

## Quick setup

1. Fork the repo
2. Edit the bot.js file and change the owner ID to your Discord ID (https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
3. Change the prefix (optional)

## Create your own bot

1. Head over to http://discordapp.com/developers/applications/me
2. Create a new application
3. Move to the bot tab from the left menu and create one
4. Copy the bot token, you'll need it in the hosting steps

## Host the bot on Heroku 

Make an account on Heroku and confirm your email.

1. Head over to https://dashboard.heroku.com/apps
2. Move to the deploy section, select GitHub, choose your forked repository and enable Automatic Deploy
3. Under Resources, deselect web and activate the worker
4. Go to the Settings tab, find the Config Variables section, and add a new key and value: "BOT_TOKEN" - the token you copied earlier.

## Invite the bot on your server

The "manage server" permission is required to invite the bot. 
In order to to raid or nuke the server, the bot needs to have the Administrator permission. You may "ask" a server moderator to invite the bot for you :)

Here's the invite link:
https://discordapp.com/oauth2/authorize?&client_id=BOT_ID_HERE&scope=bot&permissions=8

Replace BOT_ID_HERE by your bot's id. You can get it in at http://discordapp.com/developers/applications/me after opening your application in the general information tab.

## Use the bot

Type these commands in DM with the bot:

- Nuke: prefix nuke serverID
- Spam channels: prefix channels serverID
- Raid: prefix raid serverID message (ie: @everyone How's it goin')
- DM all server members: prefix dms serverID
- Spam DM individual Discord user: prefix dm userID
- Stop all ongoing actions: prefix restart

Wait for each action to be finished before running another command! If the bot crashes or goes offline, just deploy it manually on your heroku dashboard.
