const validateFields = ({ name, email, password, dateReference }) => {
  const whitelist = process.env.WHITELIST_USERS.split(',').map((user) =>
    user.trim()
  );

  if (!name || !email || !password || !dateReference) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  const [emailUsername] = email.split('@');

  if (!whitelist.includes(emailUsername)) {
    throw new Error('Este usuário não tem permissão para executar esta ação.');
  }
};

module.exports = { validateFields };
