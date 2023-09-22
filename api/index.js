const httpServer = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

httpServer.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
