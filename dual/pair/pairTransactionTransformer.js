import WbnbTransactionTransformer from "./pairs/wbnbTransactionTransformer";


class PairTransactionTransformer{
    transformer
    constructor(pairConfig){
        if(pairConfig.pairtype === 'wbnb'){
            require('./pairs/wbnbTransactionTransformer')
            this.transformer = new WbnbTransactionTransformer(pairConfig)
        }

        if(pairConfig.pairtype === 'busd'){
            this.transformer = new busdTransactionTransformer(pairConfig)
        }
    }

    transform(transaction){
        transaction = this.transformer.transform(transaction)
    }


}

export default PairTransactionTransformer