import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongodbConfig from "./config/config.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import listingRoutes from './routes/listing.routes.js'

dotenv.config();
mongodbConfig();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Rutas de la aplicación
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
