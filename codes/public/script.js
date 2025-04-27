document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const logoutButton = document.getElementById('logoutButton');
    const userNameDisplay = document.getElementById('userNameDisplay');

    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeSignup = document.getElementById('closeSignup');

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    const chatForm = document.getElementById('chatForm');
    const chatSenderInput = document.getElementById('chatSender');
    const chatHistoryList = document.getElementById('chatHistory');
    const loadChatHistoryButton = document.getElementById('loadChatHistory');

    const toggleModeButton = document.getElementById('toggleMode');

    const leaveForm = document.getElementById('leaveForm');
    const employeeLeaveNameInput = document.getElementById('employeeLeaveName');
    const leaveRequestsTableBody = document.querySelector('#leaveRequestsTable tbody');

    const newsFeed = document.getElementById('newsFeed');

    const scheduleBtn = document.getElementById('loadSchedule');
    const scheduleTableBody = document.querySelector('#scheduleTable tbody');

    let currentUser = null; 


    function updateAuthState(user) {
        currentUser = user;
        if (user) {
            if (userNameDisplay) userNameDisplay.textContent = user.username;
            if (loginButton) loginButton.style.display = 'none';
            if (signupButton) signupButton.style.display = 'none';
            if (logoutButton) logoutButton.style.display = 'inline-block';

            if (chatSenderInput) {
                chatSenderInput.value = user.username;
                chatSenderInput.readOnly = true;
            }
            if (employeeLeaveNameInput) { 
                employeeLeaveNameInput.value = user.username;
                employeeLeaveNameInput.readOnly = true;
            }

            if (loginModal) loginModal.classList.remove('active');
            if (signupModal) signupModal.classList.remove('active');

            if (loadChatHistoryButton) loadChatHistory(); 
            if (leaveRequestsTableBody) loadLeaveRequests(); 

        } else {
            if (userNameDisplay) userNameDisplay.textContent = '';
            if (loginButton) loginButton.style.display = 'inline-block';
            if (signupButton) signupButton.style.display = 'inline-block';
            if (logoutButton) logoutButton.style.display = 'none';

            if (chatSenderInput) chatSenderInput.value = '';
            if (employeeLeaveNameInput) employeeLeaveNameInput.value = '';

            if (chatHistoryList) chatHistoryList.innerHTML = '<li>Login to view chat history.</li>';
            if (leaveRequestsTableBody) leaveRequestsTableBody.innerHTML = ''; 
        }
    }

    async function checkAuthStatus() {
        try {
            
            const response = await fetch('/api/auth/status');
            const data = await response.json();
            if (data.loggedIn && data.user) {
                updateAuthState(data.user);
            } else {
                updateAuthState(null);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            updateAuthState(null); 
        }
    }

    if (toggleModeButton) {
        toggleModeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    function openModal(modal) {
        if (modal) modal.classList.add('active');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
    }

    if (loginButton && loginModal) {
        loginButton.onclick = () => openModal(loginModal);
    }
    if (signupButton && signupModal) {
        signupButton.onclick = () => openModal(signupModal);
    }
    if (closeLogin && loginModal) {
        closeLogin.onclick = () => closeModal(loginModal);
    }
    if (closeSignup && signupModal) {
        closeSignup.onclick = () => closeModal(signupModal);
    }

    window.onclick = (event) => {
        if (event.target === loginModal) closeModal(loginModal);
        if (event.target === signupModal) closeModal(signupModal);
    };


    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (response.ok && result.user) {
                    alert(result.message);
                    updateAuthState(result.user); 
                    loginForm.reset();
                } else {
                    alert(`Login failed: ${result.message || 'Check credentials'}`);
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. An error occurred.');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());

            if (!data.username || !data.password) {
                alert("Username and password are required.");
                return;
            }

            try {
                const response = await fetch('/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data) 
                });
                const result = await response.json();

                if (response.ok || response.status === 201) { 
                    alert(result.message); 
                    signupForm.reset();
                    closeModal(signupModal);
                    openModal(loginModal); 
                } else {
                    alert(`Signup failed: ${result.error || result.message || 'Please try again.'}`);
                }
            } catch (error) {
                console.error('Signup error:', error);
                alert('Signup failed. An error occurred.');
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/auth/logout', { method: 'POST' });
                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    updateAuthState(null); 
                } else {
                    alert(`Logout failed: ${result.message || 'Error'}`);
                }
            } catch (error) {
                console.error('Logout error:', error);
                alert('Logout failed. An error occurred.');
            }
        });
    }


    async function loadChatHistory() {
        if (!currentUser || !chatHistoryList) {
            if (chatHistoryList) chatHistoryList.innerHTML = '<li>Login to view chat history.</li>';
            return;
        }
        chatHistoryList.innerHTML = '<li>Loading chat...</li>'; 

        try {
            const response = await fetch('/api/chat'); 
            if (!response.ok) {
                if (response.status === 401) {
                    chatHistoryList.innerHTML = '<li>Session expired. Please login again to view chat history.</li>';
                    updateAuthState(null); 
                } else {
                    chatHistoryList.innerHTML = `<li>Error loading chat: ${response.statusText}</li>`;
                }
                return;
            }

            const data = await response.json();
            chatHistoryList.innerHTML = ''; 
            if (data.chat && data.chat.length > 0) {
                data.chat.forEach(msg => {
                    const li = document.createElement('li');
                    const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'unknown time';
                    li.textContent = `[${timestamp}] ${msg.sender_username} to ${msg.recipient_username}: ${msg.message}`;
                    if (msg.sender_username.toLowerCase() === currentUser.username.toLowerCase()) {
                        li.style.fontWeight = 'bold'; 
                    }
                    chatHistoryList.appendChild(li);
                });
            } else {
                chatHistoryList.innerHTML = '<li>No chat messages yet.</li>';
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
            if (chatHistoryList) chatHistoryList.innerHTML = '<li>Error loading chat history. Please try again.</li>';
        }
    }

    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!currentUser) {
                alert("Please login to send messages.");
                openModal(loginModal); 
                return;
            }

            const formData = new FormData(chatForm);
            const data = {
                recipient: formData.get('recipient'),
                message: formData.get('message')
            };

            if (!data.recipient || !data.message) {
                alert("Recipient and message cannot be empty.");
                return;
            }

            try {
                const response = await fetch('/api/chat', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data) 
                });
                const result = await response.json();
                if (response.ok && result.success) {
                    document.getElementById('chatRecipient').value = '';
                    document.getElementById('chatMessage').value = '';
                    loadChatHistory(); 
                } else if (response.status === 401) {
                    alert('Session expired. Please login again.');
                    updateAuthState(null);
                    openModal(loginModal);
                }
                 else {
                    alert(`Failed to send message: ${result.error || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error sending chat message:', error);
                alert('Failed to send message. An error occurred.');
            }
        });
    }

    if (loadChatHistoryButton) {
        loadChatHistoryButton.addEventListener('click', loadChatHistory);
    }

    if (newsFeed) {
        async function loadNews() {
            newsFeed.innerHTML = '<li>Loading news...</li>';
            try {
                const response = await fetch('/api/news'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                newsFeed.innerHTML = ''; 
                if (data.news && data.news.length > 0) {
                    data.news.forEach(item => {
                        const li = document.createElement('li');
                        const timestamp = item.created_at ? new Date(item.created_at).toLocaleDateString() : 'unknown date';
                        li.innerHTML = `<strong>${item.title}</strong> (by ${item.author_username || 'System'} on ${timestamp})<br>${item.content}`;
                        newsFeed.appendChild(li);
                    });
                } else {
                    newsFeed.innerHTML = '<li>No news found.</li>';
                }
            } catch (error) {
                console.error('Error loading news:', error);
                newsFeed.innerHTML = '<li>Error loading news feed. Please try again later.</li>';
            }
        }
        loadNews(); 
    }

    if (scheduleBtn && scheduleTableBody) {
        async function loadSchedule() {
             if (!currentUser) {
                 alert("Please login to view the schedule.");
                 scheduleTableBody.innerHTML = '<tr><td colspan="3">Login Required</td></tr>';
                 openModal(loginModal);
                 return;
             }
            scheduleTableBody.innerHTML = '<tr><td colspan="3">Loading schedule...</td></tr>';
            try {
                const response = await fetch('/api/schedule');
                if (!response.ok) {
                    if (response.status === 401) {
                        scheduleTableBody.innerHTML = '<tr><td colspan="3">Session expired. Please login again.</td></tr>';
                        updateAuthState(null);
                        openModal(loginModal);
                    } else {
                        scheduleTableBody.innerHTML = `<tr><td colspan="3">Error loading schedule: ${response.statusText}</td></tr>`;
                    }
                    return;
                }
                const data = await response.json();
                scheduleTableBody.innerHTML = ''; 
                if (data.schedule && data.schedule.length > 0) {
                    data.schedule.forEach(row => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${row.employee_username}</td><td>${row.shift}</td><td>${row.date}</td>`;
                        scheduleTableBody.appendChild(tr);
                    });
                } else {
                     scheduleTableBody.innerHTML = '<tr><td colspan="3">No schedule data found.</td></tr>';
                }
            } catch (error) {
                console.error('Error loading schedule:', error);
                scheduleTableBody.innerHTML = '<tr><td colspan="3">Error loading schedule. Please try again.</td></tr>';
            }
        }
        scheduleBtn.addEventListener('click', loadSchedule);
     
    }


    async function loadLeaveRequests() {
        if (!currentUser || !leaveRequestsTableBody) {
            if (leaveRequestsTableBody) leaveRequestsTableBody.innerHTML = '<tr><td colspan="6">Login to view your requests.</td></tr>';
            return;
        }
        leaveRequestsTableBody.innerHTML = '<tr><td colspan="6">Loading requests...</td></tr>';

        try {
            const response = await fetch('/api/leave-requests'); 
            if (!response.ok) {
                 if (response.status === 401) {
                    leaveRequestsTableBody.innerHTML = '<tr><td colspan="6">Session expired. Please login again.</td></tr>';
                    updateAuthState(null);
                    openModal(loginModal);
                 } else {
                    leaveRequestsTableBody.innerHTML = `<tr><td colspan="6">Error loading requests: ${response.statusText}</td></tr>`;
                 }
                return;
            }
            const data = await response.json();
            leaveRequestsTableBody.innerHTML = ''; 
            if (data.leaveRequests && data.leaveRequests.length > 0) {
                data.leaveRequests.forEach(req => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${req.employee_username}</td>
                        <td>${req.type}</td>
                        <td>${req.start_date}</td>
                        <td>${req.end_date}</td>
                        <td>${req.reason}</td>
                        <td>${req.status}</td>
                    `;
                    leaveRequestsTableBody.appendChild(tr);
                });
            } else {
                leaveRequestsTableBody.innerHTML = '<tr><td colspan="6">You have not submitted any leave requests yet.</td></tr>';
            }
        } catch (error) {
            console.error('Error fetching leave requests:', error);
            leaveRequestsTableBody.innerHTML = '<tr><td colspan="6">Error loading your leave requests. Please try again.</td></tr>';
        }
    }

    if (leaveForm) {
        leaveForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!currentUser) {
                alert("Please login to submit a leave request.");
                 openModal(loginModal);
                return;
            }

            const formData = new FormData(leaveForm);
            const data = {
                type: formData.get('type'),
                start_date: formData.get('start_date'),
                end_date: formData.get('end_date'),
                reason: formData.get('reason')
            };

            if (!data.type || !data.start_date || !data.end_date || !data.reason) {
                alert("All fields are required for leave request.");
                return;
            }

            try {
                const response = await fetch('/api/leave', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                 const result = await response.json(); 

                if (response.ok) {
                    alert('Leave request submitted successfully!');
                    leaveForm.reset(); 
                    if (employeeLeaveNameInput) employeeLeaveNameInput.value = currentUser.username;
                    loadLeaveRequests(); 
                } else if (response.status === 401) {
                    alert('Session expired. Please login again.');
                    updateAuthState(null);
                    openModal(loginModal);
                } else {
                    alert(`Failed to submit request: ${result.error || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error submitting leave request:', error);
                alert('Failed to submit leave request. An error occurred.');
            }
        });
    }

    checkAuthStatus(); 

}); 