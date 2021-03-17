
const resoure =  (data)=>{

    return {
        postid:data.id,
        postText:data.body,
        auther:data.user.name,

    }
} 


const collection = (arr)=>{
return {
    data: arr.map(oneObject => resoure(oneObject))
}
}


module.exports = (respons , model_data)=>{
let res_data = {}


if(!Array.isArray(model_data)){
    res_data =  resoure(model_data)
}else{
    res_data = collection(model_data)
}

return respons.json(res_data)

}

