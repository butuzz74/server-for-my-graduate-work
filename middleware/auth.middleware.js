const tokenService = require("../services/token.service");

module.require = (req, res, next) => {
    if ((req.method = "OPTIONS")) {
        return next();
    }
    try {
        const token = req.header.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorised"
            });
        }
        const data = tokenService.validateAccess(token);
        if (!data) {
            return res.status(401).json({
                message: "Unauthorised"
            });
        }
        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorised"
        });
    }
};
