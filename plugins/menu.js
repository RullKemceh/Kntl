import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
let tags = {
  'main': '𝙈𝘼𝙄𝙉',
  'game': '𝙂𝘼𝙈𝙀',
  'rpg': '𝙍𝙋𝙂 𝙂𝘼𝙈𝙀𝙎',
  'xp': '𝙀𝙓𝙋 𝘿𝘼𝙉 𝙇𝙄𝙈𝙄𝙏',
  'sticker': '𝙎𝙏𝙄𝙆𝙀𝙍',
  'kerang': '𝙆𝙀𝙍𝘼𝙉𝙂 𝘼𝙅𝘼𝙄𝘽',
  'quotes': '𝙌𝙐𝙊𝙏𝙀𝙎',
  'admin': '𝘼𝘿𝙈𝙄𝙉',
  'group': '𝙂𝙍𝙊𝙐𝙋',
  'internet': '𝙄𝙉𝙏𝙒𝙍𝙉𝙀𝙏',
  'anonymous': '𝘼𝙉𝙊𝙉𝙔𝙈𝙊𝙐𝙎 𝘾𝙃𝘼𝙏',
  'nulis': '𝙉𝙐𝙇𝙄𝙎',
  'downloader': '𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍',
  'tools': '𝙏𝙊𝙊𝙇𝙎',
  'canvas': '𝘾𝘼𝙉𝙑𝘼𝙎',
  'fun': '𝙁𝙐𝙉',
  'database': '𝘿𝘼𝙏𝘼𝘽𝘼𝙎𝙀',
  'quran': '𝘼𝙇 𝙌𝙐𝙍'𝘼𝙉',
  'owner': '𝙊𝙒𝙉𝙀𝙀',
  'maker': '𝙈𝘼𝙆𝙀𝙍',
  'advanced': '𝘼𝘿𝙑𝘼𝙉𝘾𝙀𝘿',
  'audio': '𝘼𝙐𝘿𝙄𝙊', 
  'premium': '𝙋𝙍𝙀𝙈𝙄𝙐𝙈', 
  'info': '𝙄𝙉𝙁𝙊'
}
const defaultMenu = {
  before: `╭━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙
│ 「 %me 」
│ 𝑻𝒉𝒂𝒏𝒌𝒔 𝑼𝒅𝒉 𝑴𝒂𝒌𝒆 𝑩𝒐𝒕 𝑰𝒏𝒊
│ 𝑺𝒆𝒎𝒐𝒈𝒂 𝑺𝒆𝒉𝒂𝒕 𝑺𝒆𝒍𝒂𝒍𝒖
│
│ 
│ 
│
╰┬────────────┈ ⳹
┌┤◦➛ 𝗡𝗮𝗺𝗮: %name!
││◦➛ 𝗟𝗶𝗺𝗶𝘁: %limit Limit
││◦➛ 𝗪𝗮𝗸𝘁𝘂: %time
││◦➛ 𝙏𝙤𝙩𝙖𝙡 𝙀𝙭𝙥: %totalexp
││◦➛ 𝙍𝙤𝙡𝙚: %role
│╰────────────┈ ⳹
│ 𝗗𝗮𝘁𝗮𝗯𝘀𝗲: %rtotalreg 𝘋𝘢𝘳𝘪 %totalreg
├────────────────
│ 𝗥𝘂𝗻𝘁𝗶𝗺𝘄: %uptime
│ 𝗧𝗼𝘁𝗮𝗹 𝗥𝘂𝗻𝘁𝗶𝗺𝗲: (%muptime)
╰━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙',

`.trimStart(),
  header: '│ 「 %category 」',
  body: '││◦➛ %cmd %islimit %isPremium',
  footer: '│
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
