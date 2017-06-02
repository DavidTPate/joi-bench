'use strict';
const Joi = require('joi');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const MapResults = require('../common/map').mapResults;

function exec() {
    const stringSchema = Joi.string();
    return new Promise((resolve) => {
        suite.add({
            name: 'create-schema#base',
            fn: function () {
                Joi.string();
            }
        }).add({
            name: 'create-schema#insensitive',
            fn: function () {
                stringSchema.insensitive();
            }
        }).add({
            name: 'create-schema#creditCard',
            fn: function () {
                stringSchema.creditCard();
            }
        }).add({
            name: 'create-schema#regex',
            fn: function () {
                stringSchema.regex(/.+/);
            }
        }).add({
            name: 'create-schema#regex-name-argument',
            fn: function () {
                stringSchema.regex(/.+/, 'some-cool-regex');
            }
        }).add({
            name: 'create-schema#regex-invert',
            fn: function () {
                stringSchema.regex(/.+/, {
                    invert: true
                });
            }
        }).add({
            name: 'create-schema#alphanum',
            fn: function () {
                stringSchema.alphanum();
            }
        }).add({
            name: 'create-schema#token',
            fn: function () {
                stringSchema.token();
            }
        }).add({
            name: 'create-schema#email',
            fn: function () {
                stringSchema.email();
            }
        }).add({
            name: 'create-schema#ip',
            fn: function () {
                stringSchema.ip();
            }
        }).add({
            name: 'create-schema#uri',
            fn: function () {
                stringSchema.uri();
            }
        }).add({
            name: 'create-schema#isoDate',
            fn: function () {
                stringSchema.isoDate();
            }
        }).add({
            name: 'create-schema#guid',
            fn: function () {
                stringSchema.guid();
            }
        }).add({
            name: 'create-schema#hex',
            fn: function () {
                stringSchema.hex();
            }
        }).add({
            name: 'create-schema#base64',
            fn: function () {
                stringSchema.base64();
            }
        }).add({
            name: 'create-schema#hostname',
            fn: function () {
                stringSchema.hostname();
            }
        }).add({
            name: 'create-schema#lowercase',
            fn: function () {
                stringSchema.lowercase();
            }
        }).add({
            name: 'create-schema#uppercase',
            fn: function () {
                stringSchema.uppercase();
            }
        }).add({
            name: 'create-schema#trim',
            fn: function () {
                stringSchema.trim();
            }
        }).add({
            name: 'create-schema#replace',
            fn: function () {
                stringSchema.replace(/.+/, 'hi');
            }
        }).add({
            name: 'create-schema#truncate',
            fn: function () {
                stringSchema.truncate();
            }
        }).on('complete', function onComplete() {
            resolve(MapResults('string-schemas', this));
        }).run({async: true});
    });
}

module.exports = {
    exec: exec
};