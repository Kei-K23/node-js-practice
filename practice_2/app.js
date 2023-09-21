import express from "express";
import https from "node:https";
import bodyParser from "body-parser";
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  const options = {
    hostname: "bored-api.appbrewery.com",
    path: "/random",
    method: "GET",
  };

  const request = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const result = JSON.parse(data);
        console.log(result);
        res.render("index.ejs", {
          result,
        });
      } catch (err) {
        console.error("Failed to parse response", err.message);
        res.status(500).send("Failed to fetch activity. Please try again");
      }
    });
  });

  request.on("error", (err) => {
    console.error("Failed to fetch data", err.message);
    res.status(500).send("Failed to fetch data");
  });

  request.end();
});

app.post("/", (req, res) => {
  const { type, participants } = req.body;
  console.log(type, participants);
  const options = {
    hostname: "bored-api.appbrewery.com",
    path: `/filter?type=${type}&participants=${participants}`,
    method: "GET",
  };

  const request = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        console.log(data);
        const result = JSON.parse(data);
        res.render("index.ejs", {
          result,
        });
      } catch (e) {
        console.log("Failed to parse data", e.message);
        res.status(500).send("Failed to parse data");
      }
    });
  });

  request.on("error", (e) => {
    console.log("Failed to fetch data", e.message);
    res.status(500).send("Failed to fetch data");
  });

  request.end();
});

app.listen(port, () => console.log(`Server is running on prot ${port}`));
