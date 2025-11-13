module.exports = {
  echo: async (sock, from, msg, args) => {
    const text = args.join(" ");
    if (!text) return sock.sendMessage(from, { text: "❗ Utilisation : /echo [texte]" });
    await sock.sendMessage(from, { text });
  },

  calc: async (sock, from, msg, args) => {
    try {
      const result = eval(args.join(" "));
      await sock.sendMessage(from, { text: `🧮 Résultat : ${result}` });
    } catch {
      await sock.sendMessage(from, { text: "❌ Expression invalide." });
    }
  },

  translate: async (sock, from, msg, args) => {
    const text = args.join(" ");
    if (!text) return sock.sendMessage(from, { text: "❗ Utilisation : /translate [texte]" });
    await sock.sendMessage(from, { text: `🇬🇧 Traduction (factice) : ${text} → [anglais]` });
  },

  weather: async (sock, from, msg, args) => {
    const city = args.join(" ");
    if (!city) return sock.sendMessage(from, { text: "❗ Utilisation : /weather [ville]" });
    await sock.sendMessage(from, { text: `🌤️ Météo à ${city} : Ensoleillé, 28°C` });
  },
};
