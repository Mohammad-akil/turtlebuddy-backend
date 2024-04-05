import crypto from "crypto";

export default  () => crypto.randomBytes(50).toString("hex");