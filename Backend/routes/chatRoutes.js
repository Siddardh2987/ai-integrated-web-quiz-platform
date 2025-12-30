import express from 'express';
const chatRouter = express.Router();

import { 
    createQuiz,
    getQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    updateQuestionInQuiz,
    deleteQuestionFromQuiz,
    addQuestionToQuiz,
    publishQuiz
} from '../controllers/chatController.js';
import adminAuth from "../middleware/adminAuth.js";

// Create quiz - with admin auth
chatRouter.post('/create', adminAuth, createQuiz);

// Get all quizzes
chatRouter.get('/', adminAuth, getQuizzes);

// Get quiz by ID
chatRouter.get('/:id', adminAuth, getQuizById);

// Update quiz
chatRouter.put('/:id', adminAuth, updateQuiz);

// Delete quiz
chatRouter.delete('/:id', adminAuth, deleteQuiz);

// Update question
chatRouter.put('/:quizId/questions/:questionIndex', adminAuth, updateQuestionInQuiz);

// Delete question
chatRouter.delete('/:quizId/questions/:questionIndex', adminAuth, deleteQuestionFromQuiz);

// Add question
chatRouter.post('/:quizId/questions', adminAuth, addQuestionToQuiz);

// Publish quiz
chatRouter.put('/:quizId/publish', adminAuth, publishQuiz);

export default chatRouter;