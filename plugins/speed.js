import { cpus as _cpus, totalmem, freemem } from 'os'
import util from 'util'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
let handler = async (m, { conn }) => {
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
  const used = process.memoryUsage()
  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })
  let old = performance.now()
  await m.reply('_𝑀𝑒𝑛𝑔𝑢𝑘𝑢𝑟 𝐾𝑒𝑐𝑒𝑝𝑎𝑡𝑎𝑛 𝐵𝑜𝑡..._')
  let neww = performance.now()
  let speed = neww - old
  m.reply(`
𝑀𝑒𝑟𝑒𝑠𝑝𝑜𝑛 𝐷𝑎𝑙𝑎𝑚 ${speed} 𝑀𝑖𝑙𝑖𝑑𝑒𝑡𝑖𝑘

💬 𝑆𝑇𝐴𝑇𝑆 :
- *${groupsIn.length}* Group Chats
- *${groupsIn.length}* Groups Joined
- *${groupsIn.length - groupsIn.length}* Groups Left
- *${chats.length - groupsIn.length}* Personal Chats
- *${chats.length}* Total Chats

💻 *Server Info* :
𝑀𝐸𝑀𝑂𝑅𝐼 𝑇𝐸𝑅𝑃𝐴𝐾𝐴𝐼: ${format(totalmem() - freemem())}
𝑇𝑂𝑇𝐴𝐿 𝑀𝐸𝑀𝑂𝑅𝐼: ${format(totalmem())}

_NodeJS Memory Usage_
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}

${cpus[0] ? `_𝑇𝑂𝑇𝐴𝐿 𝐶𝑃𝑈 𝑈𝑆𝐴𝐺𝐸_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

_𝐶𝑃𝑈 𝑐𝑜𝑟𝑒(𝑠) 𝑈𝑠𝑎𝑔𝑒 (${cpus.length} 𝐶𝑜𝑟𝑒 𝐶𝑃𝑈)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim())
}
handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']

handler.command = /^(ping|speed|info)$/i
export default handler
