// by dv.shadow - https://github.com/Yuji-XDev

import { proto } from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { conn }) => {
  const name = 'G͜͡A͜͡B͜͡X͜͡Z͜͡-͜͡X͜͡Y͜͡R͜͡O͜͡';
  const numCreador = '+51941658192';
  const empresa = 'M͜͡T͜͡S͜͡U͜͡R͜͡Y͜͡ B͜͡O͜͡T͜͡ Inc.';
  const about = '🥭Desarrollador de M͜͡I͜͡T͜͡S͜͡U͜͡R͜͡Y͜͡ Bot';
  const correo = 'doxeosjr@gmail.com';
  const web = 'https://www.atom.bio/musicflotudio_22';
  const direccion = 'Tokyo, Japón 🇯🇵';
  const fotoPerfil = 'https://files.catbox.moe/4nqbz6.png';

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa}
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:${correo}
URL:${web}
NOTE:${about}
ADR:;;${direccion};;;;
X-ABADR:ES
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim();

  const contactMessage = {
    displayName: name,
    vcard
  };
  m.react('🍂');
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [contactMessage]
    },
    contextInfo: {
    mentionedJid: [m.sender],
      externalAdReply: {
        title: '⚡ Contacto del Creador xyro-gabxz',
        body: 'Toca aquí para guardar el contacto o hablar con él',
        mediaType: 1,
        thumbnailUrl: fotoPerfil,
        renderLargerThumbnail: true,
        sourceUrl: web
      }
    }
  }, { quoted: fkontak });
};

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['creador', 'creator', 'owner'];
export default handler;
