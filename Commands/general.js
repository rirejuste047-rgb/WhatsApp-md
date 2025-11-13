module.exports = {
  help: async (sock, from) => {
    await sock.sendMessage(from, {
      text: `
📜 *Commandes disponibles :*

⚙️ *Général*
/help - Liste des commandes
/info - Infos sur le bot
/ping - Test du bot
/time - Heure actuelle
/owner - Contact du propriétaire

😂 *Fun*
/joke - Une blague aléatoire
/meme - Envoie un meme (texte)

/say [texte] - Répète le message
/reverse [texte] - Inverse ton texte

🛠️ *Utilitaires*
/echo [texte] - Répète ton message
/calc [exp] - Calcule une expression
/translate [txt] - Traduit (fr→en)
/weather [ville] - Météo (factice)

🖼️ *Médias*
/sticker - Convertit image → sticker

💻 *Système*
/restart - Redémarre le bot
/stats - Infos système
      `
    });
  },

  info: async (sock, from) => {
    await sock.sendMessage(from, { text: "🤖 Bot WhatsApp MultiCommand\nVersion 1.0\nDéveloppé avec Baileys." });
  },

  ping: async (sock, from) => {
    await sock.sendMessage(from, { text: "🏓 Pong !" });
  },

  time: async (sock, from) => {
    await sock.sendMessage(from, { text: `🕒 Il est ${new Date().toLocaleTimeString()}` });
  },

  owner: async (sock, from) => {
    await sock.sendMessage(from, { text: "👑 Propriétaire : +2376XXXXXXXX" });
  },
};
