import "express-async-errors";

import express           from "express";
import cors              from "cors";
import dotenv            from "dotenv";
import bodyParser        from "body-parser";
import { PrismaClient }  from "@prisma/client";
import { 
  userRoute, 
  scheduleRoute,
  eventRouter,
  extraFieldRouter
}                        from "./routes/index";
import { serverError }   from "./middleware/index";
import { visitedRouter } from "./routes/visited.route";

dotenv.config();

export const app    = express();
export const port   = process.env.PORT as string;
export const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/schedule', scheduleRoute);
app.use('/event', eventRouter);
app.use('/visited', visitedRouter);
app.use('/extraField', extraFieldRouter);

app.use(serverError)

if (process.env.NODE_ENV !== 'production') {
  server.listen(port, () => {
    console.log(`Server started at port ${port}!`);
  });
}

export default app;
