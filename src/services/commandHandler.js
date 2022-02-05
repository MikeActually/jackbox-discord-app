const { randomgamecommand } = require('./randomgamehandler')

exports.getPropFromInteraction = (interaction) => {
	const players = interaction.options.getInteger('players')
	const audience = interaction.options.getBoolean('allowaudience')
	let jackpacks = interaction.options.getString('packs')
	if (jackpacks !== null) {
		const regex = /[\D]+/g;
		const splitPacks = jackpacks.split(',')
		splitPacks.forEach((pack, index) => {
			splitPacks[index] = 'jp' + pack.replace(regex, '')
		})
		jackpacks = splitPacks
	} else {
		jackpacks = []
	}
	return {players, audience, jackpacks}
}

exports.handle = (interaction) => {
	const commandName = interaction.commandName
	if (commandName === 'jackboxrandom') {
		interaction.reply(randomgamecommand(getPropFromInteraction(interaction)))
	}
}
