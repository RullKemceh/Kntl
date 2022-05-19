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
𝑹 𝑼 𝑳 𝑳  𝑩 𝑶 𝑻
*[ 𝐏𝐞𝐫𝐛𝐚𝐧𝐲𝐚𝐤 𝐁𝐞𝐫𝐢𝐧𝐭𝐫𝐚𝐤𝐬𝐢 𝐃𝐞𝐧𝐠𝐚𝐧 𝐁𝐨𝐭]*
[ 𝐊𝐞𝐭𝐢𝐤 .menu 𝑼𝒏𝒕𝒖𝒌 𝑴𝒆𝒏𝒂𝒎𝒑𝒊𝒍𝒌𝒂𝒏 𝑭𝒊𝒕𝒖𝒓 𝑩𝒐𝒕 ]
	`.trim())
    }
}
export const disabled = false
