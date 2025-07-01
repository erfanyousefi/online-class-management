const {
  Course,
  Enrollment,
  Session,
  Attendance,
  User,
  sequelize,
} = require("../models");
const {Op, fn, col, literal} = require("sequelize");

module.exports = {
  attendanceReport: async (req, res) => {
    const {courseId} = req.params;
    try {
      // تعداد کل جلسات دوره
      const totalSessions = await Session.count({where: {courseId}});

      // برای هر دانشجو: تعداد حضور و درصد حضور
      const rows = await Enrollment.findAll({
        where: {courseId, status: "accepted"},
        include: [
          {model: User, as: "student", attributes: ["id", "name"]},
          {
            model: Attendance,
            as: "attendances",
            attributes: [[fn("SUM", literal("present = 1")), "presentCount"]],
          },
        ],
        group: ["Enrollment.id"],
        attributes: [
          "id",
          [fn("COUNT", col("attendances.id")), "attendanceTotal"],
        ],
      });

      const report = rows.map((r) => {
        const presentCount = parseInt(r.get("presentCount") || 0);
        const attendanceTotal = parseInt(r.get("attendanceTotal") || 0);
        const percent = totalSessions
          ? ((presentCount / totalSessions) * 100).toFixed(2)
          : "0.00";
        return {
          studentId: r.student.id,
          studentName: r.student.name,
          presentCount,
          totalSessions,
          percent,
        };
      });

      res.json({courseId, totalSessions, report});
    } catch (err) {
      console.error(err);
      res.status(500).json({error: "Report generation failed"});
    }
  },
};
