require('dotenv').config();
const fs = require('fs')

const TeleBot = require('telebot');
const slimBot = new TeleBot(process.env.TELEGRAM_TOKEN)
const tokenLabel1 = process.env.TOKEN_LABEL
const tokenContractAddress = process.env.TOKEN_ADDRESS

let imagesFileIds=[]

let images =[
    process.env.BIGBUY_IMAGE1,
    process.env.BIGBUY_IMAGE2,
    process.env.BIGBUY_IMAGE3,
    process.env.BIGBUY_IMAGE4,
    process.env.BIGBUY_IMAGE5,
    process.env.BIGBUY_IMAGE6,
    process.env.BIGBUY_IMAGE7,
    process.env.BIGBUY_IMAGE8,
    process.env.REGBUY_IMAGE1,
    process.env.REGBUY_IMAGE2,
    process.env.REGBUY_IMAGE3,
    process.env.REGBUY_IMAGE4
]


const sendAnimation = async(image)=>{
     let response = await slimBot.sendAnimation(
         -629398138,
        image,
        {width:"100",height:"200",thumbs:{width:"100",height:"200",file_id:"AAMCAQADGQMAA7NiR5q-_nU67rOTotz056gfi1-NnwACQAgAAi14QEabtJhAfOOL5wEAB20AAyME"}}
    ).catch(console.error)
    return response
}

const run = async ()=>{
    for(let image of images){
        let response = await sendAnimation(image)
        let file_id= response.video ? response.video.file_id : response.animation.file_id
        imagesFileIds[image] = file_id
        setTimeout(()=>{},2000)
        fs.writeFile('./test.txt', image+":"+file_id+"\n", { flag: 'a+' }, err => {})
    }

    console.log(imagesFileIds)
}

run()




