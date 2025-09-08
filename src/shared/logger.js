const pino = require('pino');

// Skapa en logger-instans
const logger = pino({
  level: 'info', // Du kan ändra till 'debug', 'warn', 'error' beroende på behov
  transport: {
    targets: [
      {
        target: 'pino-pretty', // För läsbar output i utveckling
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        },
        level: 'info'
      },
      {
        target: 'pino/file',
        options: { destination: './logs/app.log' },
        level: 'info'
      }
    ]
  }
});

module.exports = logger;
