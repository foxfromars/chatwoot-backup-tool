module.exports = {
  apps : [{
    name   : "Chatwoot Backup Tool",
    script : "./src/index.js",
    cron_restart: "0 0 * * *",
  }]
}

