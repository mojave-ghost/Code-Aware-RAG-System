// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Chat functionality
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// API Configuration
const API_URL = 'http://127.0.0.1:5000';
let apiConnected = false;

// Check API connection on load
async function checkAPIConnection() {
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        apiConnected = data.status === 'healthy' && data.rag_initialized;

        if (apiConnected) {
            console.log('✓ Connected to RAG API');
            updateConnectionStatus(true);
        } else {
            console.log('⚠ API running but RAG not initialized');
            updateConnectionStatus(false);
        }
    } catch (error) {
        console.log('⚠ API not available - using demo mode');
        apiConnected = false;
        updateConnectionStatus(false);
    }
}

function updateConnectionStatus(connected) {
    const statusIndicator = document.getElementById('apiStatus');
    if (statusIndicator) {
        statusIndicator.textContent = connected ? 'Live RAG System' : 'Demo Mode';
        statusIndicator.className = connected ? 'status-live' : 'status-demo';
    }
}

function addMessage(content, isUser = false, sources = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Format message with markdown-style bold
    const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    messageContent.innerHTML = formattedContent;

    messageDiv.appendChild(messageContent);

    // Add sources if available
    if (sources && sources.length > 0) {
        const sourcesDiv = document.createElement('div');
        sourcesDiv.className = 'message-sources';
        sourcesDiv.innerHTML = '<strong>Sources:</strong>';

        const sourcesList = document.createElement('ul');
        sources.forEach(source => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="source-title">${source.title}</span>
                           <span class="source-type">[${source.type}]</span>
                           <span class="source-score">${(source.relevance_score * 100).toFixed(0)}% relevant</span>`;
            sourcesList.appendChild(li);
        });

        sourcesDiv.appendChild(sourcesList);
        messageDiv.appendChild(sourcesDiv);
    }

    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function queryRAGAPI(question) {
    try {
        const response = await fetch(`${API_URL}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, k: 3 })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('RAG API Error:', error);
        return null;
    }
}

async function handleSendMessage() {
    const message = userInput.value.trim();

    if (message === '') return;

    // Disable input while processing
    userInput.disabled = true;
    sendBtn.disabled = true;

    // Add user message
    addMessage(message, true);

    // Clear input
    userInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    if (apiConnected) {
        // Query the actual RAG API
        const result = await queryRAGAPI(message);

        removeTypingIndicator();

        if (result && result.answer) {
            addMessage(result.answer, false, result.sources);

            // Log query type for transparency
            console.log(`Query classified as: ${result.query_type}`);
            console.log(`Retrieved in: ${result.retrieval_time_ms}ms`);
        } else {
            addMessage("Sorry, I encountered an error processing your question. Please make sure the API server is running.", false);
        }
    } else {
        // Fallback to demo mode
        setTimeout(() => {
            removeTypingIndicator();
            addMessage("⚠ Demo Mode: The RAG API is not connected. Please start the Flask server with 'python app.py' to enable live queries.\n\nThis system can answer WordPress development questions like:\n- How to use wp_enqueue_script?\n- What are WordPress hooks?\n- How to create custom post types?", false);
        }, 500);
    }

    // Re-enable input
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
}

// Event listeners
sendBtn.addEventListener('click', handleSendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .flow-step, .metric-card, .finding-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Add typing indicator animation
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<div class="message-content">●●●</div>';
    typingDiv.id = 'typing';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing');
    if (typing) {
        typing.remove();
    }
}

// Initialize API connection check on page load
window.addEventListener('load', () => {
    checkAPIConnection();
});
