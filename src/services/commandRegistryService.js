const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { envs } = require('../config')
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { resourceLimits } = require('worker_threads');

const commands = [];

// Place your client and guild ids here
const clientId = envs().appId;
const guildId = envs().guildId;

const command1 = new SlashCommandBuilder()
	.setName('jackboxrandom')
	.setDescription('Picks a random Jackbox game')
	.addIntegerOption(option => option.setName('players').setDescription('the number of players you want the game to support').setRequired(true))
	.addBooleanOption(option => option.setName('audience').setDescription('will allow some of your participants to be part of the audience. false by default'))
	.addStringOption(option => option.setName('packs').setDescription('comma separated list of packs. all by default. ex. `1,4,5`')).toJSON()

commands.push(command1);

const rest = new REST({ version: '9' }).setToken(envs().jackboxkey);

(async () => {
	try {
		await rest.put(
			guildId ? Routes.applicationGuildCommands(clientId, guildId) : Routes.applicationCommands(clientId),
			{ body: commands },
		);
	} catch (error) {
		console.error(error);
	}
})();