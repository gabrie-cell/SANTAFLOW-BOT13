import fs from 'fs'
import { join } from 'path'
import Jimp from 'jimp'
import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'
import { getDevice } from '@whiskeysockets/baileys'

let handler = async (m, { conn, usedPrefix, __dirname }) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))

  const imgPath = join(__dirname, '../src/catalogo.jpg')
  let thumbnail = null
  if (fs.existsSync(imgPath)) {
    try {
      const img = await Jimp.read(imgPath)
      thumbnail = await img.resize(300, 150).getBufferAsync(Jimp.MIME_JPEG)
    } catch {
      thumbnail = null
    }
  }

  let meName = await conn.getName(conn.user?.id || conn.user?.jid || '')
  let user = global.db.data.users[m.sender]
  let nombre = await conn.getName(m.sender)
  let premium = user.premium ? 'sɪ ✅' : 'ɴᴏ ❌'
  let limite = user.limit || 0
  let totalreg = Object.keys(global.db.data.users).length
  let groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
  let muptime = clockString(process.uptime())

  const tag = '@' + m.sender.split('@')[0]
  const number = m.sender.replace('@s.whatsapp.net', '')
  const phoneInfo = PhoneNumber('+' + number)
  const countryCode = phoneInfo.getRegionCode('international')
  const countryName = countryCode ? new Intl.DisplayNames(['es'], { type: 'region' }).of(countryCode) : 'Desconocido'
  const flag = countryCode ? String.fromCodePoint(...[...countryCode].map(c => 0x1F1E6 + c.charCodeAt(0) - 65)) : '🌐'

  let device = 'Desconocido'
  try {
    device = getDevice(m.id) || 'Desconocido'
  } catch {}
  let deviceName = device === 'android' ? '*Android*' : device === 'ios' ? '*iPhone*' : device === 'web' ? 'Web 🌐' : 'Otro 💻'

  function clockString(seconds) {
    let h = Math.floor(seconds / 3600)
    let m = Math.floor(seconds % 3600 / 60)
    let s = Math.floor(seconds % 60)
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
  }

  const infoUser = `
*— ֶָ֢ ᨧᨴ ִ user info*  
˒˓ ׄ ꖛ 𝅄 nombre: ${nombre}
˒˓ ׄ ꖛ 𝅄 premium: ${premium}
˒˓ ׄ ꖛ 𝅄 limite: ${limite}
˒˓ ׄ ꖛ 𝅄 país: ${countryName} ${flag}
˒˓ ׄ ꖛ 𝅄 dispositivo: ${deviceName}

*— ֶָ֢ ᨧᨴ ִ bot info*  
˒˓ ׄ ꖛ 𝅄 active time: ${muptime}
˒˓ ׄ ꖛ 𝅄 users: ${totalreg}
˒˓ ׄ ꖛ 𝅄 grupos: ${groupsCount}
˒˓ ׄ ꖛ 𝅄 bot: ${meName || 'MyBot'}
`.trim()

  let commands = Object.values(global.plugins)
    .filter(v => v.help && v.tags)
    .map(v => ({
      help: Array.isArray(v.help) ? v.help : [v.help],
      tags: Array.isArray(v.tags) ? v.tags : [v.tags]
    }))

  let tagSet = new Set()
  for (let cmd of commands) for (let tag of cmd.tags) tagSet.add(tag)

  const stylize = s => s.toLowerCase().replace(/[a-z]/g, c => ({
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
  }[c] || c))

  let menuText = [...tagSet].map(tag => {
    let cmds = commands.filter(p => p.tags.includes(tag)).flatMap(p => p.help).map(cmd => `│ꤥ ${usedPrefix}${cmd.toLowerCase()}`)
    return cmds.length ? `╭┈ » \`${stylize(tag)}\`\n${cmds.join('\n')}\n╰╯` : null
  }).filter(Boolean).join('\n\n')

  const finalMenu = infoUser + '\n\n' + menuText + '\n\n`𝗠𝗜𝗧𝗦𝗨𝗥𝗬-𝗕𝗢𝗧 𝗖𝗥𝗘𝗔𝗧𝗢𝗥 𝗚𝗔𝗕𝗫𝗭-𝗫𝗬𝗥𝗢`'

  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;Itachi;;;
FN:Itachi
item1.TEL;waid=13135550002:+1 (313) 555-0002
item1.X-ABLabel:Celular
END:VCARD`

  let qkontak = {
    key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" },
    message: { contactMessage: { displayName: "My bot", vcard } }
  }

  await conn.sendMessage(m.chat, {
    document: Buffer.alloc(10),
    mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileName: '𝚈𝚊𝚎𝙼𝚒𝚔𝚞 𝙱𝚘𝚝 𝙼𝚎𝚗𝚞',
    fileLength: 1024 * 1024 * 1024,
    caption: finalMenu,
    jpegThumbnail: thumbnail,
    contextInfo: { isForwarded: true }
  }, { quoted: qkontak })

  try {
    let vn = './media/tes.mp3'
    if (fs.existsSync(vn)) await conn.sendFile(m.chat, vn, 'tes.mp3', null, m, true, { type: 'audioMessage', ptt: true })
  } catch {}

  await delay(100)
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|menu|todoelmenu|menuconpleto|\?)$/i

export default handler