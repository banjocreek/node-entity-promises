/*jslint node: true */
"use strict";

var u           = require("underscore"),
    uuid        = require("uuid");

/**
 * Random uuid from id module is as secure as we get right now. 
 * 
 * @returns
 */
function secureId() {
    return uuid.v4().toLowerCase();
}

/**
 * Introduction prepares a new entity instance for interop.
 * 
 * @param idgen id generator function. defaults to secureId.
 * 
 * @returns promise function for introducing new entity instances.
 */
function createIntroducer(idgen) {

    idgen = idgen || secureId;

    function introduceOne(target) {
        target.id = idgen();
        return target;
    }

    return function (target) {
        return u.isArray(target)
            ? u.map(target, introduceOne)
            : introduceOne(target);
    };
}

/**
 * Cleaning removes persistence-related keys from an object.
 * 
 * @param first
 * @returns {Function}
 */
function createCleaner(keys) {
    keys = u.isArray(keys) ? keys : [].slice.call(arguments);

    function cleanOne(target) {
        return u.omit(target, keys);
    }

    return function (target) {
        return u.isArray(target)
            ? u.map(target, cleanOne)
            : cleanOne(target);
    };
}

/*
 * create an introducer from an id generator.
 */
exports.createIntroducer = createIntroducer;

/*
 * default introducer.
 */
exports.introduce = createIntroducer();

/*
 * create a cleaner from a list of keys to remove.
 */
exports.createCleaner = createCleaner;




