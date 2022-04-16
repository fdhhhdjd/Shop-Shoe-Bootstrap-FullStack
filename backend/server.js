const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: ".env" });
const connectDB = require("./configs/db");
connectDB();
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: ".env" });
}
app.get("/tai", (req, res) => {
  return res.status(200).json({
    status: "200",
    message: "WellCome To Tai Heo ",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server is listening on port:http://localhost:${PORT}`)
);
