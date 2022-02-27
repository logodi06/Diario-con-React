

export const fileUpload = async ( file ) => {
    //lugar a donde se quiere subir
    const cloudUrl = 'https://api.cloudinary.com/v1_1/ds8mgpdjr/upload';

    //se creea un formData para enviarlo que necesita
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file );

    try {
        const resp = await fetch( cloudUrl,{
            method: 'POST',
            body: formData
        } );

        if(resp.ok) {
            const cloudResp = await resp.json();
            //retorna el URL de la imagen
            return cloudResp.secure_url;

        }else{
            throw await resp.json();
        }

    } catch (error) {
        throw error;
    }


   
}