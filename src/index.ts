/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

/**
 * App Variables
 */

if(!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string) || 7000;

const app = express();

/**
 *  App Configuration
 */

app.use(cors());
app.use(helmet());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => console.log(`Express server listening on ${PORT}...`));