let handler =  m => m.reply(`
╭─「 𝗗𝗢𝗡𝗔𝗦𝗜 」
│ 𝖬𝖺𝗄𝖺𝗌𝗂𝗁 𝖸𝖺𝗇𝗀 𝖴𝖽𝖺𝗁 𝖣𝗈𝗇𝖺𝗌𝗂
│ • https://saweria.co/Itsrullbot
│ 𝘋𝘰𝘯𝘢𝘴𝘪 𝘚𝘦𝘪𝘩𝘬𝘭𝘢𝘴 𝘕𝘺𝘢 𝘈𝘫𝘢 𝘠𝘢 𝘒𝘢𝘬
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
