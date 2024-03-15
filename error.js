setTimeout(() => {
  throw new Error('Error from error.js')
}, 300)

process.on('uncaughtException', err => {})

process.on('uncaughtRejection', err => {})
