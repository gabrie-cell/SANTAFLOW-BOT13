import { generateWAMessageContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {

  const start = Date.now()

  let imageUrl = 'https://raw.githubusercontent.com/El-brayan502/img/upload/uploads/236200-1771171302918.jpg'

  const media = await generateWAMessageContent(
    { image: { url: imageUrl } },
    { upload: conn.waUploadToServer }
  )

  const speed = Date.now() - start

  const uptime = process.uptime()
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const seconds = Math.floor(uptime % 60)

  const now = new Date()
  const fecha = now.toLocaleDateString('es-ES')
  const hora = now.toLocaleTimeString('es-ES')

  let userNumber = m.sender.split('@')[0]
  let username = m.pushName || "Usuario"

  const message = {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadataVersion: 1
        },
        interactiveMessage: {
          header: {
            hasMediaAttachment: true,
            ...media
          },
          body: {
            text:
`
ɪɴꜰᴏ ʙᴏᴛ
ʙᴏᴛ : ☘️ ʏᴀᴇ ᴍɪᴋᴜ

*\`ɪɴғᴏ ᴜsᴇʀ\`*
ᴜsᴜᴀʀɪᴏ: ${username}
ɴᴜ́ᴍᴇʀᴏ: ${userNumber}

*\`ʙᴏᴛ ɪɴғᴏ\`*
ғᴇᴄʜᴀ: ${fecha}
ʜᴏʀᴀ: ${hora}
ᴠᴇʟᴏᴄɪᴅᴀᴅ: ${speed} ms
ᴇsᴛᴀᴅᴏ: Online
ᴜᴘᴛɪᴍᴇ: ${hours}h ${minutes}m ${seconds}s
`
          },
          footer: { text: "© Kryzen-MD - System Interface" },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: "Menu Select",
                  sections: [
                    {
                      title: "Opciones",
                      rows: [
                        {
                          title: "📚 All Menu",
                          description: "Ver todos los comandos",
                          id: ".allmenu"
                        },
                        {
                          title: "🪃 Ping",
                          description: "Velocidad del bot",
                          id: ".ping"
                        },
                        {
                          title: "🧀 Estado",
                          description: "Estado del bot",
                          id: ".status"
                        }
                      ]
                    }
                  ]
                })
              },
              {
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                  display_text: "Copiar Código",
                  id: "copy_code",
                  copy_code: "I Love You Brayan Uzumaki 😻"
                })
              },
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: "Canal de WhatsApp",
                  url: "https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i"
                })
              },
              {
                name: 'cta_call',
                buttonParamsJson: JSON.stringify({
                  display_text: "creator number",
                  phone_number: "50231458537"
                })
              }
            ],
            messageParamsJson: JSON.stringify({
              limited_time_offer: {
                text: "Kryzen-MD",
                url: "https://github.com/El-brayan502",
                copy_code: ` `,
                expiration_time: 1754613436864329
              },
              bottom_sheet: {
                in_thread_buttons_limit: 1,
                list_title: "Select Menu",
                button_title: "Menu Select"
              }
            })
          }
        }
      }
    }
  }

  await conn.relayMessage(m.chat, message, { quoted: m })
}

handler.command = ['menu']
handler.tags = ['maim']
handler.help = ['menu']

export default handler