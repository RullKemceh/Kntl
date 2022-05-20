export async function all(m) {
    if (!m.isGroup)
        return
    let chats = global.db.data.chats[m.chat]
    if (!chats.expired)
        return !0
    if (+new Date() > chats.expired) {
        await this.reply(m.chat, '𝘽𝙮𝙚𝘽𝙮𝙚🖐 𝙗𝙤𝙩 𝙖𝙠𝙖𝙣 𝙠𝙚𝙡𝙪𝙖𝙧!!')
        await this.groupLeave(m.chat)
        chats.expired = null
    }
}
