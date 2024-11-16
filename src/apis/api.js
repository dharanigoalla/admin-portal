import axios from 'axios'

const axiosInstance = axios.create({
baseURL:'https://dharaniapi.loca.lt', 
})

 const axiosInstanceLambda = axios.create({
    baseURL : 'https://my.localnest4u.com',
 })
const getServices = async() => {
const response = await axiosInstance.get('/services')
return response.data;
}
const updateService = async(formDataTosend, serviceId)=>{
    const response1 = await axiosInstance.put(`/services/${serviceId}`,formDataTosend)
    return response1.data;
}
const createService = async(formDataTosend)=>{
    const response2 = await axiosInstance.post('/services', formDataTosend)
    return response2.data;
}
const deleteService = async(serviceId)=>{
    const response4 = await axiosInstance.delete(`/services/${serviceId}`)
    return response4.data;
}

const getPreSignedUrl = async(fileName, fileType,folderPath)=>{
    const response = await axiosInstanceLambda.post('/assets/get_singed_url',{
        fileName,
        folderPath,
        fileType,
    });
    return response.data;

}
//const uploadFile = async(file)=>{
    //const response3 = await axiosInstance.get('', )

export {getServices, updateService, createService,getPreSignedUrl}