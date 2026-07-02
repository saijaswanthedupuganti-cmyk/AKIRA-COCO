document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('ai-chat-toggle');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeBtn = document.getElementById('ai-chat-close');
    const resetBtn = document.getElementById('ai-chat-reset');
    const inputField = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    const messagesContainer = document.getElementById('ai-chat-messages');
    const chipsContainer = document.getElementById('ai-chat-chips');
    const tooltip = document.getElementById('ai-chat-tooltip');

    let chatState = 'IDLE';
    let leadData = { name: '', intent: '' };
    const sessionId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

    function syncToCRM() {
        const payload = {
            sessionId,
            name: leadData.name,
            intent: leadData.intent,
            timestamp: new Date().toISOString()
        };
        fetch('http://localhost:5000/api/chat-sessions/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => console.error('CRM sync failed', err));
    }

    // Show tooltip after a short delay
    setTimeout(() => {
        if (chatWindow.classList.contains('hidden') && tooltip) {
            tooltip.classList.add('show');
            setTimeout(() => tooltip.classList.remove('show'), 4000);
        }
    }, 3000);

    // Toggles
    if (tooltip) {
        tooltip.addEventListener('click', () => {
            tooltip.classList.remove('show');
            tooltip.style.display = 'none';
            chatWindow.classList.remove('hidden');
            inputField.focus();
            trackGA('chat_opened');
        });
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (tooltip) {
                tooltip.classList.remove('show');
                tooltip.style.display = 'none';
            }
            chatWindow.classList.toggle('hidden');
            if (!chatWindow.classList.contains('hidden')) {
                inputField.focus();
                trackGA('chat_opened');
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            messagesContainer.innerHTML = `
                <div class="ai-msg bot">
                    Welcome to AKIRA. I am your personal Cacao Concierge. How may I assist you today?
                </div>
            `;
            chipsContainer.style.display = 'flex';
            chatState = 'IDLE';
            leadData = { name: '', intent: '' };
            trackGA('chat_reset');
        });
    }

    // Handle Quick Reply Chips
    document.querySelectorAll('.ai-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            const text = e.target.innerText;
            handleUserMessage(text);
            chipsContainer.style.display = 'none';
        });
    });

    // Handle Input
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const text = inputField.value.trim();
            if (text) handleUserMessage(text);
        });
    }

    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = inputField.value.trim();
                if (text) handleUserMessage(text);
            }
        });
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-msg ${sender}`;
        msgDiv.innerHTML = text;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-typing';
        typingDiv.id = 'ai-typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) indicator.remove();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function trackGA(eventName, eventParams = {}) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
            console.log(`GA Event Tracked: ${eventName}`, eventParams);
        } else {
            console.log(`[Mock GA] ${eventName}`, eventParams);
        }
    }

    // --- State Machine Brain ---
    function handleUserMessage(text) {
        appendMessage(text, 'user');
        inputField.value = '';
        chipsContainer.style.display = 'none';
        trackGA('chat_message_sent', { message_length: text.length });

        showTypingIndicator();
        
        // Mock delay to feel natural
        setTimeout(() => {
            removeTypingIndicator();
            const lowerText = text.toLowerCase();
            let reply = '';

            if (chatState === 'ASKING_NAME') {
                leadData.name = text;
                chatState = 'IDLE';
                
                // Construct WhatsApp Link
                const waMessage = `Hi! I am ${leadData.name}. I am reaching out regarding: ${leadData.intent}`;
                const waUrl = `https://wa.me/918121117999?text=${encodeURIComponent(waMessage)}`;
                
                reply = `Pleasure to meet you, ${leadData.name}. Our master chocolatiers handle all inquiries personally on WhatsApp.<br><br>
                <a href="${waUrl}" target="_blank" style="display:inline-block; padding:10px 16px; background:var(--c-gold); color:var(--c-bg); text-decoration:none; border-radius:12px; font-weight:600; margin-top:12px;" onclick="trackGA('whatsapp_redirect_clicked')">
                   <svg style="vertical-align:middle; margin-right:6px;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Continue on WhatsApp
                </a>`;
                
                trackGA('lead_captured', { lead_intent: leadData.intent });
                syncToCRM(); // Save to backend
                appendMessage(reply, 'bot');
                return;
            }

            // Keyword intents
            if (lowerText.includes('bulk') || lowerText.includes('event') || lowerText.includes('corporate')) {
                leadData.intent = 'Bulk / Corporate Order';
                chatState = 'ASKING_NAME';
                reply = "We offer bespoke packaging and exclusive batches for bulk orders. May I have your name before I connect you to our team?";
            } 
            else if (lowerText.includes('shop') || lowerText.includes('buy') || lowerText.includes('order') || lowerText.includes('collection')) {
                leadData.intent = 'Shopping / Product Inquiry';
                chatState = 'ASKING_NAME';
                reply = "Excellent choice. To arrange a direct delivery of our finest cacao, may I have your name?";
            }
            else if (lowerText.includes('origin') || lowerText.includes('farm') || lowerText.includes('where') || lowerText.includes('story')) {
                reply = "Our cacao is meticulously harvested from single-estate farms in the Godavari Delta, Andhra Pradesh. The unique terroir gives our chocolate its signature flavor profile. <br><br>Would you like to explore our collection or place an inquiry?";
            }
            else {
                leadData.intent = 'General Inquiry: ' + text;
                chatState = 'ASKING_NAME';
                reply = "I would be delighted to assist you with that. To connect you with the right expert, may I have your name first?";
            }

            appendMessage(reply, 'bot');
        }, 1000 + Math.random() * 500);
    }
});
