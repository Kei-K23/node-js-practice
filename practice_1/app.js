import express from "express";
import { chineseDishes } from "./food.js";

const app = express();
const port = 4000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", {
    chineseDishes,
  });
});

app.get("/detail/:id", (req, res) => {
  const id = req.params.id;

  const detailDish = chineseDishes.filter((dish) => dish.id == id);
  res.render("detail.ejs", {
    detailDish,
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
