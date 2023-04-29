import { logger } from "../persistence/loggers/logger.js";

export async function controllerPostImage(req, res, next) {
    try {
        const file = req.file
        if (!file) {
            res.status(400).json({ error: "You need to add a file" })
        }
        res.json({ imgURL: file.path })
    } catch (error) {
        logger.error(error.message)
        res.json({ error: `Error uploading image`, description: error.message });
    }
}