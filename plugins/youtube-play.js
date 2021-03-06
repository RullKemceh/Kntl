import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Dandelion Slowed`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Tidak ditemukan'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `
๐ *Judul:* ${title}
๐ *Link:* ${url}
๐น *Deskripsi:* ${description}
โฒ๏ธ *Di Publiskasi:* ${publishedTime}
โ *Durasi:* ${durationH}
๐๏ธ *Penonton:* ${viewH}
*Mohon Jangan Spam*
  `.trim(), author, thumbnail, url, '๐บGo To Youtube!', null, null, [
    ['Audio โจ', `${usedPrefix}yta ${url} yes`], 
    ['Video โจ', `${usedPrefix}ytv ${url} yes`],
    ['Youtube Search๐', `${usedPrefix}yts ${url}`]
  ], m)
}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play2?$/i

handler.exp = 0
handler.limit = 3

export default handler

