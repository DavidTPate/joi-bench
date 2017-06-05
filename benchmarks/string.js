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
const testAlphaNumString = testString.replace(/[^a-zA-Z0-9]/g, '');
const testAlphaString = testAlphaNumString.replace(/[^a-zA-Z]/g, '');
const testLowercaseAlphaString = testAlphaString.replace(/[^a-z]/g, '');
const testUppercaseAlphaString = testAlphaString.replace(/[^A-Z]/g, '');
const testNumString = testAlphaNumString.replace(/[^0-9]/g, '');


function exec() {
    const stringSchema = Joi.string();
    const insensitiveSchema = stringSchema.insensitive();
    const creditCardSchema = stringSchema.creditCard();
    const regexSchema = stringSchema.regex(/[a-z]+/);
    const regexNameArgSchema = stringSchema.regex(/[a-z]+/, 'pattern-name');
    const regexInvertSchema = stringSchema.regex(/[a-z]+/, {
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
    const replaceSchema = stringSchema.replace(/\s+/, '');
    const truncateSchema = stringSchema.truncate().max(25);

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
                creditCardSchema.validate('378734493671000');
            }
        }).add({
            name: 'validate-schema#regex',
            fn: function () {
                regexSchema.validate(testAlphaString);
            }
        }).add({
            name: 'validate-schema#regex-name-argument',
            fn: function () {
                regexNameArgSchema.validate(testAlphaString);
            }
        }).add({
            name: 'validate-schema#regex-invert',
            fn: function () {
                regexInvertSchema.validate(testNumString);
            }
        }).add({
            name: 'validate-schema#alphanum',
            fn: function () {
                alphanumSchema.validate(testAlphaNumString);
            }
        }).add({
            name: 'validate-schema#token',
            fn: function () {
                tokenSchema.validate('w0rld_of_w4lm4rtl4bs');
            }
        }).add({
            name: 'validate-schema#email',
            fn: function () {
                emailSchema.validate('joe@example.com');
            }
        }).add({
            name: 'validate-schema#ipv4',
            fn: function () {
                ipSchema.validate('0.0.0.0/32');
            }
        }).add({
            name: 'validate-schema#ipv6',
            fn: function () {
                ipSchema.validate('2001:db8::7/32');
            }
        }).add({
            name: 'validate-schema#ipvfuture',
            fn: function () {
                ipSchema.validate('v1.09azAZ-._~!$&\'()*+,;=:/32');
            }
        }).add({
            name: 'validate-schema#uri',
            fn: function () {
                uriSchema.validate('http://user:pass@mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=');
            }
        }).add({
            name: 'validate-schema#isoDate',
            fn: function () {
                isoDateSchema.validate(testNumString);
            }
        }).add({
            name: 'validate-schema#guid',
            fn: function () {
                guidSchema.validate('D1A5279D-B27D-4CD4-A05E-EFDD53D08E8D');
            }
        }).add({
            name: 'validate-schema#guid-wrapped',
            fn: function () {
                guidSchema.validate('{D1A5279D-B27D-4CD4-A05E-EFDD53D08E8D}');
            }
        }).add({
            name: 'validate-schema#hex',
            fn: function () {
                hexSchema.validate(testNumString);
            }
        }).add({
            name: 'validate-schema#base64',
            fn: function () {
                base64Schema.validate('YW55IGNhcm5hbCBwbGVhc3VyZS4=');
            }
        }).add({
            name: 'validate-schema#hostname',
            fn: function () {
                hostnameSchema.validate('www.example.com');
            }
        }).add({
            name: 'validate-schema#lowercase',
            fn: function () {
                lowercaseSchema.validate(testLowercaseAlphaString);
            }
        }).add({
            name: 'validate-schema#uppercase',
            fn: function () {
                uppercaseSchema.validate(testUppercaseAlphaString);
            }
        }).add({
            name: 'validate-schema#trim',
            fn: function () {
                trimSchema.validate(' ' + testString + ' ');
            }
        }).add({
            name: 'validate-schema#replace',
            fn: function () {
                replaceSchema.validate(testNumString + '\t');
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