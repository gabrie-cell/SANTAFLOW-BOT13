import axios from 'axios'
import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const userId = m.mentionedJid?.[0] || m.sender
    const user = global.db?.data?.users?.[userId] || {}

    const name = user.name || 'Desconocido'
    const premium = user.premium ? '✔️ Sí' : 'free'
    const uptime = clockString(process.uptime() * 1000)
    const totalreg = Object.keys(global.db?.data?.users || {}).length
    const totalCommands = Object.keys(global.plugins || {}).length

    const hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
    const fecha = new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
    const dia = new Date().toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })

    const videos = [
      'https://files.catbox.moe/a0kkmt.mp4',
      'https://files.catbox.moe/a0kkmt.mp4'
    ]
    const video = videos[Math.floor(Math.random() * videos.length)]

    const emojis = {
      'main': '🦋', 'tools': '🛠️', 'audio': '🎧', 'group': '👥',
      'owner': '👑', 'fun': '🎮', 'info': 'ℹ️', 'internet': '🌐',
      'downloads': '⬇️', 'admin': '🧰', 'anime': '✨', 'nsfw': '🔞',
      'search': '🔍', 'sticker': '🖼️', 'game': '🕹️', 'premium': '💎', 'bot': '🤖'
    }

    let grupos = {}
    for (let plugin of Object.values(global.plugins || {})) {
      if (!plugin.help || !plugin.tags) continue
      for (let tag of plugin.tags) {
        if (!grupos[tag]) grupos[tag] = []
        for (let help of plugin.help) {
          if (/^\$|^=>|^>/.test(help)) continue
          grupos[tag].push(`${usedPrefix}${help}`)
        }
      }
    }

    for (let tag in grupos) {
      grupos[tag].sort((a, b) => a.localeCompare(b))
    }

    const secciones = Object.entries(grupos).map(([tag, cmds]) => {
      const emoji = emojis[tag] || '⭐'
      return `╭━━🎶〔 ${emoji} \`${tag.toUpperCase()}\` ━━⬣\n`
     + cmds.map(cmd => `┃ ➩ ${cmd}`).join('\n') 
     + `\n╰━━🎧〔 SANTAFLOW 〕🎵━━⬣`
    }).join('\n\n')

    let menuText = `
> ✧ Hola! @${userId.split('@')[0]} soy ${botname} aquí tienes la lista de comandos 
> ✧  ${ucapan()} Sigue a santaflow en sus redes sociales: TIKTOK: Santaflow oficial - FACEBOOK: Santaflow oficial - YOUTUBE: Santaflow oficial, y escucha sus canciones y exitos 🎧👌

╭━━━〔 \`sᴛᴀᴛᴜs-ᴜsᴇʀ\` 〕━━⬣
│ 👤 *ᴜsᴇʀ* » ${name}
│ 💎 *ᴘʀᴇᴍɪᴜᴍ* » ${premium}
│ 🎧 *ʀᴇɢɪsᴛʀᴀᴅᴏ* » ${user.registered ? '✔ SI' : '✘ NO'}
│ 🥭 *ʟɪᴍɪᴛᴇ* » 10
╰━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 \`sᴛᴀᴛᴜs-ʙᴏᴛ\` 〕━━⬣
│ 🎧 *ʙᴏᴛ* » ${botname}
│ 🍐 *ᴛɪᴘᴏ* » ${(conn.user?.jid === global.conn?.user?.jid ? '🌟 ʙᴏᴛ ᴏғɪᴄɪᴀʟ' : '✨ sᴜʙ ʙᴏᴛ')}
│ ❄️ *ᴄᴏᴍᴀɴᴅᴏs* » ${totalCommands}
│ ⭐ *ᴜsᴜᴀʀɪᴏs* » ${totalreg}
│ 🗿 *ᴀᴄᴛɪᴠᴏ* » ${uptime}
│ 🥭 *ᴅᴀᴛᴇ* » ${hora}, ${fecha}, ${dia}
╰━━━━━━━━━━━━━━━━━━⬣
 
   *_LISTA DE COMANDOS_*


${secciones}
`.trim()

await m.react('🎧')
await conn.sendMessage(m.chat, { video: { url: video }, caption: menuText, contextInfo: { /*mentionedJid: [m.sender],*/ isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: botname, body: dev, thumbnailUrl: 'https://files.catbox.moe/fedlqm.jpg', sourceUrl: 'https://chat.whatsapp.com/K5BVfhQviJ00M5aJGv3Epc', mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: m })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender]
    }, { quoted: m })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto']
handler.register = true
export default handler

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}h ${minutes}m ${seconds}s`
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH')
  let res = "ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙"
  if (time >= 5 && time < 12) res = "ʙᴜᴇɴᴏs ᴅɪᴀs ☀️"
  else if (time >= 12 && time < 18) res = "ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs 🌤️"
  else if (time >= 18) res = "ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙"
  return res
}
