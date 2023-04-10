export const fieldsMappings = [
  'model',
  'technology',
  'powerOnHours 1',
  'powerOnHours 2',
  'restarts',
  'hash 1',
  'hash 2',
  'status',
  'firmware',
  'subfirmware',
  'branding',
] as const; // satisfies string[];

export const technologyMapping = {
  A: 'Annex A',
  B: 'Annex B',
  J: 'Annex J',
  Q: 'Annex Q',
  Cable: 'Cable',
  // ?? : Fibre
} as const;
