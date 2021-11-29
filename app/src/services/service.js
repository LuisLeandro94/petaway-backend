class Service {
  model;

  constructor(model) {
    this.model = model;
  }

  get = async (
    offset,
    limit,
    orderField,
    order,
    includes,
    predicate,
    attributes
  ) => {
    try {
      const results = await this.model.findAll({
        includes: includes || "",
        where: predicate || {},
        offset,
        limit,
        order: [[orderField, order]],
        attributes,
      });

      return results;
    } catch (err) {
      throw err;
    }
  };

  getSingle = async (includes, predicate, attributes, excludeAttributes) => {
    try {
      const result = await this.model.findOne({
        includes: includes || [],
        where: predicate || {},
        attributes: { exclude: excludeAttributes, attributes },
      });

      return result;
    } catch (err) {
      throw err;
    }
  };

  any = async (predicate) => {
    try {
      const result = await this.model.count({
        where: predicate || {},
      });
      let exist = false;
      if (result > 0) {
        exist = true;
      }
      return exist;
    } catch (err) {
      throw err;
    }
  };

  save = async (model) => {
    try {
      const result = await model.save();
      return result;
    } catch (err) {
      throw err;
    }
  };

  delete = async (predicate) => {
    try {
      const result = await this.model.update(
        {
          isDeleted: true,
        },
        {
          where: predicate || {},
        }
      );
      return result;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Service