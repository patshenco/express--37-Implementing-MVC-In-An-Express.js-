const bcrypt = require('bcrypt');

const users = []; // In-memory "database," replace with a real database

module.exports = {
  findByUsername: (username) => {
    return users.find((user) => user.username === username);
  },

  createUser: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
  },
};
