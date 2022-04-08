
class pairListener{
    constructor(context){
        this.context = context
    }

    listen(){
        this.context.pairContract.on('Swap',async (...args) => {
            this.context.notifySwap(...args )
        })
    }
}