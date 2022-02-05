const _newrelic = require("newrelic")

const startupApplication = () => {
	const transaction = _newrelic.getTransaction()

	require('./services/commandRegistryService')

	const { spawnDiscordBot } = require('./services/discordshardmanager')

	spawnDiscordBot()

	transaction.end()
}

_newrelic.startBackgroundTransaction('startup',startupApplication);