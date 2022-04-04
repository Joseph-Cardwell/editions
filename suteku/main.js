require('dotenv').config()

const TeleBot = require('telebot');
const ethers = require("ethers");

let slimBotStartMessage

const httpProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/')

const slimBot = new TeleBot(process.env.TELEGRAM_TOKEN)

const erc20ABI = '[{"constant": true, "inputs": [], "name": "name", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "approve", "outputs": [{"name": "", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transferFrom", "outputs": [{"name": "", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "decimals", "outputs": [{"name": "", "type": "uint8"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "_owner", "type": "address"}], "name": "balanceOf", "outputs": [{"name": "balance", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "symbol", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transfer", "outputs": [{"name": "", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}], "name": "allowance", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"payable": true, "stateMutability": "payable", "type": "fallback"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {"indexed": true, "name": "spender", "type": "address"}, {"indexed": false, "name": "value", "type": "uint256"}], "name": "Approval", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "from", "type": "address"}, {"indexed": true, "name": "to", "type": "address"}, {"indexed": false, "name": "value", "type": "uint256"}], "name": "Transfer", "type": "event"}]'
const pairABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]'

const pairWBNBContractAddress = process.env.TOKEN_PAIR_WBNB_ADDRESS
const pairWBNBContract = new ethers.Contract(pairWBNBContractAddress,pairABI,httpProvider)
const tokenPairWBNBIndex = process.env.TOKEN_PAIR_WBNB_INDEX

const pairBUSDContractAddress = process.env.TOKEN_PAIR_BUSD_ADDRESS
const pairBUSDContract = new ethers.Contract(pairBUSDContractAddress,pairABI,httpProvider)
const tokenPairBUSDIndex = process.env.TOKEN_PAIR_BUSD_INDEX

const busdWbnbPairAddres = process.env.BUSD_WBNB_PAIR
const busdWbnbPairContract = new ethers.Contract(busdWbnbPairAddres,pairABI,httpProvider)

const tokenContractAddress = process.env.TOKEN_ADDRESS
const tokenContract = new ethers.Contract(tokenContractAddress,erc20ABI,httpProvider)

const tokenLabel = process.env.TOKEN_LABEL
const bigBuyWBNBThreshold = process.env.TOKEN_BIGBUY_WBNB_THRESHOLD
const bigBuyBUSDThreshold = process.env.TOKEN_BIGBUY_BUSD_THRESHOLD

const chartURL='https://coinmarketcap.com/currencies/'+process.env.CHART_URL
const txBaseURL='https://bscscan.com/tx/'
const buyBaseURL='https://app.sokuswap.finance/bsc/#/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency='

const defaultChatId = process.env.DEFAULT_CHAT_ID

const bigBuyImages =[
    process.env.BIGBUY_IMAGE1,
    process.env.BIGBUY_IMAGE2,
    process.env.BIGBUY_IMAGE3,
    process.env.BIGBUY_IMAGE4,
    process.env.BIGBUY_IMAGE5,
    process.env.BIGBUY_IMAGE6,
    process.env.BIGBUY_IMAGE7,
    process.env.BIGBUY_IMAGE8
]

const regBuyImages=[
    process.env.REGBUY_IMAGE1,
    process.env.REGBUY_IMAGE2,
    process.env.REGBUY_IMAGE3,
    process.env.REGBUY_IMAGE4
]

let lastThreeBigBuyImages=[];
let lastThreeRegBuyImages=[];

let tokenDecimals
let tokenTotalSupply

let listening

const getBnbPrice = async ()=>{
    let reserves = await busdWbnbPairContract.getReserves()
    return parseInt(reserves[1])/parseInt(reserves[0])
}

const getBalance = async (address)=>{
    const balance = await tokenContract.balanceOf(address)
    return balance/(10**tokenDecimals);
}

