/**
 * Cache Management
 *
 * @author Thomas Dupont
 */

class CacheService {

    constructor ()
    {
        this.cache          = {};
        this.timeoutManager = {};
    }

    /**
     *
     * @param {string} key
     * @param {string} value value to cache
     * @param expire default 10 hours in second
     */
    set(key, value, expire = 36000)
    {
        if (typeof expire !== "undefined" && (typeof expire !== "number" || isNaN(expire) || expire <= 0)) {
            throw new Error("Cache timeout must be a positive number");
        }
        this.cache[key] = value;
        this.timeoutManager[key] = setTimeout(() => {
            this.del(key);
        }, expire * 1000);
        return this;
    }

    /**
     *
     * @param {string} key
     * @returns {*}
     */
    get(key)
    {
        return this.cache[key];
    }

    /**
     *
     * @param {string} key
     * @returns {boolean}
     */
    has(key)
    {
        return typeof this.cache[key] !== "undefined";
    }

    /**
     *
     * @param {string} key
     * @returns {CacheService}
     */
    del(key)
    {
        delete this.cache[key];
        clearTimeout(this.timeoutManager[key]);
        return this;
    }
}

module.exports.cacheService = new CacheService();