export const fields = [
  'model',
  'technology',
  'powerOnHours',
  'restarts',
  'hash 1',
  'hash 2',
  'status',
  'firmware',
  'subfirmware',
  'branding',
  'age',
  'runtime',
] as const satisfies readonly string[];

export type Fields = (typeof fields)[number];
export type FieldMap = Record<Fields, string>;

// export const fieldsShown = [
//   'Model',
//   'Technology',
//   'PowerOnHours',
//   'Restarts',
//   'Firmware',
//   'Branding',
// ] as const satisfies readonly string[];
// export type FieldsShown = (typeof fieldsShown)[number];
// export type FieldsShownMap = {
//   [K in Exclude<FieldsShown, 'PowerOnHours'>]: string;
// } & {
//   'PowerOnHours': Date;
// }

export const technologyMapping = {
  A: 'Annex A',
  B: 'Annex B',
  J: 'Annex J',
  Q: 'Annex Q',
  Cable: 'Cable',
  // ?? : 'GPON',
  // ?? : 'XGS PON',
  // ?? : 'AON',
} as const;
