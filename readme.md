    const ConfigUtil = require('@samwen/config-util');
      
    const config = new ConfigUtil(require('./config.js'));

    console.log('key_all = ' + config.get('key_all'));

stage_env=production node index.js
key_all=new_value node index.js

Here is a typical configuration file to support multiple running environments:

    // test-config.js
    
    const config = {

        key_comm: 'common value',

        key_all: 'default config value',

        development: {
            key_all: 'development config value',
            key_dev: 'development only value'

        },
        production: {
            key_all: 'production config value',
            key_pro: 'production only value'
        },

    }
    
    module.exports = config;

