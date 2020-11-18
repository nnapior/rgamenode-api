"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//configuration information 
exports.Config = {
    serverport: process.env.PORT || 3000,
    secret: process.env.SECRET || "some-secret-goes-here",
    tokenLife: 1800,
    url: process.env.MONGOURL ||
        //"mongodb://rgamenodeapi:F9D3Og0FnewyxieL1zQ7bXIhjir7vIUv@nh2.gsn.io:9000/rgamenode?retryWrites=true&w=majority"
        "mongodb://localhost:27017/"
};
//# sourceMappingURL=config.js.map