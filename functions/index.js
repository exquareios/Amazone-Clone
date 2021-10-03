const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IBduPDscz3Ticv2NRVYfJcrlUjH1DNJxixLPl3qO87lZqjhtwUcayt24tdVIby3drhwq3qXeJmROgOlXgjAuyh300Ry6nFYgH"
);

// app config

const app = express();
//midlewares

app.use(cors({ origin: true }));
app.use(express.json());

//api routes
app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-32a3a/us-central1/api
