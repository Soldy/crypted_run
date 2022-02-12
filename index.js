'use strict';
const crypto = require('crypto');

const cryptedClass = function(secret_, ciphers){
    const _secret = crypto.createHash('sha256').update(secret_).digest();
    const _ciphers = ciphers_;
    const _encode = function(data){
        let encode_vector = Buffer.alloc(16, 0);
        const encoder = crypto.createCipheriv(_ciphers, _secret, encode_vector);
        let out = encoder.update(data, 'utf8', 'hex');
        out += encoder.final('utf8');
        return out;
    };
    const _decode = function(data){
        let _decode_vector = Buffer.alloc(16, 0);
        const decoder = crypto.createDecipheriv(_ciphers, _secret, decode_vector);
        let out = decoder.update(data, 'hex', 'utf8');
        out += decoder.final('utf8');
        return out;
    };
    if(!crypto.getCiphers().includes(ciphers_))
        throw Error('not "'+ciphers_.toString()+'" supported ');
}


exports.cryptedClass = cryptedClass ; 
