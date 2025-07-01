const {sequelize} = require("./models");
module.exports = {
  // 1. معلم محبوب: بیشترین تعداد ثبت‌نام
  popularTeacher: async () => {
    const [results] = await sequelize.query(`
SELECT u.id, u.name, COUNT(e.id) AS totalEnrollments
FROM Users u
JOIN Courses c ON c.teacherId = u.id
JOIN Enrollments e ON e.courseId = c.id
WHERE u.role = 'teacher' AND e.status='accepted'
GROUP BY u.id
ORDER BY totalEnrollments DESC
LIMIT 1;
`);
    return results[0];
  },

  // 2. گزارش پیشرفته حضور با RAW
  attendanceReportRaw: async (courseId) => {
    const [results] = await sequelize.query(
      `
SELECT 
u.id AS studentId,
u.name AS studentName,
SUM(a.present) AS presentCount,
COUNT(s.id) AS totalSessions,
ROUND( SUM(a.present)/COUNT(s.id)*100, 2 ) AS percent
FROM Enrollments e
JOIN Users u ON u.id = e.userId
JOIN Sessions s ON s.courseId = e.courseId
LEFT JOIN Attendances a 
ON a.enrollmentId = e.id AND a.sessionId = s.id
WHERE e.courseId = :courseId AND e.status='accepted'
GROUP BY u.id;
`,
      {
        replacements: {courseId},
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return results;
  },
};
