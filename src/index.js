'use strict'

const ENV_NAME = 'stage_env';

class ConfigUtil {
    constructor(config_file, stage_env) {
        if (config_file) {
            this.config = require(config_file);
        } else {
            this.config = require('../../../config.js');  // project root directory
        }
        if (stage_env) {
            this.stage_env = stage_env;
        } else {
            if (process.env.hasOwnProperty(ENV_NAME) && 
                process.env[ENV_NAME]) {
                this.stage_env = process.env[ENV_NAME].trim();
            } else {
                this.stage_env = 'development';
            }
        }
        this.values = {};
    }

    get(name, default_value = null) {
        if (this.values.hasOwnProperty(name)) {
            return this.values[name];
        }
        let value = default_value;
        if (process.env.hasOwnProperty(name) && process.env[name]) {
            const s = process.env[name].trim();
            if ((s.startsWith('{') && s.endsWith('}')) ||
                (s.startsWith('[') && s.endsWith(']'))) {
                value = JSON.parse(s);
            } else {
                value = s;
            }
        } else if (this.config.hasOwnProperty(this.stage_env) &&
            this.config[this.stage_env].hasOwnProperty(name)) {
            value = this.config[this.stage_env][name];
        } else if (this.config.hasOwnProperty(name)) {
            value = this.config[name];
        }
        this.values[name] = value;
        return value;
    }
}

module.exports = ConfigUtil;