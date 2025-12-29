class QuizGenerator {
    constructor(apiKey){
        this.apiKey = apiKey;
        this.apiUrl = "https://api.groq.com/openai/v1/chat/completions";
        this.model = "llama-3.1-70b-versatile"; // Best for quiz generation
        
        // System prompt with embedded schema
        this.systemPrompt = `You are a specialized Quiz Generation AI. Your ONLY purpose is to generate educational quizzes based on user requirements.

**YOUR ROLE:**
- Generate high-quality, educational quizzes on any topic
- When reference material is provided, base questions DIRECTLY on that material
- Ensure questions test understanding of the specific content provided
- Create plausible distractors (wrong answers) that test real understanding
- Provide helpful explanations referencing the source material when applicable

**STRICT OUTPUT FORMAT:**
You MUST respond with ONLY valid JSON matching this exact schema. No additional text, explanations, or markdown formatting.

**REQUIRED JSON SCHEMA:**
{
  "quiz": {
    "title": "string - catchy title for the quiz",
    "topic": "string - main subject area",
    "difficulty": "string - easy/medium/hard",
    "totalQuestions": number,
    "estimatedTime": "string - estimated completion time (e.g., '5 minutes')",
    "basedOnDocument": boolean,
    "questions": [
      {
        "id": number,
        "question": "string - clear, specific question text",
        "type": "string - multiple-choice/true-false/fill-in-blank",
        "options": ["string", "string", "string", "string"],
        "correctAnswer": number,
        "explanation": "string - why this answer is correct",
        "points": number,
        "category": "string - sub-topic or category",
        "sourceReference": "string or null"
      }
    ],
    "metadata": {
      "createdAt": "string - ISO timestamp",
      "totalPoints": number,
      "passingScore": number
    }
  }
}

**RULES:**
1. Questions must be factually accurate
2. When document is provided, prioritize content from that document
3. Distractors should be plausible but clearly incorrect
4. Explanations should be educational and concise (1-3 sentences)
5. For "easy" difficulty: basic recall and understanding
6. For "medium" difficulty: application and analysis  
7. For "hard" difficulty: synthesis and evaluation
8. Avoid ambiguous or trick questions
9. Use proper grammar and spelling
10. Return ONLY the JSON object, nothing else`;
    }
    
    /**
     * Extract text from uploaded document
     * Supports: TXT files directly, others need external processing
     */
    async extractTextFromDocument(file){
        const fileType = file.type || this.getFileType(file.name);
        
        try {
            // For text files, read directly
            if(fileType.includes('text') || fileType.includes('plain')){
                return await this.extractFromText(file);
            }
            
            // For other file types, we need the file content as text
            // In a real application, you would:
            // 1. Use a backend service to convert PDF/DOCX to text
            // 2. Use libraries like pdf-parse, mammoth.js
            // 3. Use OCR services for images
            
            throw new Error(`File type ${fileType} requires backend processing. Please convert to .txt first or implement backend conversion.`);
            
        } catch(error){
            console.error("Document extraction error:", error);
            throw error;
        }
    }
    
    /**
     * Extract text from plain text files
     */
    async extractFromText(file){
        try {
            const text = await file.text();
            return {
                success: true,
                text: text,
                fileType: "text",
                fileName: file.name,
                textLength: text.length
            };
        } catch(error){
            return {
                success: false,
                error: error.message,
                text: null
            };
        }
    }
    
    /**
     * Generate quiz with optional document reference
     */
    async generateQuiz(options = {}){
        const {
            topic = "General Knowledge",
            difficulty = "medium",
            numQuestions = 5,
            questionType = "multiple-choice",
            category = null,
            language = "English",
            documentFile = null  // Optional uploaded document
        } = options;
        
        // Validate inputs
        if(!topic || topic.trim() === ""){
            return {
                success: false,
                error: "Topic is required",
                quiz: null
            };
        }
        
        const validDifficulties = ["easy", "medium", "hard"];
        if(!validDifficulties.includes(difficulty.toLowerCase())){
            return {
                success: false,
                error: `Difficulty must be one of: ${validDifficulties.join(", ")}`,
                quiz: null
            };
        }
        
        if(numQuestions < 1 || numQuestions > 50){
            return {
                success: false,
                error: "Number of questions must be between 1 and 50",
                quiz: null
            };
        }
        
        // Extract text from document if provided
        let documentText = null;
        let documentInfo = null;
        
        if(documentFile){
            console.log("Extracting text from uploaded document...");
            const extraction = await this.extractTextFromDocument(documentFile);
            
            if(extraction.success){
                documentText = extraction.text;
                documentInfo = {
                    fileName: extraction.fileName,
                    fileType: extraction.fileType,
                    textLength: documentText.length
                };
                console.log(`Successfully extracted ${documentText.length} characters from ${extraction.fileName}`);
            } else {
                console.warn("Failed to extract document:", extraction.error);
                return {
                    success: false,
                    error: `Failed to extract document: ${extraction.error}`,
                    quiz: null
                };
            }
        }
        
        // Build user prompt
        let userPrompt = `Generate a ${difficulty} difficulty quiz about "${topic}" with exactly ${numQuestions} questions.`;
        
        if(questionType){
            userPrompt += ` Question type: ${questionType}.`;
        }
        
        if(category){
            userPrompt += ` Focus on the category: ${category}.`;
        }
        
        if(language !== "English"){
            userPrompt += ` Generate the quiz in ${language} language.`;
        }
        
        // Add document context if available
        if(documentText){
            // Truncate if too long (Groq has token limits)
            const maxDocLength = 15000; // characters
            const truncatedText = documentText.length > maxDocLength 
                ? documentText.substring(0, maxDocLength) + "\n\n[Document truncated due to length...]"
                : documentText;
            
            userPrompt += `\n\n**REFERENCE MATERIAL PROVIDED:**\nBase the quiz questions on the following document content. Questions should test understanding of this specific material:\n\n---\n${truncatedText}\n---\n\nEnsure questions reference specific concepts, facts, or ideas from this material.`;
        }
        
        try{
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: "system",
                            content: this.systemPrompt
                        },
                        {
                            role: "user",
                            content: userPrompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 4000,
                    top_p: 0.9,
                    stream: false,
                    response_format: { type: "json_object" }
                })
            });
            
            if(!response.ok){
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
            }
            
            const data = await response.json();
            
            // Parse the JSON response
            let quizData;
            try {
                quizData = JSON.parse(data.choices[0].message.content);
            } catch(parseError) {
                throw new Error("Failed to parse quiz data. AI returned invalid JSON.");
            }
            
            // Validate schema
            if(!quizData.quiz || !quizData.quiz.questions || !Array.isArray(quizData.quiz.questions)){
                throw new Error("Quiz data does not match expected schema");
            }
            
            // Add document info to metadata if document was used
            if(documentInfo){
                quizData.quiz.metadata.sourceDocument = documentInfo;
            }
            
            return {
                success: true,
                quiz: quizData.quiz,
                metadata: {
                    model: this.model,
                    tokensUsed: data.usage,
                    generatedAt: new Date().toISOString(),
                    requestedOptions: options,
                    documentUsed: !!documentFile,
                    documentInfo: documentInfo
                }
            };
            
        } catch(error){
            console.error("Quiz Generation Error:", error.message);
            return {
                success: false,
                error: error.message,
                quiz: null
            };
        }
    }
    
    /**
     * Helper: Get file type from filename
     */
    getFileType(filename){
        const extension = filename.split('.').pop().toLowerCase();
        const typeMap = {
            'txt': 'text/plain',
            'md': 'text/markdown'
        };
        return typeMap[extension] || 'application/octet-stream';
    }
    
    /**
     * Change AI model
     */
    setModel(modelName){
        const validModels = [
            "llama-3.1-70b-versatile",   // Best quality
            "llama-3.1-8b-instant",      // Fastest
            "mixtral-8x7b-32768",        // Large context
            "llama-3.2-90b-text-preview" // Experimental
        ];
        
        if(validModels.includes(modelName)){
            this.model = modelName;
            return { success: true, model: this.model };
        } else {
            return { 
                success: false, 
                error: `Invalid model. Choose from: ${validModels.join(", ")}` 
            };
        }
    }
    
    /**
     * Get current configuration
     */
    getConfig(){
        return {
            model: this.model,
            apiUrl: this.apiUrl,
            hasApiKey: !!this.apiKey,
            supportedFileTypes: ['TXT', 'MD']
        };
    }
}

module.exports = QuizGenerator;