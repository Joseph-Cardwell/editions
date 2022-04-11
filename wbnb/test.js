require('dotenv').config();

const TeleBot = require('telebot');
const slimBot = new TeleBot(process.env.TELEGRAM_TOKEN)
const tokenLabel1 = process.env.TOKEN_LABEL
const tokenContractAddress = process.env.TOKEN_ADDRESS



const sendMessage=async () => {
    let transaction = {
        "bnbPrice": 478.9576172013209,
        "txHash": "0xf030532395378463d291bb05f454feea79954b4dba0560c03310ef287a35595d",
        "buyer": "0x8EE4899534A83774EE2DF97ECC496c11d3a2B660",
        "tokenOut": 904466446.204114,
        "bnbIn": 1e-7,
        "datetime": "4/1/2022, 08:41:47 PM",
        "animation": "gifs/big/5.mp4",
        "balance": 47606511267353.33,
        "newBuyer": false,
        "tokenPerBNB": 1.1056242099381614e-7,
        "tokenPrice": "0.00005295",
        "valueUSD": 0.00004789576172013209,
        "mcap": "52.95"
    }

    let message = getMessageFromTx(transaction);

    if(message !== ''){
        let inline_keyboard = {
            inline_keyboard: [[
                {
                    text:"TX",
                    url:`https://testnet.bscscan.com/tx/${transaction.txHash}`
                },
                {
                    text: "CHART",
                    url: `https://coinmarketcap.com/currencies/centcex/`
                },
                {
                    text: "BUY",
                    url: `https://app.sokuswap.finance/bsc/#/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=${tokenContractAddress}`
                }
            ]]
        }

        return await slimBot.sendMessage(
            -629398138,
            message,
            {
                parseMode:"HTML",
                caption:message,
                replyMarkup: inline_keyboard,
                webPreview: false
            }
        ).catch(console.error);
    }
}

const sendAnimation = async()=>{
    return await slimBot.sendVideo(
        -629398138,
        "gifs/big/2.mp4",
        {width:100,height:200}
    ).catch(console.error)
}

const getMessageFromTx = (tx) => {
    let output = ''
    output +=
    `Someone new just bought ${tokenLabel1} :
    💙💙💙💙💙💙💙💙💙💙 
    ${tx.datetime} (UTC)
    Spent:  ${tx.bnbIn.toString()}($${formatNum(tx.valueUSD)})
    Got:  ${tx.tokenOut} ${tokenLabel1} 
    Price: $${tx.tokenPrice}
    MCap: $${tx.mcap}
    ${tx.newBuyer?"~~~New Investor~~~":""}
    New Balance:${tx.balance} ${tokenLabel1}`

    return output
}

// Formats number string
const formatNum = (str) => {
    return parseFloat(str).toLocaleString();
}
sendAnimation().then(sendMessage())


