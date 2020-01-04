/* eslint-disable no-undef */
'use strict';

const ConfigUtil = require('../src');

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('test get not existing key', () => {

    it('verifies it should return default', async () => {

        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_not_existing', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('default');
    });
});

describe('test get common key', () => {

    it('verifies it should return common value', async () => {

        process.env['stage_env'] = null;
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_comm', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('common value');
    });
});

describe('test get common key under development env', () => {

    it('verifies it should return common value', async () => {

        process.env['stage_env'] = 'development'; 
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_comm', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('common value');
    });
});

describe('test get common key under production env', () => {

    it('verifies it should return common value', async () => {

        process.env['stage_env'] = 'production'; 
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_comm', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('common value');
    });
});

describe('test get key_all', () => {

    it('verifies it should return default config value', async () => {

        process.env['stage_env'] = null;
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_all', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('default config value');
    });
});

describe('test get key_all under development env specified by 2nd arg', () => {

    it('verifies it should return development config value', async () => {

        const config = new ConfigUtil(require('./test-config.js'), 'development');
        const value = config.get('key_all', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('development config value');
    });
});

describe('test get key_all under production env by specified 2nd arg', () => {

    it('verifies it should return production config value', async () => {

        const config = new ConfigUtil(require('./test-config.js'), 'production');
        const value = config.get('key_all', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('production config value');
    });
});

describe('test get key_all under development env', () => {

    it('verifies it should return development config value', async () => {

        process.env['stage_env'] = 'development';
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_all', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('development config value');
    });
});

describe('test get key_all under production env', () => {

    it('verifies it should return production config value', async () => {

        process.env['stage_env'] = 'production';
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_all', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('production config value');
    });
});

describe('test get key_dev', () => {

    it('verifies it should return default', async () => {

        process.env['stage_env'] = null;
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_dev', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('default');
    });
});

describe('test get key_dev under production env', () => {

    it('verifies it should return default', async () => {

        process.env['stage_env'] = 'production';
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_dev', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('default');
    });
});

describe('test get key_pro under development', () => {

    it('verifies it should return default', async () => {

        process.env['stage_env'] = 'development';
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_pro', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('default');
    });
});

describe('test get key_pro under production env', () => {

    it('verifies it should return production only value', async () => {

        process.env['stage_env'] = 'production';
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_pro', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('production only value');
    });
});

describe('test get key_dev under development env', () => {

    it('verifies it should return development only value', async () => {

        process.env['stage_env'] = 'development';
        const config = new ConfigUtil(require('./test-config.js'));
        const value = config.get('key_dev', 'default');

        //console.log(value);
        assert.isNotNull(value);
        expect(value).to.be.an('string');
        expect(value).equals('development only value');
    });
});
