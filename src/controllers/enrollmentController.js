const {Enrollment, Payment, sequelize} = require("../models");

module.exports = {
  enrollStudent: async (req, res) => {
    const {userId, courseId} = req.body;
    const t = await sequelize.transaction();
    try {
      // ۱. ثبت‌نام
      const enrollment = await Enrollment.create(
        {userId, courseId, status: "accepted"},
        {transaction: t}
      );
      // ۲. پرداخت mock
      await Payment.create(
        {userId, courseId, amount: 100, status: "paid"},
        {transaction: t}
      );
      await t.commit();
      res.status(201).json({message: "Enrolled & Paid", enrollment});
    } catch (err) {
      await t.rollback();
      console.error(err);
      res.status(500).json({error: "Enrollment failed"});
    }
  },
};
