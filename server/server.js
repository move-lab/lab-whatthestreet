const express = require("express");
const next = require("next");
const compression = require("compression");
const bodyParser = require("body-parser");
const router = require("./api/router");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // API routes
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(compression());

  // Redirect to HTTPS
  server.use(function(req, res, next) {
    if (
      req.headers["x-forwarded-proto"] !== "https" &&
      req.hostname !== "localhost"
    ) {
      return res.redirect(301, ["https://", req.get("Host"), req.url].join(""));
    }
    return next();
  });

  server.get("/about", (req, res) => {
    console.log("handled by /about");
    return app.render(req, res, "/about", req.query);
  });

  server.get(
    "/:cityName/mapmobile/:vehicleType/:areaType/:itemId",
    (req, res) => {
      console.log(
        "handled by /:cityName/mapmobile/:vehicleType/:areaType/:itemId"
      );
      return app.render(req, res, "/mapmobile", req.query);
    }
  );

  server.get(
    "/:cityName/explore/:vehicleType/:areaType/:itemId",
    (req, res) => {
      console.log(
        "handled by /:cityName/explore/:vehicleType/:areaType/:itemId"
      );
      return app.render(req, res, "/map", req.query);
    }
  );

  server.get("/:cityName/explore/:vehicleType", (req, res) => {
    console.log("handled by /:cityName/explore/:vehicleType");
    return app.render(req, res, "/explore", req.query);
  });

  server.get("/:cityName/explore", (req, res) => {
    console.log("handled by /:cityName/explore");
    return app.render(req, res, "/explore", req.query);
  });

  server.get("/:cityName/results", (req, res) => {
    console.log("handled by /:cityName/results");
    return app.render(req, res, "/results", req.query);
  });

  server.get("/:cityName", (req, res) => {
    console.log("handled by /:cityName");
    return app.render(req, res, "/", req.query);
  });

  server.use("/api/v1", router);

  server.get("*", (req, res) => {
    console.log("handled by next.js *");
    return handle(req, res);
  });

  server.listen(process.env.PORT || 80, err => {
    if (err) throw err;

    console.log(`> Ready on http://localhost:${process.env.PORT || 80}`);
  });
});
