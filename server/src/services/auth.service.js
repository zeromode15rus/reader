const { User } = require('../../db/models');
const bcrypt = require('bcrypt');

class AuthService {
  async register({ name, email, password }) {
    if (!email || !password) {
      throw new Error('Email и пароль обязательны');
    }

    const hashpass = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { 
        name, 
        password: hashpass,
      }
    });

    if (!created) {
      throw new Error('Этот email уже занят');
    }

    const plainUser = user.get({ plain: true });
    delete plainUser.password;
    return plainUser;
  }

  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Неверный email или пароль');
    }

    const plainUser = user.get({ plain: true });
    delete plainUser.password;
    return plainUser;
  }
}

module.exports = AuthService;