const getDate=()=>{
    return (new Date()) .toLocaleTimeString(
        'en-US',
        {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC'}
        )
    //  3/30/2022 8:31:42 PM (UTC)
}

const getMessageFromTx = (tx) => {
    let spent =  tx.bnbIn !== undefined
        ?
            `${tx.bnbIn.toString()}($${formatNum(tx.valueUSD)})`
        :
            `$${formatNum(tx.valueUSD)}`

    let output =
        `Someone new just bought ${tokenLabel} :
        💙💙💙💙💙💙💙💙💙💙 
        ${tx.datetime} (UTC)
        Spent: ${spent} 
        Got:  ${tx.tokenOut} ${tokenLabel} 
        Price: $${tx.tokenPrice}
        MCap: $${tx.mcap}
        ${tx.newBuyer?"~~~New Investor~~~":""}
        New Balance:${tx.balance} ${tokenLabel}`

    return output
}

const sendMessage=async (transaction) => {
    let message=getMessageFromTx(transaction);

    if(message !== ''){
        let inline_keyboard = {
            inline_keyboard: [[
                {
                    text:"TX",
                    url: txBaseURL+transaction.txHash
                },
                {
                    text: "CHART",
                    url: chartURL
                },
                {
                    text: "BUY",
                    url: buyBaseURL+tokenContractAddress
                }
            ]]
        } ;

        return await slimBot.sendMessage(
            slimBotStartMessage.chat.id,
            message,
            {
                parseMode:"HTML",
                replyMarkup: inline_keyboard,
                webPreview: false
            }
        ).catch(console.error);
    }
}

const getAnimation = (isBigBuy)=>{
    let id
    if(isBigBuy){
        while(lastThreeBigBuyImages.includes(id = Math.floor(Math.random() * bigBuyImages.length)) ){}
        if(lastThreeBigBuyImages.length >=3)
            lastThreeBigBuyImages.shift()
        lastThreeBigBuyImages.push(id)
        return bigBuyImages[id]
    }
    else{
        while(lastThreeRegBuyImages.includes(id = Math.floor(Math.random() * regBuyImages.length)) ){}
        if(lastThreeRegBuyImages.length >=3)
            lastThreeRegBuyImages.shift()
        lastThreeRegBuyImages.push(id)
        return regBuyImages[id]
    }
}

const sendAnimation=async (animation)=>{
    return await slimBot.sendAnimation(
        slimBotStartMessage.chat.id,
        animation,
        {webPreview: false}
    ).catch(console.error);
}

const formatNum = (str) => {
    return parseFloat(str).toLocaleString();
}

const listen = async()=>{
    listening = true
    tokenDecimals = await tokenContract.decimals()
    tokenTotalSupply = (await tokenContract.totalSupply())/(10**tokenDecimals)

    pairWBNBContract.on('Swap',async (...args) => {
        if(
            (tokenPairWBNBIndex==='0' && args[1].toString()==='0')
            ||
            (tokenPairWBNBIndex==='1' && args[2].toString()==='0')
        ){
            let bnbIn,tokenOut
            let transaction = {}

            transaction.bnbPrice = await getBnbPrice();

            transaction.txHash = args[6].transactionHash

            transaction.buyer = args[5]

            if (tokenPairWBNBIndex === '0') {
                bnbIn = args[2].toString()
                tokenOut = args[3].toString()
            } else {
                bnbIn = args[1].toString()
                tokenOut = args[4].toString()
            }

            transaction.tokenOut = tokenOut/(10**tokenDecimals)
            transaction.bnbIn = bnbIn/(10**18)
            transaction.datetime = getDate()
            transaction.balance = await getBalance(transaction.buyer)
            transaction.newBuyer = transaction.balance <= transaction.tokenOut
            transaction.tokenPerBNB = bnbIn/tokenOut
            transaction.tokenPrice = ( transaction.tokenPerBNB * transaction.bnbPrice ).toFixed(8);
            transaction.valueUSD = transaction.bnbPrice *transaction.bnbIn
            transaction.mcap = ( transaction.tokenPrice * tokenTotalSupply ).toFixed(2);

            let animation= getAnimation(transaction.bnbIn>bigBuyWBNBThreshold)

            await sendMessage(transaction).then(()=>sendAnimation(animation))
        }
    })


    pairBUSDContract.on('Swap',async (...args) => {
        if(
            (tokenPairBUSDIndex==='0' && args[1].toString()==='0')
            ||
            (tokenPairBUSDIndex==='1' && args[2].toString()==='0')
        ){
            let busdIn,tokenOut, transaction = {}

            transaction.txHash = args[6].transactionHash

            transaction.buyer = args[5]

            busdIn = parseInt(args[1].toString())
            tokenOut = parseInt(args[4].toString())

            transaction.busdIn = busdIn/(10**18)
            transaction.tokenOut = tokenOut/(10**tokenDecimals)
            transaction.datetime = getDate()
            transaction.balance = await getBalance(transaction.buyer)
            transaction.newBuyer = transaction.balance <= transaction.tokenOut
            transaction.tokenPrice = (transaction.busdIn/transaction.tokenOut).toFixed(8);
            transaction.valueUSD = transaction.busdIn
            transaction.mcap = ( transaction.tokenPrice * tokenTotalSupply ).toFixed(2);

            let animation= getAnimation(transaction.busdIn>bigBuyBUSDThreshold)

            await sendMessage(transaction).then(()=>sendAnimation(animation))
        }
    })
}

const mute = ()=>{
    busdWbnbPairContract.off('Swap',()=>{})
    pairBUSDContract.off('Swap',()=>{})
    listening=false
}

slimBot.on('/start', async (msg) => {
    let user = await slimBot.getChatMember(msg.chat.id, msg.from.id)
    if(user.status === "creator" || user.status === "admin"){
        slimBotStartMessage = msg
        msg.reply.text( 'updating has started\n' + '/stop to stop receiving updates\n' )
        if(!listening){
            await listen()
        }
    }
})

slimBot.on('/stop',  (msg) => {
    if(msg.user.status === "creator" || msg.user.status === "admin"){
        msg.reply.text( 'updating has stopped\n')
        mute()
    }
})

const start = async ()=>{
    slimBotStartMessage = {chat:{id:defaultChatId}}
    await listen()
    slimBot.start()
}

start()



