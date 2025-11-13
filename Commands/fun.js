const jokes = [
  "Pourquoi les programmeurs détestent la nature ? Trop de bugs.",
  "Je connais une blague sur UDP... mais je ne sais pas si tu l’as reçue.",
  "0 et 1 entrent dans un bar..."
];

module.exports = {
  joke: async (sock, from) => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await sock.sendMessage(from, { text: `😂 ${joke}` });
  },

  meme: async (sock, from) => {
    await sock.sendMessage(from, { text: "🤣 Voici ton meme : [imaginaire]" });
  },

  say: async (sock, from, msg, args) => {
    const text = args.join(" ");
    if (!text) return sock.sendMessage(from, { text: "❗ Utilisation : /say [texte]" });
    await sock.sendMessage(from, { text });
  },

  reverse: async (sock, from, msg, args) => {
    const text = args.join(" ");
    if (!text) return sock.sendMessage(from, { text: "❗ Utilisation : /reverse [texte]" });
    const reversed = text.split("").reverse().join("");
    await sock.sendMessage(from, { text: `🔁 ${reversed}` });
  },
};
