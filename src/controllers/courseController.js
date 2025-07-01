const {Course, User} = require("../models");
module.exports = {
  listCourses: async (req, res) => {
    let {page = 1, limit = 10, teacherId} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const where = {};
    if (teacherId) where.teacherId = teacherId;

    try {
      const {rows, count} = await Course.findAndCountAll({
        where,
        include: [{model: User, as: "teacher", attributes: ["id", "name"]}],
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });
      res.json({
        data: rows,
        meta: {total: count, page, lastPage: Math.ceil(count / limit)},
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({error: "Cannot list courses"});
    }
  },
};
