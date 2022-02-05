# Jackbox Game Selector Discord Bot

## Summary

A Discord bot that will respond with a random game from within the Jackbox Party Packs

## How to start

1. creating a bot
1. Create a bot on Discord.com
    1. Generate bot oauth key
    1. invite bot to server that you'd like to use jackbox
    1. update `docker-compose.yml` with oauth key
1. updating the games list
    1. create a list of games you'd like to support in the same format as the `src/data/testgames.json
    1. save the games list within the app structure or to a url
    1. update `docker-compose.yml` env value `GAMESLIST` with the path to the file; this supports external URLs
1. run `docker-compose up` from base folder

## Commands

### Random Game

```discord
/jackboxrandom players: 3
```

#### players

Defines the number of players desired to be supported
required

```discord
/jackboxrandom players: 3
```

#### audience

Allows player count overages to spill into audience, if game supports it
default: false

```
/jackboxrandom players: 3 audience: true
```

#### packs

Allows to limit game choices to specific packs
default: all

```
/jackboxrandom players: 3 packs: 1,5,8
```

```
/jackboxrandom players: 3 packs: pack1,pack5,pack8
```

## About the Project

[Homepage](https://github.com/MikeActually/jackbox-discord-app#readme)

Author: Michael Heath

Github: [MikeActually](https://github.com/MikeActually)

Discord: MikeActually#3225

Twitter: [@themikeactually](https://twitter.com/themikeactually)

[![Discord Bots](https://top.gg/api/widget/556815176674836480.svg)](https://top.gg/bot/556815176674836480)

### Donate

Venmo: [MikeActually](https://venmo.com/mikeactually)
