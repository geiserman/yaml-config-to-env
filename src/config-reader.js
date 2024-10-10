const fs = require('fs');
const YAML = require('yaml');

function readConfig({ configFolderPath, environment }) {
    const yamlConfigFile = fs.readFileSync(
        `${configFolderPath}/${environment}.values.yaml`,
        'utf8',
    );

    const { configVars } = YAML.parse(yamlConfigFile);

    return configVars;
}

module.exports = {
    readConfig,
};
