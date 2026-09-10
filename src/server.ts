import { app } from "./app";
import { seedAdmin } from "./app/utils/seedAdmin";
const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
    try {
        await seedAdmin(); 
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

bootstrap();