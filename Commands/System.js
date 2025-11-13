const os = require("os");

module.exports = {
  restart: async (sock, from) => {
    await sock.sendMessage(from, { text: "🔄 Redémarrage du bot..." });
    process.exit(0);
  },

  stats: async (sock, from) => {
    const uptime = process.uptime();
    await sock.sendMessage(from, {
      text: `📊 *Statistiques système :*\n\nUptime : ${Math.floor(uptime / 60)} min\nMémoire : ${(os.totalmem() / 1e9).toFixed(2)} GB\nOS : ${os.platform()}`
    });
  },
};
