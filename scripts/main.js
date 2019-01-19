import QueryComponent from '../components/modem';
import SplitterComponent from '../components/splitter';
import { mapper } from '../components/mapper';

const query = new QueryComponent('http://fritz.box/cgi-bin/system_status');
const splitter = new SplitterComponent();

query.getData()
  .then((data) => {
    const htmlString = data;
    const regex = new RegExp(/<body[^>]*>(.*?)<\/body>/is);

    const parsedHtmlString = htmlString.match(regex);

    return (parsedHtmlString !== null) ? parsedHtmlString[1] : '';
  })
  .then((data) => {
    console.log(data);
    const splitComponents = splitter.generateParts(data);

    return splitComponents;
  })
  .then((data) => {
    console.log(data);
  });
