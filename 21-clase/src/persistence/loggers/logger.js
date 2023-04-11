import pino from 'pino'

export const logger = pino()
export const loggerFileWarn = pino('./warn.log')
export const loggerFileError = pino('./error.log')

