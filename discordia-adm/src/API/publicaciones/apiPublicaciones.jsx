
  import axios from 'axios';



  const obtenerPublicaciones = async (jwt) => {
    const url = "https://us-central1-discordia-db.cloudfunctions.net/api/publicacion";
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    };
  
    try {
      const response = await axios.get(url, config);
      console.log('Respuesta:', response.data);
      return response.data;
    } catch (error) {
      // Manejar errores
      console.error('Error:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente que llama a esta función
    }
  };
  
  
  
  
  const dataPublicaciones = [
    {
      titulo: 'Evento call of duty',
      slug: 'publicacion-1',
      content: 'l evento Rebirth Island propone desafíos junto a toda la comunidad de Call of Duty: Warzone. Al completarlos recibirás una bonificación de experiencia y se desbloqueará un elemento en el mapa para todos los jugadores. La promoción se extenderá a lo largo de tres semanas, es decir, hasta el 13 de abril.',
      author: '@elDanixDan'
    },
    {
      titulo: 'Valorant: Nuevos campeones',
      slug: 'publicacion-2',
      content: `La última Ley VALORANT de 2023 ya casi está aquí y, como siempre, nos traerá una gran cantidad de contenido emocionante en el juego. Además del inevitable nuevo pase de batalla, colección de armas, reinicio de rango y otros cambios obligatorios, VALORANT Capítulo 7 Parte 3 nos regalará un nuevo agente duelista después de una larga espera de un año y medio.

      Después de introducir algunos cambios en el agente de alteración meta y un nuevo mapa, Sunset, la secuela del Capítulo Siete, el Acto Dos ahora se acerca a su final, y el cronómetro del juego muestra el 31 de octubre como su último día. La nueva ley comenzará poco después de que Riot complete una sesión de mantenimiento del servidor.`,
      author: '@macacoOficial'
    }
  ];

  
  
  
  

  const crearPublicacion = async (data) => {

  
    const urlPost = "https://us-central1-discordia-db.cloudfunctions.net/api/publicacion/agregarPublicacion";
  
    const postData = {
      titulo: `${data.titulo}`,
      contenido: `${data.contenido}`,
      tipo: `${data.tipo}`,
      autor: `${data.autor}`,
    };
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.jwt}`,
      },
    };
  
    try {
      const response = await axios.post(urlPost, postData, config);
      console.log('Respuesta:', response.data);
      return response.data;
    } catch (error) {
      // Manejar errores
      console.error('Error:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente que llama a esta función
    }
  };
  

  
  const countPOST = async (data) => {

  
    const urlPost = "https://us-central1-discordia-db.cloudfunctions.net/api/publicacion/countPublicaciones";
  
    const postData = {
      userId: `${data.nombre}`,
    };
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.jwt}`,
      },
    };
  
    try {
      const response = await axios.post(urlPost, postData, config);
      console.log('Respuesta:', response.data);
      return response.data;
    } catch (error) {
      // Manejar errores
      console.error('Error:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente que llama a esta función
    }
  };


export { dataPublicaciones, crearPublicacion, obtenerPublicaciones, countPOST};