const QuizGenerator = require("../services/aiService");

// Initialize once, outside the handler
const quizGen = new QuizGenerator(process.env.AI_API_KEY);

export const chat = async(req, res) => {
    try {
        const { message } = req.body;
        
        if(!message || message.trim() === '') {
            return res.status(400).json({
                error: 'Message is Required.',
                reply: 'Please enter a message.'
            });
        }
        
        // Parse the message to extract quiz parameters
        // For now, using defaults - you might want to enhance this
        const result = await quizGen.generateQuiz({
            topic: message, // Using the message as the topic
            difficulty: "medium",
            numQuestions: 5,
            questionType: "multiple-choice"
        });
        
        if(!result.success) {
            console.error("AI-Model error:", result.error);
            return res.status(500).json({
                error: result.error,
                reply: "Failed to generate quiz."
            });
        }

        // Return the generated quiz
        res.json({
            reply: result.quiz,
            model: result.metadata.model,
            tokensUsed: result.metadata.tokensUsed?.total_tokens
        });
        
    } catch(error) {
        console.error("AI-Model error:", error.message);
        return res.status(500).json({
            error: 'Failed to process message.',
            reply: "I'm having trouble connecting. Please try again."
        });
    }
};