import mysql from "mysql2";
import swaggerUI from "swagger-ui-express";
import swaggerDocumentation from "./swagger.json" with { type: "json" };
import app from "./app.js";


app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});