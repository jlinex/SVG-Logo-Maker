/** @type {import('jest').Config} */
const config = {
  transformIgnorePatterns: ['/node_modules/(?!(foo|bar)/)', '/bar/'],
};

module.exports = config;
