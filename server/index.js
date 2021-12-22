const fs = require('fs')
const app = require('express')()
const axios = require('axios')
const URL = require('url').URL
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/payment', async (req, res) => {
  // const { sum, metadata } = req.body;
  try {
    const response = await axios.post('https://api.yookassa.ru/v3/payments', {
      amount: {
        value: '100.00',
        currency: 'RUB'
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: 'https://pizzburgkrd.ru/order/1234'
      },
      description: "Заказ №1",
      metadata: { lol: 'you'}
    }, {
      headers: {
        'Idempotence-Key': uuidv4()
      },
      auth: {
        username: process.env.SHOP_ID,
        password: process.env.PAYMENT_API_KEY
      }
    })
    console.log(response.data)
    res.json({...response.data})
  } catch (e) {
    res.status(400).json(e)
  }
})

app.get('/sms', async (req, res) => {
  const { phone, code } = req.query;
  const url = new URL(`${process.env.SMS_URL}?api_id=${process.env.SMS_API_KEY}&to=${phone}&msg=${code} - ваш код для входа на сайт pizzburg.ru&json=1`)
  try {
    const response = await axios.get(url.href)
    console.log(response)
    res.json({...response.data})
  } catch (e) {
    console.log(e)
    res.json(e)
  }
});

app.post('/json', async (req, res) => {
  const { data } = req.body;
  fs.writeFile('./store/menu.json', JSON.stringify(data), "utf-8", (err) => {
    if (err) console.log(err)
  })
  res.send('ok')
})

app.get('/', (req, res) => res.send('OK'));

module.exports = app
