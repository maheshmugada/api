const { hash } = require("bcryptjs");

exports.doHash = (value, saltValue)=>{
    const result = hash(value, saltValue);
    return result;
}
exports.doHashValidation = (value,hashValue)=>{
    const result = compare(value, hashValue) 
    return result;
}