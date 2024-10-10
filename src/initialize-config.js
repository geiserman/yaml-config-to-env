const merge = require('deepmerge');
const { readConfig } = require('./config-reader');

const SEPARATOR = '___';

function readEnvConfigs() {
    return Object.entries(process.env).reduce((acc, [key, value]) => {
        // keep an existing prop for backward compatibility
        acc[key] = value;

        const parts = key.split(SEPARATOR);

        parts.reduce((inner, part, index) => {
            if (index === parts.length - 1) {
                // eslint-disable-next-line no-param-reassign
                inner[part] = value;

                return inner;
            }

            // eslint-disable-next-line no-param-reassign
            inner[part] = inner[part] || {};

            return inner[part];
        }, acc);

        return acc;
    }, {});
}

const initializeConfiguration = ({ environment, configFolderPath = `${process.cwd()}/config` }) => {
    const configVars = readConfig({ configFolderPath, environment });
    const envVars = readEnvConfigs();

    process.env = merge.all([configVars, envVars]);
};

const getConfigParameter = (name) => process.env[name];

const getIntConfigParameter = (name) => parseInt(getConfigParameter(name), 10);

const getBoolConfigParameter = (name) => getConfigParameter(name) === 'true';

module.exports = {
    initializeConfiguration,
    getConfigParameter,
    getBoolConfigParameter,
    getIntConfigParameter,
};
