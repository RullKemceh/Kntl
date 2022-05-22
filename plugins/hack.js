const rewards = {
  exp: 9000000000,
  money: 900000000,
  potion: 900000000,
}
const cooldown = 1
let handler = async (m) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastclaim < cooldown) throw `You have already claimed this daily claim!, wait for *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  m.reply(text.trim())
  user.lastclaim = new Date * 1
}
handler.help = ['hack', 'hackuang']
handler.tags = ['owner']
handler.command = /^(hack|hackuang)$/i
handler.owner = true

handler.cooldown = cooldown

export default handler
