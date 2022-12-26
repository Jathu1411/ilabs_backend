const router = require("express").Router();
const controller = require("../controllers/Question");

router.get("/getAll", controller.getAllQuestions);

router.post("/add", controller.createQuestion);

router.put("/update/:id", controller.updateQuestion);

router.delete("/delete/:id", controller.deleteQuestion);

router.get("/get/:id", controller.getQuestionById);

router.get("/search/:question", controller.searchQuestion);

router.get("/search/:question", controller.searchQuestion);

router.get("/pagination", controller.questionPagination);

module.exports = router;
