import config from "./config";

import express from "express";
import bearerToken from "express-bearer-token";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import { initializeApp, credential } from "firebase-admin";
import * as functions from "firebase-functions";

// Initialize Firebase.
if (config.env === "production") {
    // Use the default options as we will run the app on Cloud Functions.
    initializeApp();
} else if (config.gac) {
    initializeApp({
        credential: credential.cert(config.gac),
    });
} else {
    throw Error("No Google Application Credentials (GAC) provided. Download the service-account.json file!");
}

const app = express();
// Initialize middlewares.
app.use(logger("combined"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bearerToken());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://crypto-tracker-192f2.web.app",
            "https://crypto-tracker-192f2.firebaseapp.com",
            "https://cryptrac.h-it.tirol",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
    }),
);

// Initialize routes.
import routes from "./routes";
app.use("/api/v1", routes);

export const server = functions.https.onRequest(app);
