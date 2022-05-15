import { canLevelUp } from '../lib/levelling.js'
export function before(m) {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup)
        return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++

    if (before !== user.level) {
        m.reply(`
𝐿𝐸𝑉𝐸𝐿 𝑈𝑃!
𝗟𝗲𝘃𝗲𝗹 𝗦𝗲𝗯𝗲𝗹𝘂𝗺𝗻𝘆𝗮: ${before}
𝙇𝙚𝙫𝙚𝙡 𝙎𝙚𝙠𝙖𝙧𝙖𝙣𝙜: ${user.level}
*[ 𝘼𝙪𝙩𝙤 𝙇𝙚𝙫𝙚𝙡 𝙐𝙥]*
	`.trim())
    }
}
export const disabled = false
