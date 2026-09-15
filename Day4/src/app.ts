import express from "express";
import taskRouter from "./routes/task-routes";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";
import { requestId } from "./middleware/request-id";

const app = express();

app.use(express.json());
app.use(requestId);
app.use(logger);

app.get("/health", (_request, response) => {
    response.status(200).json({
        status: "ok",
    });
});

app.use("/tasks", taskRouter);

app.use(notFound);

app.use(errorHandler);

export default app;
