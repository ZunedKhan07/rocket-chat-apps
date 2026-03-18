# Mention Tracker

Mention Tracker is a simple Rocket.Chat App made for the Rocket.Chat Apps challenge.

The app watches for mentions of my GitHub username in messages. When tracking is active and someone mentions me in a channel, the app captures that message and sends a reply.

## Features

- Slash command to turn tracking on or off
- Detects mentions of my GitHub username in channel messages
- Sends a reply after a mention is detected
- Supports an optional external logger URL through App Settings
- If the external logger is set, the app sends the message data to that endpoint and uses the returned response in the reply

## Slash Command

Use the following command inside Rocket.Chat:

```bash
/zunedkhan07 on
/zunedkhan07 off
