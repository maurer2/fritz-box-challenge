import axios from 'axios';

const url = 'http://fritz.box/cgi-bin/system_status';

axios({
  url,
  method: 'get',
})
  .then(response => response.data)
  .catch((error) => {
    if (error.response) {
      console.log(error.response.status);
    }
  })
  .then((response) => {
    console.log(response);

    return response;
  });
