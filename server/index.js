const fs = require("fs");
const URL = require("url").URL;
const app = require("express")();
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const transporter = nodemailer.createTransport({
  service: "Yandex",
  auth: {
    user: process.env.MAILER_LOGIN,
    pass: process.env.MAILER_PASS,
  },
});

app.use(cors());
app.use(bodyParser.json());

app.post("/mail", (req, res) => {
  const { data } = req.body;
  console.log(data);
  const renderOrderList = (items) => {
    let order = "";
    items.forEach(({ name, amount, sum }) => {
      order += `<div>${name} – кол-во: ${amount} – ${sum}₽</div>`;
    });
    return order;
  };
  try {
    transporter.sendMail({
      from: "pizzburg-info@yandex.ru",
      to: process.env.CALLBACK_MAIL,
      subject: `Поступил новый заказ ${new Date().toLocaleString("ru-RU")}`,
      html: `
        <div>Дата и время: ${new Date().toLocaleString("ru-RU")}</div>
        <div>Номер заказа: ${data.number}</div>
        <div>Имя: ${data.customer.name}</div>
        <div>Телефон: <a href="${data.customer.phone}">${
        data.customer.phone
      }</a></div>
        <div>Итого к оплате: ${data.totalSum}₽</div>
        <br>
        <div>Город: ${data.order.address.city}</div>
        <div>Улица: ${data.order.address.street}</div>
        <div>Дом: ${data.order.address.home}</div>
        <div>Подъезд: ${data.order.address.entrance}</div>
        <div>Квартира: ${data.order.address.apartment}</div>
        <br>
        <div>Состав заказа:</div>
        ${renderOrderList(data.order.items)}
      `,
    });
    res.send("ok");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.get("/payment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.yookassa.ru/v3/payments/${id}`,
      {
        auth: {
          username: process.env.SHOP_ID,
          password: process.env.PAYMENT_API_KEY,
        },
      }
    );
    res.json({ ...response.data });
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/payment", async (req, res) => {
  const { sum, metadata } = req.body;
  try {
    const response = await axios.post(
      "https://api.yookassa.ru/v3/payments",
      {
        amount: {
          value: `${sum}`,
          currency: "RUB",
        },
        capture: true,
        confirmation: {
          type: "redirect",
          return_url: metadata.return_url,
        },
        description: `Заказ №${metadata.number}`,
        metadata: { ...metadata },
      },
      {
        headers: {
          "Idempotence-Key": uuidv4(),
        },
        auth: {
          username: process.env.SHOP_ID,
          password: process.env.PAYMENT_API_KEY,
        },
      }
    );
    console.log(response.data);
    res.json({ ...response.data });
  } catch (e) {
    res.status(400).json(e);
  }
});

app.get("/sms", async (req, res) => {
  const { phone, code } = req.query;
  console.log(process.env.SMS_API_KEY);
  const url = new URL(
    `${process.env.SMS_URL}?api_id=${process.env.SMS_API_KEY}&to=${phone}&msg=${code} - ваш код для входа на сайт pizzburg.ru&json=1`
  );
  try {
    const response = await axios.get(url.href);
    console.log(response);
    res.json({ ...response.data });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

app.post("/json", (req, res) => {
  const { data } = req.body;
  fs.writeFile("./store/menu.json", JSON.stringify(data), "utf-8", (err) => {
    if (err) console.log(err);
  });
  res.send("ok");
});

app.get("/", (req, res) => res.send("OK"));
app.get("/test", (req, res) => res.send(process.env.NODE_ENV));

module.exports = app;
