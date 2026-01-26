const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));

// ✅ STATIC FILES (THIS IS THE KEY LINE)
app.use(express.static(path.join(__dirname, "public")));

// Serve React frontend from Client/dist
app.use(express.static(path.join(__dirname, "../Client/dist")));

// APIs
app.use("/gov", require("./routes/gov.data.routes"));

app.use("/api/wqi", require("./routes/wqi.rout"));
app.use("/gov", require("./routes/gov.auth.routes"));

// error handler
app.use(require("./middlewares/error.middleware").errorResponse);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
