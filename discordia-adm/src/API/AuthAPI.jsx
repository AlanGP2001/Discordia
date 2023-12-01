
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

export { authLogin }