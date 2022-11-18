import "module-alias/register";
import app from "@src/app";
import { logger } from "@src/utils/configLogger";

const PORT = process.env.PORT || 5002;

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        logger.info(`Start server Listening on port ${PORT}`);
    });
}
