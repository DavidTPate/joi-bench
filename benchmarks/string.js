'use strict';
const Joi = require('joi');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const MapResults = require('../common/map').mapResults;

const charCodes = [];
// Build a set of ASCII character codes from 32 (space) to 126 (tilde)
for (let i = 32, il = 127; i < il; i++) {
    charCodes.push(i);
}

const testString = String.fromCharCode.apply(null, [].concat(charCodes, charCodes));

function exec() {
    const stringSchema = Joi.string();
    const insensitiveSchema = stringSchema.insensitive();
    const creditCardSchema = stringSchema.creditCard();
    const regexSchema = stringSchema.regex(/./);
    const regexNameArgSchema = stringSchema.regex(/./, 'some-cool-regex');
    const regexInvertSchema = stringSchema.regex(/./, {
        invert: true
    });
    const alphanumSchema = stringSchema.alphanum();
    const tokenSchema = stringSchema.token();
    const emailSchema = stringSchema.email();
    const ipSchema = stringSchema.ip();
    const uriSchema = stringSchema.uri();
    const isoDateSchema = stringSchema.isoDate();
    const guidSchema = stringSchema.guid();
    const hexSchema = stringSchema.hex();
    const base64Schema = stringSchema.base64();
    const hostnameSchema = stringSchema.hostname();
    const lowercaseSchema = stringSchema.lowercase();
    const uppercaseSchema = stringSchema.uppercase();
    const trimSchema = stringSchema.trim();
    const truncateSchema = stringSchema.truncate();
    return new Promise((resolve) => {
        suite.add({
            name: 'validate-schema#base',
            fn: function () {
                stringSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#insensitive',
            fn: function () {
                insensitiveSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#creditCard',
            fn: function () {
                creditCardSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#regex',
            fn: function () {
                regexSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#regex-name-argument',
            fn: function () {
                regexNameArgSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#regex-invert',
            fn: function () {
                regexInvertSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#alphanum',
            fn: function () {
                alphanumSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#token',
            fn: function () {
                tokenSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#email',
            fn: function () {
                emailSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#ip',
            fn: function () {
                ipSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#uri',
            fn: function () {
                uriSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#isoDate',
            fn: function () {
                isoDateSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#guid',
            fn: function () {
                guidSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#hex',
            fn: function () {
                hexSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#base64',
            fn: function () {
                base64Schema.validate(testString);
            }
        }).add({
            name: 'validate-schema#hostname',
            fn: function () {
                hostnameSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#lowercase',
            fn: function () {
                lowercaseSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#uppercase',
            fn: function () {
                uppercaseSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#trim',
            fn: function () {
                trimSchema.validate(testString);
            }
        }).add({
            name: 'validate-schema#replace',
            fn: function () {
                stringSchema.replace(/./, 'hi');
            }
        }).add({
            name: 'validate-schema#truncate',
            fn: function () {
                truncateSchema.validate(testString);
            }
        })
            .on('complete', function onComplete() {
            resolve(MapResults('string', this));
        }).run({async: true});
    });
}

module.exports = {
    exec: exec
};