import QueryComponent from '../components/query-box';

const query = new QueryComponent('http://fritz.box/cgi-bin/system_status');

query.getData()
  .then((data) => {
    const htmlString = data;
    const regex = new RegExp(/<body[^>]*>(.*?)<\/body>/is);

    const parsedHtmlString = htmlString.match(regex);

    return (parsedHtmlString !== null) ? parsedHtmlString[1] : '';
  })
  .then((data) => {
    console.log(data);
    return data;
  });
