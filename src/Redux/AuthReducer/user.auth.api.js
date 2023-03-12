import axios from "axios"

export const registerUserApi = async(data)=>{
    try{    
        const res = await axios.post(`http://localhost:4000/register`,data)
        return res
    }catch(err){
        console.log(err)
    }
}
export const loginUserApi = async(data)=>{
    try{    
        const res = await axios.post(`http://localhost:4000/login`,data)
        return res.data
    }catch(err){
        console.log(err)
    }
}