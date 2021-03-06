import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
let tags = {
  'main': 'ððžðð',
  'game': 'ððžðð',
  'rpg': 'ððð ððžððð',
  'xp': 'ððð ðŋðžð ððððð',
  'sticker': 'ðððððð',
  'kerang': 'ððððžðð ðžððžðð―',
  'quotes': 'ðððððð',
  'admin': 'ðžðŋððð',
  'group': 'ððððð',
  'internet': 'ðððððððð',
  'anonymous': 'ðžðððððððð ðūððžð',
  'nulis': 'ððððð',
  'downloader': 'ðŋððððððžðŋðð',
  'tools': 'ððððð',
  'canvas': 'ðūðžðððžð',
  'fun': 'ððð',
  'database': 'ðŋðžððžð―ðžðð',
  'quran': 'ðžð ððð'ðžð',
  'owner': 'ððððð',
  'maker': 'ððžððð',
  'advanced': 'ðžðŋððžððūððŋ',
  'audio': 'ðžððŋðð', 
  'premium': 'ððððððð', 
  'info': 'ðððð'
}
const defaultMenu = {
  before: `â­âââââââââââââ âÛŠÛŠā―īā―ŧâļ
â ã %me ã
â ðŧððððð ðžðð ðīððð ðĐðð ð°ðð
â ðšððððð ðšðððð ðšððððð
â
â 
â 
â
â°âŽâââââââââââââ âģđ
ââĪâĶâ ðĄðŪðšðŪ: %name!
âââĶâ ððķðšðķð: %limit Limit
âââĶâ ðŠðŪðļðð: %time
âââĶâ ððĪðĐððĄ ðð­ðĨ: %totalexp
âââĶâ ððĪðĄð: %role
ââ°âââââââââââââ âģđ
â ððŪððŪðŊððē: %rtotalreg ððĒðģðŠ %totalreg
âââââââââââââââââ
â ðĨððŧððķðšð: %uptime
â ð§ðžððŪðđ ðĨððŧððķðšðē: (%muptime)
â°âââââââââââââ âÛŠÛŠā―īā―ŧâļ',

`.trimStart(),
  header: 'â ã %category ã',
  body: 'âââĶâ %cmd %islimit %isPremium',
  footer: 'â
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
    conn.sendHydrated(m.chat, text.trim(), author, cloudbot, 'https://chat.whatsapp.com/Fr0CoRS7RkG1oW9K7ZEEgY', 'ðððððąðð ðķðē', null, null, [
      ['ðģððððð', '/donasi'],
      ['ðšðððððððð', '/ping'],
      ['ðūð ððð', '/owner']
    ], m)
  } catch (e) {
    conn.reply(m.chat, 'ðððð, ððð§ðŪ ððððð§ð  ððŦðŦðĻðŦ', m)
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
