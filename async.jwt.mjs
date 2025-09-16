import jwt from "jsonwebtoken"
const asyncJwtSign = (payload, secret) => {
    return new promise ((resolve, reject) => {
        jwt.sign(payload,secret,(err, token ) => {
            if (err) {
                return reject(err)
            }
            resolve(token)
        })   
    })
}

const asyncJwtVerify = (token, secret) => {
    return new promise  (( resolve, reject) => {
        jwt.verify(token, secret, (err, token) =>  {
            if (err) {
                return reject(err)
            }
            resolve(token)
        })
    })
}


export { asyncJwtSign, asyncJwtVerify }