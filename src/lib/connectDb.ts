import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?:number
}
const connections:ConnectionObject ={}

async function connectDb(){
    try {
        if(connections.isConnected){
            console.log("Already connected to database ");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URL||"")
        connections.isConnected = db.connections[0].readyState
        console.log("Connection successfully")
    } catch (error) {
        console.log("Connection failed")   
        process.exit(1)

    }



}
export default connectDb