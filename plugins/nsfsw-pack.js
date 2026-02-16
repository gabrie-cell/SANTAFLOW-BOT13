import fetch from 'node-fetch';

let handler = async(m, { conn, usedPrefix, command }) => {

m.react('🕑');

const gp = global.db.data.chats[m.chat] || {};

if (!gp.nsfw && m.isGroup) return m.reply('[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .nsfw on');

let txt = 'Pack🔥🔥🔥';

let img = 'https://api.delirius.store/nsfw/girls';

m.react('✅');
// viva el porno jodido 
conn.sendMessage(m.chat, { 
        image: { url: img }, 
        caption: txt, 
        footer: dev, 
        buttons: [
            {
                buttonId: `.pack`,
                buttonText: { displayText: 'Siguiente' }
            },
            {
                buttonId: '.tetas',
                buttonText: { displayText: 'Tetas' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.help = ['pack'];
handler.tag = ['emox'];
handler.command = ['pack', 'loli'];

export default handler;