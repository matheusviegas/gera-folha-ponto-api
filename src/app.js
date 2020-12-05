require('dotenv').config();

const express = require('express');
const cors = require('cors');
const aws = require('./aws');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/v1/folhaponto', async (req, res) => {
  try {
    const { name, email, password, dateReference } = req.body;

    const messageBody = {
      name,
      email,
      password,
      dateReference,
    };

    if (!name || !email || !password || !dateReference) {
      return res.json({
        success: false,
        message:
          'Todos os campos name, email, password e dateReference são obrigatórios.',
      });
    }

    await aws.sendMessage(messageBody);

    return res.json({
      success: true,
      message:
        'Solicitação recebida. Assim que a planilha for gerada, você irá recebe-la em seu email.',
    });
  } catch (err) {
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
