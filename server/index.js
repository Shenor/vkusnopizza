const fs = require('fs')
const app = require('express')()
const axios = require('axios')
const URL = require('url').URL
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/sms', async (req, res) => {
  const { phone, code } = req.query;
  const url = new URL(`${process.env.SMS_URL}?api_id=${process.env.SMS_API_KEY}&to=${phone}&msg=${code} - ваш код для входа на сайт pizzburg.ru&json=1`)
  try {
    const response = await axios.get(url.href)
    console.log(response)
    res.json({...response.data})
  } catch (e) {
    console.log(e)
    res.json({...e})
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
