import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import e from "express";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "BracoBuga23",
  port: 5434,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisitedCountries() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisitedCountries();
  res.render("index.ejs", { countries: countries, total: countries.length });
  
});

app.post("/add", async(req,res) => {
  
    const input = req.body.country;
    try {  
      const result = await db.query("Select country_code from countries where country_name=$1", [input]);
    
      const data=result.rows[0];
      const country_code = data.country_code;

      try{
        await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [country_code]);
        res.redirect("/");
      } catch (error) {
        console.log(error);
        const countries = await checkVisitedCountries();
        res.render("index.ejs", { countries: countries, total: countries.length,error: "Country already exists, try again" });
      }
    } catch (error) { 
      console.log(error);
      const countries = await checkVisitedCountries();
      res.render("index.ejs", { countries: countries, total: countries.length,error: "Country not found, try again" });
    }
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
