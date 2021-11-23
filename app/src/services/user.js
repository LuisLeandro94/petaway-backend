const bcrypt = require("bcrypt-nodejs");

const ValidationError = require("../errors/validationError");

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db("users").where(filter).select(["id", "email", "name"]);
  };

  const findOne = (filter = {}) => {
    try {
      return app.db("users").where(filter).first();
    } catch (error) {
      return error;
    }
  };

  const getPasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (user) => {
    if (!user.name) throw new ValidationError("Nome é um atributo obrigatório");
    if (!user.email) {
      throw new ValidationError("Email é um atributo obrigatório");
    }
    if (!user.password) {
      throw new ValidationError("Password é um atributo obrigatório");
    }
    const userDb = await findOne({ email: user.email });
    if (userDb) {
      throw new ValidationError("Email duplicado na BD");
    }

    const newUser = { ...user };
    newUser.password = getPasswordHash(user.password);

    return app.db("users").insert(newUser, ["id", "email", "name"]);
  };

  return { findAll, save, findOne };
};
