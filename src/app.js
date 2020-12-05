require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { validateFields } = require('./validation');
const { sendMessage } = require('./aws');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.json({ operational: true, version: '1' });
});

app.post('/api/v1/folhaponto', async (req, res) => {
  try {
    const { name, email, password, dateReference } = req.body;

    const messageBody = {
      name,
      email,
      password,
      dateReference,
    };

    try {
      validateFields(messageBody);
    } catch (validationError) {
      return res.json({
        success: false,
        message: validationError.message,
      });
    }

    await sendMessage(messageBody);

    return res.json({
      success: true,
      message:
        'Solicitação recebida. Assim que a planilha for gerada, você irá recebê-la via email.',
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: 'Ocorreu um erro ao processar sua solicitação.',
    });
  }
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`API iniciada na porta ${port}!`);
});
