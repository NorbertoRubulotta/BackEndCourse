
export async function controllerPostImage(req, res, next) {
    try {
        const file = req.file
        if (!file) {
            res.status(400).json({ error: "You need to add a file" })
        }
        res.json({ imgURL: "localhost:8080/" + file.path })
    } catch (error) {
        next(error);
    }
}