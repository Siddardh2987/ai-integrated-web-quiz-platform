document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const addBtn = document.getElementById('add-question');
    const container = document.getElementById('questions-container');
    const navItems = document.querySelectorAll('.sidebar li:not(.logout)');
    let questionCount = 1;

    // View Switching Logic
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const view = item.getAttribute('data-view');
            document.getElementById('create-view').style.display = view === 'create' ? 'block' : 'none';
            document.getElementById('past-view').style.display = view === 'past' ? 'block' : 'none';
            document.getElementById('dashboard-view').style.display = view === 'dashboard' ? 'block' : 'none';

        });
    });

    // Add Question Logic
    addBtn.addEventListener('click', () => {
        questionCount++;
        const div = document.createElement('div');
        div.className = 'question-block';
        div.innerHTML = `
            <div class="q-header">
                <span>Question ${questionCount}</span>
                <select><option>MCQ (Single Correct)</option><option>True/False</option></select>
            </div>
            <textarea placeholder="Enter your question here..."></textarea>
            <div class="options-grid">
                <div class="opt-input"><input type="radio" name="q${questionCount}"><input type="text" placeholder="Option A"></div>
                <div class="opt-input"><input type="radio" name="q${questionCount}"><input type="text" placeholder="Option B"></div>
                <div class="opt-input"><input type="radio" name="q${questionCount}"><input type="text" placeholder="Option C"></div>
                <div class="opt-input"><input type="radio" name="q${questionCount}"><input type="text" placeholder="Option D"></div>
            </div>
        `;
        container.appendChild(div);
    });

    // Publish Button Logic
    document.getElementById('publish-quiz').addEventListener('click', () => {
        const title = document.getElementById('quiz-title').value;
        if(!title) return alert("Please enter a title!");
        alert("Quiz '" + title + "' published successfully!");
    });

        // Save Draft Logic
    document.getElementById('save-draft').addEventListener('click', () => {
        const title = document.getElementById('quiz-title').value;

        if(!title) return alert("Please enter at least a quiz title before saving draft!");

        alert("Quiz '" + title + "' saved as draft!");
    });

});