import ethers from "ethers";

class WbnbTransactionTransformer {
    constructor (...args){
        let pairConfig = args[0]

        const getBnbPrice = async ()=>{
            let reserves = await busdWbnbPairContract.getReserves()
            return parseInt(reserves[1])/parseInt(reserves[0])
        }

        const busdWbnbPairAddres = process.env.BUSD_WBNB_PAIR
        const busdWbnbPairContract = new ethers.Contract(busdWbnbPairAddres,pairABI,httpProvider)

        let tokenDecimals = await pairconfig.tokenTargetWbnbBuyContract.decimals()
        let tokenTotalSupply = (await pairconfig.tokenTargetWbnbBuyContract.totalSupply())/(10**tokenDecimals)
        let tokenPairIndex = await getTokenPairIndex()

        const transform = await (transactionData) => {
            let bnbIn,tokenOut,transaction={}

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

            const balance = await tokenTargetWbnbBuyContract.balanceOf(transaction.buyer)

            transaction.balance = balance/(10**tokenDecimals)

            transaction.tokenOut = tokenOut/(10**tokenDecimals)
            transaction.bnbIn = bnbIn/(10**18)
            transaction.datetime = getDate()
            transaction.balance = await getBalance(transaction.buyer)
            transaction.newBuyer = transaction.balance <= transaction.tokenOut
            transaction.tokenPerBNB = bnbIn/tokenOut
            transaction.tokenPrice = ( transaction.tokenPerBNB * transaction.bnbPrice ).toFixed(8)
            transaction.valueUSD = transaction.bnbPrice *transaction.bnbIn
            transaction.mcap = ( transaction.tokenPrice * tokenTotalSupply ).toFixed(2)
        }
    }
}

export default WbnbTransactionTransformer