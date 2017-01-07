const repl = require('repl')
const context = repl.start({prompt: '>> ',
                          ignoreUndefined: true,
                          replMode: repl.REPL_MODE_STRICT}).context

context.Train = require('../db/commands/Train')
context.Station = require('../db/commands/Station')

module.exports = repl
