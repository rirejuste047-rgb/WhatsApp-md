module.exports = {
  sticker: async (sock, from, msg) => {
    if (msg.message.imageMessage) {
      const buffer = await sock.downloadMediaMessage(msg);
      await sock.sendMessage(from, { sticker: buffer });
    } else {
      await sock.sendMessage(from, { text: "📸 Envoie une image avec la commande /sticker" });
    }
  },
};
