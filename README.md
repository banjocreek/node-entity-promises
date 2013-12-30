## Entity Promises

Promise functions for working with entity models.

### Functions

- createIntroducer: Produce a function that augments objects with an id. Invoke with an id generator function. e.g. createIntroducer(intSeq) . 
- introduce: Pre-built introducer with an internal random id generator
- createCleaner: produce a function that removes persistence artifacts. Invoke with a list of hash keys to remove.
- moclean: Pre-built cleaner that removes mongodb persistence ids. e.g. createCleaner("_id") .

Both introducers and cleaners each operate on a single instance or an array of instances.

Example:

    var entityp     = require("entity-promises"),
        u           = require("underscore"),
        q           = require("q"),
        model       = require("./model")
        mongocoll   = require("mongodb-q").connect().collection("trains");

    /* create and persist entity instance from specification.  Return a promise of
     * the persisted instance data. 
     */
    exports.create = function (spec) {

        return q(spec)
            .then(model.train)
            .then(entityp.introduce)
            .then(mongocoll.insert)
            .then(u.first)
            .then(entityp.moclean);
 
    };
    
    
    /* get a list of entities. Return a promise of the fetched instance data.
     */
    exports.list = function () {
        return mongocoll.find()
            .then(entityp.moclean);          // an array of instances
    };
