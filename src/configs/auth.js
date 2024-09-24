module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default", //usei o md5hash site to generate
    expiresIn: "1d"
  }
}