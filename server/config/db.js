const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        // Il prend automatiquement la bonne URI configurée dans l'environnement actuel
        const uri = process.env.MONGO_URI;
        
        if (!uri) {
            throw new Error("La variable MONGO_URI n'est pas définie dans le fichier .env !");
        }

        await mongoose.connect(uri);
        console.log("Database connected (stock management)");
    } catch (error) {
        console.error("Database error : ", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;