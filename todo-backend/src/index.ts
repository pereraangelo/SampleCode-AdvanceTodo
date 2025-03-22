import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "./routes/TaskRoutes";
import { initializeRecurringTasks } from "./services/RecurringTaskService";

initializeRecurringTasks();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("TODO Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
