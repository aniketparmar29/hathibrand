import axios from "axios"

export const registerUserApi = async(data)=>{
    try{    
        const res = await axios.post(`https://real-cyan-swallow-boot.cyclic.app/register`,data)
        return res
    }catch(err){
        console.log(err)
    }
}
export const loginUserApi = async(data)=>{
    try{    
        const res = await axios.post(`https://real-cyan-swallow-boot.cyclic.app/login`,data)
        return res.data
    }catch(err){
        console.log(err)
    }
}
