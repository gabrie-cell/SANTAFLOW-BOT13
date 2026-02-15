import { File } from 'megajs';
import path from 'path';
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let [animeId, episode = 1] = text.split(',').map(v => v.trim());

    if (!animeId) {
      return m.reply(`🍂 𝙵𝚘𝚛𝚖𝚊𝚝𝚘 𝚒𝚗𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚘.\n\n🧾 𝚄𝚜𝚘 𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚘:\n${usedPrefix + command} <anime-id>, <capítulo>\n\n🌀 Ejemplo:\n${usedPrefix + command} to-love-ru-ova, 1`);
    }

    if (isNaN(episode) || episode <= 0) {
      return m.reply('⚠️ El número de episodio debe ser válido y mayor que 0.');
    }

    const apiUrl = `https://animeflvapi.vercel.app/download/anime/${animeId}/${episode}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('⚠️ Error al obtener datos de la API');

    const { servers } = await response.json();
    if (!servers || !servers[0]) throw new Error('⚠️ No se encontraron servidores disponibles');

    const megaServer = servers[0].find(server => server.server === 'mega');
    if (!megaServer || !megaServer.url) throw new Error('⚠️ No se encontró el enlace de MEGA');

    const file = File.fromURL(megaServer.url);
    await file.loadAttributes();

    if (file.size >= 300 * 1024 * 1024) {
      return m.reply('🚫 El archivo es demasiado grande (máximo 300MB)');
    }

    await m.reply('*⏳ Descargando episodio, por favor espera...*');

/*await conn.loadingMsg(m.chat, '🌸 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙉𝘿𝙊 𝘼𝙉𝙄𝙈𝙀 🌸\n\n⏳ Espere un momento, descargando desde MEGA...', `✅ Enviando archivo`, [
      "▰▱▱▱▱ ᴄᴀʀɢᴀɴᴅᴏ...",
      "▰▰▱▱▱ ᴄᴀʀɢᴀɴᴅᴏ...",
      "▰▰▰▱▱ ᴄᴀʀɢᴀɴᴅᴏ...",
      "▰▰▰▰▱ ᴄᴀʀɢᴀɴᴅᴏ...",
      "▰▰▰▰▰ ᴄᴀʀɢᴀɴᴅᴏ..."
    ], m);*/

    const caption = `
╭─═☆彡〔 𝗠𝗜𝗧𝗦𝗨𝗥𝗬 彡〕☆═─╮
│  (•̀ᴗ•́)و💥 ¡Anime listo para ti!
│━━━━━━━━━━━━━━━━━━━━━━━
│🎬 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦𝐚: AnimeFLV 🌐
│📁 𝐓í𝐭𝐮𝐥𝐨: ${animeId} Ep. ${episode}
│📦 𝐓𝐚𝐦𝐚ñ𝐨: ${formatBytes(file.size)}
│
│💫 Disfruta tu episodio, ¡𝗠𝗶𝘁𝘀𝘂𝗿𝘆 te cubre la maratón! ▶️✨
╰─═☆彡〔 Santaflow Anime DL 〕☆═─╯
`;

    const dataBuffer = await file.downloadBuffer();
    const fileExtension = path.extname(file.name).toLowerCase();

    const mimeTypes = {
      ".mp4": "video/mp4",
      ".pdf": "application/pdf",
      ".zip": "application/zip",
      ".rar": "application/x-rar-compressed",
      ".7z": "application/x-7z-compressed",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
    };

    const mimetype = mimeTypes[fileExtension] || "application/octet-stream";
    await conn.sendFile(m.chat, dataBuffer, file.name, caption, m, null, { mimetype, asDocument: true });

  } catch (error) {
    console.error(error);
    return m.reply(`❌ Error: ${error.message}`);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

handler.help = ['animeflvdl <anime-id>, <episodio>'];
handler.tags = ['downloader'];
handler.command = ['animeflvdl', 'anidl'];
handler.group = true;

export default handler;