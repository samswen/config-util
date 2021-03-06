/* eslint-disable no-prototype-builtins */
'use strict'

const process = require('process');

const ENV_NAME = 'stage_env';

class ConfigUtil {
    constructor(config, stage_env) {
        if (!config) {
            throw new Error('missing required config!');
        }
        this.config = config;
        if (stage_env) {
            this.stage_env = stage_env;
            process.env[ENV_NAME] = stage_env; // help for pass to child process
        } else {
            if (process.env.hasOwnProperty(ENV_NAME) && 
                process.env[ENV_NAME]) {
                this.stage_env = process.env[ENV_NAME].trim();
            } else {
                this.stage_env = 'development';
                process.env[ENV_NAME] = this.stage_env; // help for pass to child process
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

    set(name, value) {
        this.values[name] = value;
    }
}

module.exports = ConfigUtil;
