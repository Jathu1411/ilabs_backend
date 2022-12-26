let questionModel = require("../models/Question");

// Get all questions
const getAllQuestions = async (req, res) => {
  await questionModel
    .find()
    .then((questions) => res.json(questions))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Get a question by id
const getQuestionById = async (req, res) => {
  let questionId = req.params.id;
  await questionModel
    .findById(questionId)
    .then((question) => {
      res.status(200).send({ status: "Question fetched", data: question });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error", error: err.message });
    });
};

//create a new question

const createQuestion = async (req, res) => {
  try {
    const newQuestion = new questionModel({
      question: req.body.question,
      category: req.body.category,
      status: req.body.status,
    });

    await newQuestion.save();

    res.status(201).send("Question Added Successfully !!!");
  } catch (error) {
    res
      .status(400)
      .send({ status: "An Error Ocuured !!", error: error.message });
  }
};

// Update a question
const updateQuestion = async (req, res) => {
  let quesId = req.params.id;
  const { question, category, status } = req.body;

  const updatedQuestion = {
    question,
    category,
    status,
  };

  console.log(updatedQuestion);

  await questionModel
    .findByIdAndUpdate(quesId, updatedQuestion)
    .then(() => {
      res.status(200).send({ status: "Question updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
};

//Delete a Question
const deleteQuestion = async (req, res) => {
  let quesId = req.params.id;
  await questionModel.findByIdAndDelete(quesId);
  res.status(200).send({ status: "Question deleted" });
};

//Search
const searchQuestion = async (req, res) => {
  let question = req.params.question;
  await questionModel
    .find({
      question: { $regex: question, $options: "i" },
    })
    .then((product) => {
      res.status(200).send({ data: product });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error !!", error: err.message });
    });
};
// pagination
const questionPagination = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  await questionModel
    .find()
    .limit(limit)
    .skip(limit * (page - 1))
    .then((questions) => res.json(questions))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Export all functions
module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionById,
  searchQuestion,
  questionPagination,
};
