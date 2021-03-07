const fs = require('fs');
const YAML = require('yamljs');
const files = fs.readdirSync('./src/handlers');

module.exports = () => {
  return files
    .map((f) => fs.readFileSync(`./src/handlers/${f}`, 'utf8'))
    .map((raw) => YAML.parse(raw))
    .reduce((result, handler) => Object.assign(result, handler), {});
};
