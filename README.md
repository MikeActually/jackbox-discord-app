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
!jackbox game
```

#### players

Defines the number of players desired to be supported
default: 1

```discord
!jackbox game 99players
!jackbox game 99p
!jackbox game 99 p
!jackbox game 1 player
!jackbox game 1player
```

#### audience

Allows player count overages to spill into audience, if game supports it
default: true

```discord
!jackbox game 99players noaudience
!jackbox game 99players no audience
!jackbox game 99players audience
```

#### packs

Allows to limit game choices to specific packs
default: array defined in env -> GAMESLIST -> packs

```discord
!jackbox game jp1 jp2 jp3
```

### Help

Displays instructions for all commands

```discord
!jackbox help
```

## About the Project

[Homepage](https://github.com/MikeActually/jackbox-discord-app#readme)

Author: Michael Heath

Github: [MikeActually](https://github.com/MikeActually)

Discord: MikeActually#3225

Twitter: [@themikeactually](https://twitter.com/themikeactually)

### Donate

Venmo: [MikeActually](https://venmo.com/mikeactually)
