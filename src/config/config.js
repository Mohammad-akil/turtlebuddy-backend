import dotenv from "dotenv";
dotenv.config();

export default {
  database: {
    local_uri: process.env.DB_LOCAL_URI ||  'mongodb://127.0.0.1:27017/turtle-buddy',
  },
  certificate: {
    privkey: process.env.PRIVKEY_PATH || "path to priv key",
    fullchain: process.env.FULLCHAIN_PATH || "path to fullchain key",
  },
  jwt: {
    secret: process.env.JWT_SECRET|| 'ujkiolnbg5gfd3ef2dffgh8',
    registerExpire: process.env.JWT_REGISTER_EXPIRES_TIME || "1h",
    accessExpire: process.env.JWT_ACCESS_EXPIRES_TIME || "90d",
  },
  email: {
    fromEmail: process.env.EMAIL_FROM,
  },
  nodemailer: {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE || false,
    auth: {
      user: process.env.EMAIL_USERNAME ,
      pass: process.env.EMAIL_PASSWORD ,
    },
  },

  tokenExpiryTime: process.env.OTPTOKENEXPTIME || 3600000, //1 hour
  loginTokenExpiryTime: process.env.LOGINTOKENEXPIRYTIME || 3600000,
  appPath: process.env.APPPATH || "http://localhost:4000",
  protocol: process.env.PROTOCOL || "http",
  port: process.env.PORT || 4000,
};
