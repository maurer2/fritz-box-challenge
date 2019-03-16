module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/libs/*.{js,jsx}',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ]
};
