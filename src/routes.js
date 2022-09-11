"use strict";

const Hapi = require("@hapi/hapi");
const { getFIleData, writeFile } = require("./methods/fIleData");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, reply) => reply.view("index"),
  },
  {
    method: "GET",
    path: "/getDataInFile",
    handler: getFIleData,
  },
  {
    method: "GET",
    path: "/getDataInDatabase",
    handler: () => {
      return undefined;
    },
  },
  {
    method: "GET",
    path: "/getAllData",
    handler: () => {
      return undefined;
    },
  },
  {
    method: "GET",
    path: "/setDataInFile",
    handler: writeFile,
  },
];

exports.routes = routes;
