# Shitcord

A bot that raids and nukes servers or dm every member on them.

Step 1: Go to https://dashboard.heroku.com/apps
Step 2: Go to the deploy section, select GitHub, and enable Automatic Deploy
Step 3: Under Resources, deselect web and activate the worker

Step 4: Go to Settings, find the Config Variables section, and add a new option. The Variable’s key should be BOT_TOKEN and the value should be the Client Secret you copied earlier.
If everything goes well, you will now have a working Discord bot. In order to get it to run 24/7, just add a valid billing address under Heroku’s settings. You will not be charged, and will be given 1,000 free hours a month (A few hundred more than you need to host one bot…)
