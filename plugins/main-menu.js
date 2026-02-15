import pkg from '@whiskeysockets/baileys'
const { generateWAMessageFromContent, proto } = pkg

const tags = {
  anime: 'ANIME',
  stalk: 'STALK',
  main: 'INFO',
  ai: 'IA',
  search: 'SEARCH',
  game: 'GAME',
  serbot: 'SUB BOTS',
  rpg: 'RPG',
  sticker: 'STICKER',
  grupos: 'GROUPS',
  nable: 'ON / OFF',
  premium: 'PREMIUM',
  download: 'DOWNLOAD',
  tools: 'TOOLS',
  fun: 'FUN',
  nsfw: 'NSFW',
  cmd: 'DATABASE',
  owner: 'OWNER',
  audio: 'AUDIOS',
  rpg: 'RPG',
  economy: 'ECONOMIA',
  GACHA: 'GACHA',
  rg: 'RG',
  info: 'INFO',
  rpg: 'RPG'
}

let handler = async (m, { conn, args }) => {
  try {
    const userId = m.sender
    const mode = global.opts.self ? 'Privado' : 'Público'
    const totalCommands = Object.keys(global.plugins).length
    const totalreg = Object.keys(global.db.data.users).length
    const uptime = clockString(process.uptime() * 1000)
    const tag = args[0]?.toLowerCase()

    const headerBase = (title) => `
╭════〔 🌺 ${title} 🌺 〕════╮
> │ 🧃 Usuario: @${userId.split('@')[0]}
> │ ⚡ Tipo: ${(conn.user.jid === global.conn.user.jid ? 'Principal 🅥' : 'Prem Bot 🅑')}
> │ 🌐 Modo actual: ${mode}
> │ 👥 Usuarios registrados: ${totalreg}
> │ ⏱️ Tiempo activo: ${uptime}
> │ 💾 Comandos totales: ${totalCommands}
> │ 🥷 Descargas web: ${global.web}
> │ 🤗 NUEVOS: xnxx/tetas/pack
╰════════════════════════════╯
`

    if (!tag || !tags[tag]) {

      const sections = [{
        title: "📂 LISTA DE MENÚS",
        rows: Object.entries(tags).map(([key, value]) => ({
          title: value,
          description: `Ver comandos de ${value}`,
          id: `.menu ${key}`
        }))
      }]

      const msg = generateWAMessageFromContent(m.chat, {
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: headerBase('GABRIEL - UX')
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'GABRIEL-UX BOT'
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [{
              name: 'single_select',
              buttonParamsJson: JSON.stringify({
                title: '🌺 Seleccionar Categoría',
                sections
              })
            }]
          })
        })
      }, { userJid: m.chat })

      return await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    }

    const help = Object.values(global.plugins)
      .filter(p => !p.disabled)
      .map(p => ({
        help: Array.isArray(p.help) ? p.help : (p.help ? [p.help] : []),
        tags: Array.isArray(p.tags) ? p.tags : (p.tags ? [p.tags] : []),
        limit: p.limit,
        premium: p.premium
      }))

    const comandos = help.filter(menu => menu.tags.includes(tag))
    if (!comandos.length)
      return conn.reply(m.chat, 'Sin comandos en esta categoría.', m)

    let menuText = headerBase(`Menu - ${tags[tag]}`)

    menuText += '\n'
    menuText += comandos.map(menu =>
      menu.help.map(cmd =>
        `│ ✦ ${cmd}${menu.limit ? ' ◜⭐◞' : ''}${menu.premium ? ' ◜🪪◞' : ''}`
      ).join('\n')
    ).join('\n')

    menuText += `\n\n👑 © Powered by gabzx`

    await conn.sendMessage(m.chat, {
      text: menuText,
      mentions: [m.sender]
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error al mostrar el menú', m)
  }
}

handler.help = ['menu', 'menu <categoria>']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']
export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}