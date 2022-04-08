const listen = (context)=>{
   if(
       (tokenPairIndex==='0' && context.args[1].toString()==='0')
       ||
       (tokenPairIndex==='1' && context.args[2].toString()==='0')

   )
       context.notifySwap(tx)
}

export default listen;