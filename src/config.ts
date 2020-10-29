// configuration information
export const Config = {
    serverport: process.env.PORT || 3000,
    secret: process.env.SECRET || "some-secret-goes-here",
    tokenLife: 1800,
    url: process.env.MONGOURL || "mongodb+srv://rgamenodeapi:F9D3Og0FnewyxieL1zQ7bXIhjir7vIUv@nh2.gsn.io:9000/rgamenode?retryWrites=true&w=majority"
};
