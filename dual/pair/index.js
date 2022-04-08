import PairTransactionTransformer from "./pairTransactionTransformer";

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

listening = true




class pair{
    constructor(pairConfig){
        let pairTransactionTransformer = new PairTransactionTransformer(pairConfig)
    }

    listen(context){
        this.pairContract.on('Swap',async (...args) => {
            context.notifySwap(...args )
        })
    }
}