let handler =  m => m.reply(`
β­βγ π«πΆπ΅π¨πΊπ° γ
β π«πππππ
β β’ https://saweria.co/Itsrullbot
β ππ’π ππ«π¨π°π­π¨π©π’π
β β’ ππ ππ°π§ππ« :)
β 
β πππ€ππ¬π’π‘ πππ§π  ππππ‘ ππ¨π§ππ¬π’
β°ββββ
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
