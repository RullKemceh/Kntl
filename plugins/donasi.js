let handler =  m => m.reply(`
╭─「 Donasi 」
│ Donasi Seikhlasnya Bg
│ • https://saweria.co/Itsrullbot
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
