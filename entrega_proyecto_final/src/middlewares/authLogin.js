import { verifyToken } from "../utils/tokenManagger.js";

export default function valAuthenticate(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ Error: 'user not authenticated' });
    try {
        const verified = verifyToken(token);
        req.user = verified;
        next();
    } catch (e) {
        logger.error(e);
    }
}

