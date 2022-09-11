"use strict";

const Hapi = require("@hapi/hapi");
const { routes } = require("./src/routes.js");
const fs = require("fs").promises;

const { getFIleData } = require("./src/methods/fIleData");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(require("@hapi/vision"));

  server.views({
    engines: { html: require("handlebars") },
    relativeTo: "src",
    path: "views",
  });

  routes.forEach(async (element) => {
    await server.route(element);
  });

  // await server.route({
  //   method: "GET",
  //   path: "/getData",
  //   handler: getFIleData,
  //   // async (request, reply) => {
  //   //   try {
  //   //     let value = await fs.readFile("src/data/index.json", "utf8");

  //   //     console.log("value ", value);

  //   //     return value;
  //   //   } catch (error) {
  //   //     console.error("Error: ", error);
  //   //     return "Error";
  //   //   }
  //   // },
  // });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
