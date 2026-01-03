 function showView(view) {
            const views = ['dashboardView', 'enrollSection', 'enrolledQuizzesSection', 'profileSection', 'pastQuizzesSection', 'resultView'];
            views.forEach(v => document.getElementById(v).style.display = 'none');
            document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));

            if(view === 'dashboard') { document.getElementById('dashboardView').style.display = 'block'; document.getElementById('m-dash').classList.add('active'); }
            else if(view === 'enrolled') { document.getElementById('enrolledQuizzesSection').style.display = 'block'; document.getElementById('m-enrolled').classList.add('active'); }
            else if(view === 'enroll') { document.getElementById('enrollSection').style.display = 'block'; document.getElementById('m-enroll').classList.add('active'); }
            else if(view === 'profile') { document.getElementById('profileSection').style.display = 'block'; document.getElementById('m-profile').classList.add('active'); }
            else if(view === 'past') { document.getElementById('pastQuizzesSection').style.display = 'block'; document.getElementById('m-past').classList.add('active'); }
        }

        function saveProfile() { alert("Profile details updated successfully!"); }

        function validateKey() {
            const key = document.getElementById('enrollKey').value.toUpperCase();
            const statusTitle = document.getElementById('statusTitle');
            document.getElementById('enrollInputs').style.display = "none";
            document.getElementById('enrollmentStatus').style.display = "block";

            if(key === "AI-99") {
                statusTitle.innerText = "Enrolled successfully!";
                statusTitle.style.color = "var(--success-green)";
            } else {
                statusTitle.innerText = "Invalid Key";
                statusTitle.style.color = "var(--error-red)";
            }

            // Redirect back to dashboard after 2 seconds for BOTH cases
            setTimeout(() => {
                document.getElementById('enrollInputs').style.display = "block";
                document.getElementById('enrollmentStatus').style.display = "none";
                document.getElementById('enrollKey').value = "";
                showView('dashboard');
            }, 2000);
        }

        function fetchResultData(type) {
            showView('past');
            document.getElementById('pastQuizzesSection').style.display = 'none';
            document.getElementById('resultView').style.display = 'block';
            
            const quizData = {
                python: {
                    title: "Python Fundamentals",
                    topic: "Programming",
                    score: "8/10",
                    acc: "80%",
                    points: "80",
                    answers: [
                        { q: "Which keyword is used for functions?", correct: "def", user: "def", isCorrect: true, p: 10 },
                        { q: "Is Python case-sensitive?", correct: "Yes", user: "No", isCorrect: false, p: 0 }
                    ]
                },
                cyber: {
                    title: "Cyber Security Intro",
                    topic: "Security",
                    score: "5/10",
                    acc: "50%",
                    points: "50",
                    answers: [
                        { q: "What does VPN stand for?", correct: "Virtual Private Network", user: "Virtual Private Network", isCorrect: true, p: 10 },
                        { q: "What is Phishing?", correct: "Social Engineering", user: "A type of fish", isCorrect: false, p: 0 }
                    ]
                },
                cloud: {
                    title: "Cloud Essentials",
                    topic: "Cloud Computing",
                    score: "9/10",
                    acc: "90%",
                    points: "90",
                    answers: [
                        { q: "What is SaaS?", correct: "Software as a Service", user: "Software as a Service", isCorrect: true, p: 10 }
                    ]
                }
            };

            const data = quizData[type] || quizData.python;
            
            document.getElementById('resTitle').innerText = data.title;
            document.getElementById('resTopic').innerText = "Topic: " + data.topic;
            document.getElementById('resScore').innerText = data.score;
            document.getElementById('resAccuracy').innerText = data.acc;
            document.getElementById('resPoints').innerText = data.points;

            const container = document.getElementById('answersContainer');
            container.innerHTML = "<h3 style='margin-top:30px'>Review Questions</h3>";
            
            data.answers.forEach((ans, i) => {
                const borderClass = ans.isCorrect ? 'correct-border' : 'incorrect-border';
                const statusText = ans.isCorrect ? '<span style="color:var(--success-green)">Yes</span>' : '<span style="color:var(--error-red)">No</span>';
                
                container.innerHTML += `
                    <div class="answer-card ${borderClass}">
                        <div class="q-header">
                            <span class="q-text"><strong>Q${i+1}:</strong> ${ans.q}</span>
                            <span class="badge-point">+${ans.p} Points</span>
                        </div>
                        <p><strong>Is Correct:</strong> ${statusText}</p>
                        <p><strong>Your Answer:</strong> ${ans.user}</p>
                        <p><strong>Correct Answer:</strong> ${ans.correct}</p>
                    </div>`;
            });
        }