

const resoure = (data) => {
    const thisYear = new Date().getFullYear()
    const carAge = thisYear - data.model
    console.log( carAge)
    return {
        the_carname: data.carName,
        the_car_age: carAge,
        the_car_owner : data.user.name

    }
}


const collection = (arr) => {
    return {
        data: arr.map(oneObject => resoure(oneObject))
    }
}


module.exports = (respons, model_data) => {
    let res_data = {}


    if (!Array.isArray(model_data)) {
        res_data = resoure(model_data)
    } else {
        res_data = collection(model_data)
    }

    return respons.json(res_data)

}
