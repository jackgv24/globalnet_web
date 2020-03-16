/**
 * @param {string} value
 * @returns {boolean}
 */
Array.valArray = function(value) {
    if(!Array.isArray(value)) return false;
    if(value.length<=0) return false;
    return true;
}