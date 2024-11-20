import axios from 'axios'

const axiosInstance = axios.create({
baseURL:'https://9c3f-2607-fb91-1c61-804f-99ba-d8b3-c27e-7ec5.ngrok-free.app/',
 headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    // Add any other headers you need
  }
})

 const axiosInstanceLambda = axios.create({
    baseURL : 'https://api.localnest4u.com',
 })
const getServices = async() => {
    const response = await axiosInstance.get('/services')
    console.log('services:', response.data);
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
    console.log('deleteid',serviceId );
    return response4.data;
}
 
const getPreSignedUrl = async(fileName,fileType,folderPath = "icons/services")=>{
    try{
    const response = await axiosInstanceLambda.post('/get_signed_url',{
        fileName,
        folderPath,
        fileType,
    });
   console.log("Pre-Signed URL Response:", response.data); 
   return response.data.uploadURL;
    
} catch (error) {
  console.error("Error getting pre-signed URL:", error);
  throw error;
}
};
    

const uploadFileToS3 = async(file, signedUrl) =>{
    
    const response = await axiosInstance.put(signedUrl, file,{
        headers: {
            'Content-Type': file.type, 
          },
     
    });
   // return response.data; 

};
    




export {getServices, updateService, createService, deleteService,getPreSignedUrl,uploadFileToS3}
