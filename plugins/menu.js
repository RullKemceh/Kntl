import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
let tags = {
  'main': '𝙼𝙰𝙸𝙽',
  'game': '𝙶𝙰𝙼𝙴',
  'rpg': '𝚁𝙿𝙶 𝙶𝙰𝙼𝙴𝚂',
  'xp': '𝙴𝚇𝙿 & 𝙻𝙸𝙼𝙸𝚃',
  'sticker': 'sᴛɪᴋᴇʀ',
  'kerang': '𝙺𝙴𝚁𝙰𝙽𝙶 𝙰𝙹𝙰𝙸𝙱',
  'quotes': '𝚀𝚄𝙾𝚃𝙴𝚂',
  'admin': '𝙰𝙳𝙼𝙸𝙽',
  'group': '𝙶𝚁𝙾𝚄𝙿',
  'internet': '𝙸𝙽𝚃𝙴𝚁𝙽𝙴𝚃',
  'anonymous': '𝙰𝙽𝙾𝙽𝚈𝙼𝙾𝚄𝚂 𝙲𝙷𝙰𝚃',
  'nulis': '𝙼𝙰𝙶𝙴𝚁 𝙽𝚄𝙻𝙸𝚂',
  'downloader': '𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁',
  'tools': '𝚃𝙾𝙾𝙻𝚂',
  'canvas': '𝙲𝙰𝙽𝚅𝙰𝚂',
  'fun': '𝙵𝚄𝙽',
  'database': '𝙳𝙰𝚃𝙰𝙱𝙰𝚂𝙴',
  'quran': '𝙰𝙻 𝚀𝚄𝚁\'𝙰𝙽',
  'owner': '𝙾𝚆𝙽𝙴𝚁',
  'maker': '𝙼𝙰𝙺𝙴𝚁',
  'advanced': '𝙰𝙳𝚅𝙰𝙽𝙲𝙴𝙳',
  'audio': '𝙰𝚄𝙳𝙸𝙾', 
  'premium': '𝙿𝚁𝙴𝙼𝙸𝚄𝙼', 
  'info': '𝙸𝙽𝙵𝙾'
}
const defaultMenu = {
  before: `╭━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙
│ 「 %me 」
│ 𝑻𝒉𝒂𝒏𝒌𝒔 𝑼𝒅𝒉 𝑴𝒂𝒌𝒆 𝑩𝒐𝒕 𝑰𝒏𝒊
│ 𝑺𝒆𝒎𝒐𝒈𝒂 𝑺𝒆𝒉𝒂𝒕 𝑺𝒆𝒍𝒂𝒍𝒖
│
│ 𝙱𝙾𝚃 𝙱𝚈 𝚁𝚄𝙻𝙻 ☻︎
│ 
│
╰┬────────────┈ ⳹
┌┤◦➛ 𝑵𝒂𝒎𝒂: %name!
││◦➛ 𝑳𝒊𝒎𝒊𝒕: %limit Limit
││◦➛ 𝑾𝒂𝒌𝒓𝒖: %time
││◦➛ 𝑻𝒐𝒕𝒂𝒍 𝑬𝒙𝒐: %totalexp
││◦➛ 𝑹𝒐𝒍𝒆: %role
│╰────────────┈ ⳹
│ 𝙳𝚊𝚝𝚊𝚋𝚊𝚜𝚎: %rtotalreg 𝙳𝚊𝚛𝚒 %totalreg
├────────────────
│ 𝑹𝒖𝒏𝒕𝒊𝒎𝒘: %uptime
│ 𝑻𝒐𝒕𝒂𝒍 𝑹𝒖𝒏𝒕𝒊𝒎𝒆: (%muptime)
╰━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙',

`.trimStart(),
  header: '╭━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙\n│ 「 %category 」\n╰┬────────────┈ ⳹\n┌┤ 𝐽𝑎𝑛𝑔𝑎𝑛 𝐷𝑖 𝑆𝑝𝑎𝑚',
  body: '││◦➛ %cmd %islimit %isPremium',
  footer: '│╰────────────┈ ⳹\n│ 𝐓𝐚𝐧𝐠𝐠𝐚𝐥: %week, %date \n╰━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙',
  after: ``,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({})))
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
    const cloudbot = './src/Rull.jpg'
    conn.sendHydrated(m.chat, text.trim(), author, cloudbot, 'https://chat.whatsapp.com/Fr0CoRS7RkG1oW9K7ZEEgY', '𝚁𝚞𝚕𝚕𝙱𝚘𝚝 𝙶𝙲', null, null, [
      ['𝙳𝚘𝚗𝚊𝚜𝚒', '/donasi'],
      ['𝙺𝚎𝚌𝚎𝚙𝚊𝚝𝚊𝚗', '/ping'],
      ['𝙾𝚠𝚗𝚎𝚛', '/owner']
    ], m)
  } catch (e) {
    conn.reply(m.chat, '𝐌𝐚𝐚𝐟, 𝐌𝐞𝐧𝐮 𝐒𝐞𝐝𝐚𝐧𝐠 𝐄𝐫𝐫𝐨𝐫', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
