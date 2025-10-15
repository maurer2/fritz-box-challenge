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
] as const satisfies readonly string[];

export type Fields = (typeof fields)[number];
export type FieldValueMap = Record<Fields, string>;

export const technologyMapping = {
  A: 'Annex A',
  B: 'Annex B',
  J: 'Annex J',
  Q: 'Annex Q',
  Cable: 'Cable',
  'Annex unbekannt': 'Unknown',
  // ?? : 'GPON',
  // ?? : 'XGS PON',
  // ?? : 'AON',
} as const;
