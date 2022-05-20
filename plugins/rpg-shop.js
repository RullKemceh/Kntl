const items = {
    buy: {
        limit: {
            money: 50
        },
        potion: {
            money: 500,
        },
        trash: {
            money: 30,
        }
    },
    sell: {
        potion: {
            money: 125,
        },
        trash: {
            money: 20
        }
    }
}

let handler = async (m, { command, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender]
    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    const info = `
𝑮𝒖𝒏𝒂𝒌𝒂𝒏 𝑭𝒐𝒓𝒎𝒂𝒕 *${usedPrefix}${command} [item] [count]*
𝑼𝒔𝒂𝒈𝒆 𝑬𝒙𝒂𝒎𝒑𝒍𝒆: *${usedPrefix}${command} potion 10*
    
📍𝑳𝑰𝑺𝑻 𝑰𝑻𝑬𝑴: 
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `${global.rpg.emoticon(v)} | ${listItems[v][paymentMethod]} ${global.rpg.emoticon(paymentMethod)}`.trim()
    }).join('\n')}
`.trim()
    const item = (args[0] || '').toLowerCase()
    const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (!listItems[item]) return m.reply(info)
    if (command.toLowerCase() == 'buy') {
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`You don't have enough ${global.rpg.emoticon(paymentMethod)} to buy *${total}* ${global.rpg.emoticon(item)}. You need *${(listItems[item][paymentMethod] * total) - user[paymentMethod]}* more ${paymentMethod} to be able to buy`)
        user[paymentMethod] -= listItems[item][paymentMethod] * total
        user[item] += total
        return m.reply(`You bought *${total}* ${global.rpg.emoticon(item)}`)
    } else {
        if (user[item] < total) return m.reply(`You don't have enough *${global.rpg.emoticon(item)}* to sell, you only have ${user[item]} items`)
        user[item] -= total
        user.money += listItems[item].money * total
        return m.reply(`You sold *${total}* ${global.rpg.emoticon(item)}`)
    }
}

handler.help = ['buy', 'sell'].map(v => v + ' [item] [count]')
handler.tags = ['rpg']
handler.command = /^(buy|sell)$/i

handler.disabled = false

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}
