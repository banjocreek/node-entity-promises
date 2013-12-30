## Entity Promises

Promise functions for working with entity models.

## Functions

- createIntroducer: produce a function that augments objects with an id
- introduce: pre-build introducer with an internal id generator
- createCleaner: produce a function that removes persistence cruft


Example:

    var entityp     = require("entity-promises"),
        u           = require("underscore"),
        mongocoll   = ...,
        introduce,
        clean;

    introduce = entityp.createIntroducer(anIdGenerator);  // caller-suppplied id generator
    clean = entityp.createCleaner("_id");                 // remove mongo identifiers

    function entity(spec) {
        ....
    }

    /* create and persist entity instance from specification.  Return a promise of
     * the persisted instance data. 
     */
    exports.create = function (spec) {

        return entity(spec)
            .then(introduce)
            .then(mq.insert)
            .then(u.first)
            .then(clean);
 
    }
