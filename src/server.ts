import { app } from "./app";
const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
    try {
   
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

bootstrap();