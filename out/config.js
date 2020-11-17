"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//configuration information 
exports.Config = {
    serverport: process.env.PORT || 3000,
    secret: process.env.SECRET || "some-secret-goes-here",
    tokenLife: 1800,
    url: process.env.MONGOURL || "mongodb://localhost:27017/"
    //mongodb://localhost:27017/
};
//# sourceMappingURL=config.js.map