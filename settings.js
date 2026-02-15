import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.botNumber = ''

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.owner = ["51941658192", "51978385249", "51919199620"]

global.mods = ['51978385249']
global.suittag = ['51978385249'] 
global.prems = ['51978385249']

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = '✦⃟🎧 𝙼𝙸𝚃𝚂𝚄𝚁𝚈-𝙼𝙳 🎧⃟✦'
global.namebot = '⸸ 𝙼𝙸𝚃𝚂𝚄𝚁𝚈 • 𝙱𝙾𝚃 ⸸'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.shadowJadibts = true

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.packname = '🎶 ⌬ 𝑀𝑖𝑡𝑠𝑢𝑟𝑦 𝑩𝒐𝒕 ⌬ 🎵'
global.botname = '🎵 𝑴𝑰𝑻𝑺𝑼𝑹𝒀-𝑩𝑶𝑻 ❤️'
global.wm = '◈ 𝑵𝑰𝑻𝑺𝑼𝑹𝒀 𝐁𝐎𝐓 ◈'
global.author = '⩇⃟🥭 𝑴𝒂𝒅𝒆 𝒃𝒚 𝙜𝙖𝙗𝙭𝙯 ⩇⃟🎵'
global.dev = '🎶 ミ🎵 》𝙂𝘼𝘽𝙓𝙕-𝙓𝙔𝙍𝙊《 🎶ミ ❤️'
global.bot = '𝙈𝙄𝙩𝙨𝙪𝙧𝙮 𝒃𝒐𝒕'
global.club = '🎵 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 𝙜𝙖𝙗𝙭𝙯•Core 𝖢𝗅𝗎𝖻 🎶'
global.textbot = 'ᴍɪᴛsᴜʀʏ-ʙᴏᴛ ✦ ᏀᎪᏴХᏃ'
global.etiqueta = '@gabxz ° ғ`ᴄ'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.moneda = 'ᴇᴜʀᴏs💶'
global.banner = 'https://files.cloudkuimages.guru/images/431fc1f481b5.jpg'
global.avatar = 'https://files.cloudkuimages.guru/images/c0f1ee069e89.jpg'
global.logo = 'https://files.cloudkuimages.guru/images/16d6e45c0565.jpg'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.gp1 = 'https://whatsapp.com/channel/0029Vb6iXGDISTkKY8fxUa39'
global.comunidad1 = 'https://whatsapp.com/channel/0029Vb6iXGDISTkKY8fxUa39'
global.channel = 'https://whatsapp.com/channel/0029VbBukpH6LwHm0Ox44K2g'
global.channel2 = 'https://whatsapp.com/channel/0029VbBukpH6LwHm0Ox44K2g'
global.md = 'https://github.com/carlos13ra/SANTAFLOW-BOT13'
global.correo = 'carlosramirezvillanueva30@gmail.com'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363404087331895@newsletter',
ch2: "120363404087331895@newsletter",
ch3: "120363404087331895@newsletter"
}
global.multiplier = 60

///*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.APIs = {
xyro: { url: "https://xyro.site", key: null },
yupra: { url: "https://api.yupra.my.id", key: null },
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: 'the.shadow' }
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
