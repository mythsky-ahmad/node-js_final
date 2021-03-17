const resoure = (data)=>{

        return {
            userid:data.id,
            password:data.password,
            username:data.name,
            userrole:data.role,
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









// const resourse = (data)=>{
//         return {
//             userid:data.id,
//             password:data.password,
//             username:data.name,
//             userrole:data.role,

//         }
// }

// const collection = (arr)=>{
//     return {
//         //saving in data
//         data : arr.map(objectData => resourse(objectData))
//     }
// }


// module.exports = function (response , modele_data){
//     let res_data = {}
//     if(Array.isArray(modele_data)){
//         res_data= collection(modele_data)
//     }
//      // mean returning just one object
//     else{
//         res_data =  resours(modele_data)
//     }
//     return response.json(res_data )
// }




// const resource = (data) => {
//     return {
//         id: data.id,
//         username: data.name,
//         password:data.password,
//         role:data.role,
//     };
// }
// const collection = (arr) => {
//     return {
//         data: arr.map(record => resource(record))
//     };
// }
// module.exports = function (response, model_data) {
//     res_data = {};
//     // console.log(model_data)
//     if (Array.isArray(model_data)) {
//         res_data = collection(model_data);
//     }
//     else {

//         res_data = resource(model_data);

//     }
//     return response.json(res_data);
// }