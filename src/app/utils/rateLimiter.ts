import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({

    windowMs : 15 * 60 * 1000,
    limit : 100,

    standardHeaders : true,
    legacyHeaders : true,

    message : {
        success : false,
        message : "Too many request, Please Try again 15 minutes later"
    }

})

export const authRateLimiter = rateLimit({

    windowMs : 15 * 60 * 1000,
    limit : 10,

    standardHeaders : true,
    legacyHeaders: true,

    message : {
        success : false,
        message: "Too many authentication requests, Please try again 15 minutes later"
    }

})