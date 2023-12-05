
import axios from 'axios'

const url = "https://us-central1-discordia-db.cloudfunctions.net/api"

const authLogin = () =>{
    axios.post(`${url}/login`)
      .then(function (response) {
        console.log("ewae",response.data);
      })
      .catch(function (error) {
        console.log("ewqeqwe",error);
      });
}
const actualizarPerfil = async (data) => {
  const urlPost = "https://us-central1-discordia-db.cloudfunctions.net/api/Comunidad/agregarComunidad";


  const postData = {
    user: data.user,
    detalle: 'Actualiza tu informacion',
    followers: data.followers,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.jwt}`,
    },
  };

  try {
    const response = await axios.post(urlPost, postData, config);
    //console.log('Respuesta:', response.data);
    return await response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado en el componente que llama a esta función
  }

}

const crearUsuarioComunidad = async (data) => {
  const urlPost = "https://us-central1-discordia-db.cloudfunctions.net/api/Comunidad/editar/:id";


  const postData = {
    user: data.user,
    detalle: 'Actualiza tu informacion',
    followers: data.followers,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.jwt}`,
    },
  };

  try {
    const response = await axios.post(urlPost, postData, config);
    //console.log('Respuesta:', response.data);
    return await response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado en el componente que llama a esta función
  }
}


export { authLogin , crearUsuarioComunidad , actualizarPerfil}