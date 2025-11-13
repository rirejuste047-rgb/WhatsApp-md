const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const Pino = require("pino");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

// Chargement dynamique de toutes les commandes
const commands = {};
fs.readdirSync("./commands").forEach(file => {
  if (file.endsWith(".js")) {
    const cmd = require(`./commands/${file}`);
    Object.assign(commands, cmd);
  }
});

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: Pino({ level: "silent" }),
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, Pino().child({ level: "silent" })),
    },
  });

  // Connexion via code de couplage
  if (!sock.authState.creds.registered) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("📱 Entrez votre numéro WhatsApp (ex: 2376XXXXXXXX) : ", async (number) => {
      const code = await sock.requestPairingCode(number.trim());
      console.log(`🔗 Code de couplage : ${code}`);
      rl.close();
    });
  }

  sock.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") console.log("✅ Connecté à WhatsApp !");
  });

  sock.ev.on("creds.update", saveCreds);

  // Réception des messages
  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    const prefix = "/";
    if (!text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = commands[cmdName];
    if (command) {
      await command(sock, from, msg, args);
    } else {
      await sock.sendMessage(from, { text: "❌ Commande inconnue. Tape /help pour la liste complète." });
    }
  });
}

startBot();
