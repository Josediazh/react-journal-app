export const fileUpload = async(file) => {

    if (!file) throw new Error('No se econtraron imagenes'); 

    const cloudURL = 'https://api.cloudinary.com/v1_1/daz74zxea/upload';
    const formData = new FormData();

    formData.append('upload_preset','react-journal');
    formData.append('file',file);
    
    try{

        const resp = await fetch(cloudURL,{
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error('Error al subir la imagen');
        const cloudRes = await resp.json();

        return cloudRes.secure_url;

    }catch(error){
        
        throw new Error(error.message);
    }
}