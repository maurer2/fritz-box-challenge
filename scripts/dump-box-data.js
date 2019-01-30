import getData from '../libs/modem';
import dumpData from '../libs/dumper';

const url = 'http://fritz.box/cgi-bin/system_status';

getData(url).then((data) => {
  dumpData(data);
});
