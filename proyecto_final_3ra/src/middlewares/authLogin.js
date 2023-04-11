export default function valAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).json({ Error: 'user not authenticated' });
    }
}