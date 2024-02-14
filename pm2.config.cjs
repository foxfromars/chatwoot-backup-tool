module.exports = {
  apps : [{
    name   : "Chatwoot Backup Tool",
    script : "./dist/index.js",
    cron_restart: "0 0 * * *",
    autorestart: false,
  }]
}

