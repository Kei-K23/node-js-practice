import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const app = express();
const port = 4000;
dotenv.config();
const baseURL = "https://secrets-api.appbrewery.com";

app.get("/", (req, res) => {
  res.render("index.ejs", {
    content: "connect with sever",
  });
});

app.get("/no_auth", async (req, res) => {
  try {
    const response = await axios.get(baseURL + "/random", {
      responseType: "text",
    });
    const data = response.data;
    res.render("index.ejs", {
      content: data,
    });
  } catch (e) {
    res.render("index.ejs", {
      content: `Error ${e}`,
    });
  }
});

app.get("/basic", async (req, res) => {
  try {
    const response = await axios.get(baseURL + "/all?page=1", {
      auth: {
        username: process.env.USER_NAME,
        password: process.env.USER_PASSWORD,
      },
      responseType: "text",
    });
    const data = response.data;

    res.render("index.ejs", {
      content: data,
    });
  } catch (error) {
    res.render("index.ejs", {
      content: `Error ${e}`,
    });
  }
});

app.get("/api_key", async (req, res) => {
  try {
    const response = await axios.get(
      baseURL + `/filter?score=7&apiKey=${process.env.API_KEY}`,
      {
        responseType: "text",
      }
    );
    const data = response.data;

    res.render("index.ejs", {
      content: data,
    });
  } catch (error) {
    res.render("index.ejs", {
      content: `Error ${e}`,
    });
  }
});

app.get("/token", async (req, res) => {
  try {
    const response = await axios.get(baseURL + `/secrets/2`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
      responseType: "text",
    });
    const data = response.data;

    res.render("index.ejs", {
      content: data,
    });
  } catch (error) {
    res.render("index.ejs", {
      content: `Error ${e}`,
    });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
