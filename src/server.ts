import "module-alias/register";
import app from "@src/app";

const PORT = process.env.PORT || 5002;

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
}
