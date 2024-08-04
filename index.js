const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const staticROutes = require("./routes/stasticROuter")

//For Frentend...
const path = require("path");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/my-Url").then(() =>
  console.log("Mongodb connected")
);

//For Frentend...
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/url", urlRoute);

//staticROutes
app.use("/", staticROutes)

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
