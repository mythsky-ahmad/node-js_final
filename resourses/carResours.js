const resours = (data)=>{
    return{
        the_carname : data.carName ,
        the_car_age : data.model ,
        the_car_holder : data.user.name
    }

}





const collection = function (arr){
    return {
        date : arr.map(obj =>resours(obj) )
    }
}


module.exports = (respons , model_data) => {  
    const res_data= {}
    if(Array.isArray(model_data)){
        res_data = collection(model_data)
    }  else{
        res_data = resours(model_data)
    }          
    return respons.json(res_data)
}