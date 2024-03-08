import mongoose, { mongo } from "mongoose";

const connectDb = async()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://dhavalll63:dks123@cluster0.c8vw6id.mongodb.net/dhavalll')
     console.log("connection to db is succesfull");    
}catch(e){
    console.error(`nhk ${e}`)
    process.exit(1)
}
}

export {connectDb}