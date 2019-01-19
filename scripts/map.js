import { getMappedFields } from '../components/mapper';

const dummyFields = [
  'FRITZ!Box 7590 (UI)',
  'B',
  '041711–000',
  '121',
  '533176–734744',
  '147902',
  '840604',
  '28179',
  '1und1',
];


const mappedFields = getMappedFields(dummyFields);

console.log(mappedFields);
