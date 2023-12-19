const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { crearEscenario, msj1, consultar } = require('./memoria');

app.use(bodyParser.raw());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api', async (req, res) => {
  const escenario = await crearEscenario();
  const response = await msj1(escenario);
  res.json(response);
});

app.post('/chat', async function(req, res) {
  const { prompt } = req.body;

  try {
    const response = await consultar(prompt);
    res.json({message: response});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({error: error.message});
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
