const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const staticRoutes = require("./routes/stasticROuter"); // Fixed typo in the file name
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middleware/auth"); // Correct spelling

// For Frontend...
const path = require("path");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/my-Url").then(() =>
  console.log("Mongodb connected")
);

// For Frontend...
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// Routes
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute); // Correct spelling
app.use("/user", userRoutes);

// Static Routes
app.use("/", staticRoutes);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
