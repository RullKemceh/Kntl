let handler =  m => m.reply(`
╭─「 𝑫𝑶𝑵𝑨𝑺𝑰 」
│ 𝑫𝒐𝒏𝒂𝒔𝒊
│ • https://saweria.co/Itsrullbot
│ 𝐕𝐢𝐚 𝐆𝐫𝐨𝐰𝐭𝐨𝐩𝐢𝐚
│ • 𝐊𝐞 𝐎𝐰𝐧𝐞𝐫 :)
│ 
│ 𝐌𝐚𝐤𝐚𝐬𝐢𝐡 𝐘𝐚𝐧𝐠 𝐔𝐝𝐚𝐡 𝐃𝐨𝐧𝐚𝐬𝐢
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
