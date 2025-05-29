// SiteShot $404 - Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Boot Screen Animation
    const bootScreen = document.getElementById('bootScreen');
    setTimeout(() => {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    }, 3000);

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Glitch Hover Effect
    const glitchElements = document.querySelectorAll('.glitch-hover');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.classList.add('glitch');
            element.setAttribute('data-text', element.textContent);
        });
        
        element.addEventListener('mouseout', () => {
            element.classList.remove('glitch');
            element.removeAttribute('data-text');
        });
    });

    // Mouse Trail Effect
    const body = document.querySelector('body');
    let trail = [];
    const trailLength = 5;
    
    for (let i = 0; i < trailLength; i++) {
        let dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: absolute;
            width: ${10 - i}px;
            height: ${10 - i}px;
            background-color: rgba(0, 255, 255, ${0.8 - i * 0.15});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.1s;
        `;
        body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.opacity = '1';
                dot.style.left = e.clientX - dot.offsetWidth / 2 + 'px';
                dot.style.top = e.clientY - dot.offsetHeight / 2 + 'px';
                
                setTimeout(() => {
                    dot.style.opacity = '0';
                }, 100);
            }, index * 50);
        });
    });

    // Generate Fake Error Button
    const generateErrorBtn = document.getElementById('generate-error');
    const errorPopup = document.getElementById('error-popup');
    const closeError = document.getElementById('close-error');
    
    if (generateErrorBtn) {
        generateErrorBtn.addEventListener('click', () => {
            // Array of funny error messages
            const errorMessages = [
                "ERROR: Money not found in wallet",
                "CRITICAL: Portfolio value approaching zero",
                "WARNING: Brain.exe has stopped working",
                "FATAL ERROR: Diamond hands melting",
                "ERROR 404: Profits not found",
                "SYSTEM FAILURE: FUD overload",
                "CRITICAL: FOMO levels exceeding safe limits",
                "ALERT: Rug pull detected",
                "ERROR: Buy high, sell low protocol activated",
                "FATAL: Meme strength insufficient"
            ];
            
            // Random error sound
            const errorSound = new Audio(`data:audio/wav;base64,${generateErrorSound()}`);
            errorSound.play();
            
            // Get random error message
            const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            
            // Update error popup content
            const errorContent = errorPopup.querySelector('.window-content');
            if (errorContent) {
                errorContent.innerHTML = `
                    <div class="error-icon">⚠️</div>
                    <p class="error-message">${randomMessage}</p>
                    <button class="error-button">OK</button>
                `;
                
                // Add click event to the OK button
                const okButton = errorContent.querySelector('.error-button');
                okButton.addEventListener('click', () => {
                    errorPopup.style.display = 'none';
                });
            }
            
            // Show error popup
            errorPopup.style.display = 'block';
            
            // Position the popup randomly within viewport
            const maxX = window.innerWidth - 400;
            const maxY = window.innerHeight - 200;
            const randomX = Math.max(50, Math.floor(Math.random() * maxX));
            const randomY = Math.max(50, Math.floor(Math.random() * maxY));
            
            errorPopup.style.left = randomX + 'px';
            errorPopup.style.top = randomY + 'px';
            errorPopup.style.transform = 'none';
        });
    }
    
    if (closeError) {
        closeError.addEventListener('click', () => {
            errorPopup.style.display = 'none';
        });
    }

    // Crash Simulator
    const crashSlider = document.getElementById('crash-slider');
    const crashValue = document.getElementById('crash-value');
    
    if (crashSlider && crashValue) {
        crashSlider.addEventListener('input', () => {
            const value = crashSlider.value;
            crashValue.textContent = `System Stability: ${100 - value}%`;
            
            // Apply visual effects based on slider value
            const intensity = value / 100;
            
            // Apply glitch effect to the entire page
            document.body.style.filter = `blur(${intensity * 2}px) hue-rotate(${intensity * 30}deg)`;
            
            // If slider reaches maximum, trigger crash
            if (value >= 95) {
                triggerCrash();
            }
        });
        
        // Reset filter when slider is released
        crashSlider.addEventListener('mouseup', () => {
            if (crashSlider.value < 95) {
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 500);
            }
        });
    }

    // Function to trigger system crash
    function triggerCrash() {
        // Create crash overlay
        const crashOverlay = document.createElement('div');
        crashOverlay.className = 'crash-overlay';
        crashOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #0f0;
            font-family: 'VT323', monospace;
            font-size: 2rem;
        `;
        
        document.body.appendChild(crashOverlay);
        
        // Blue screen of death effect
        setTimeout(() => {
            crashOverlay.style.backgroundColor = '#0000aa';
            crashOverlay.innerHTML = `
                <div style="text-align: center; color: white;">
                    <h2 style="margin-bottom: 2rem;">FATAL ERROR</h2>
                    <p>A fatal exception 0E has occurred at 0028:C0011E36</p>
                    <p>The current application will be terminated.</p>
                    <p style="margin-top: 2rem;">Press any key to restart...</p>
                </div>
            `;
            
            // Listen for key press to "restart"
            document.addEventListener('keydown', restartSystem);
            document.addEventListener('click', restartSystem);
            
        }, 1000);
    }
    
    // Function to restart system after crash
    function restartSystem() {
        document.removeEventListener('keydown', restartSystem);
        document.removeEventListener('click', restartSystem);
        
        const crashOverlay = document.querySelector('.crash-overlay');
        if (crashOverlay) {
            // Show boot sequence
            crashOverlay.style.backgroundColor = '#000';
            crashOverlay.innerHTML = `
                <div class="bios-text">
                    <p>BIOS Version 4.04</p>
                    <p>Initializing system components...</p>
                    <p>Memory test: RECOVERING</p>
                    <p>Disk check: REPAIRING</p>
                    <p>Loading SiteShot $404...</p>
                    <p class="blink">SYSTEM RECOVERY COMPLETE</p>
                </div>
            `;
            
            // Remove crash overlay and reset UI
            setTimeout(() => {
                crashOverlay.style.opacity = '0';
                setTimeout(() => {
                    crashOverlay.remove();
                    document.body.style.filter = '';
                    if (crashSlider) {
                        crashSlider.value = 0;
                        crashValue.textContent = 'System Stability: 100%';
                    }
                }, 500);
            }, 3000);
        }
    }

    // Initialize Artifacts Gallery
    initArtifactsGallery();
    
    // Initialize Memetic Logs
    initMemeticLogs();
    
    // Initialize Tokenomics Chart
    initTokenomicsChart();
    
    // Initialize AI Chat
    initAIChat();
});

// Function to generate error sound
function generateErrorSound() {
    // This is a placeholder for a base64 encoded error sound
    // In a real implementation, you could use Web Audio API to generate sounds
    return '';
}

// Initialize Artifacts Gallery
function initArtifactsGallery() {
    const gallery = document.querySelector('.artifacts-gallery');
    
    if (gallery) {
        // Gallery items data
        const galleryItems = [
            { image: '1.png', title: 'The Great Crash of 2021', description: 'Oil on canvas, digital tears' },
            { image: '2.png', title: 'When Lambo Became When Bicycle', description: 'Mixed media on bankruptcy forms' },
            { image: '3.png', title: 'Red Candles Burning', description: 'Acrylic and liquidated assets' },
            { image: '4.png', title: 'Portrait of a Hodler', description: 'Digital collage, animated suffering' },
            { image: '5.png', title: 'Still Life with Empty Wallet', description: 'Charcoal on margin call notices' },
            { image: '6.png', title: 'The Scream (Market Edition)', description: 'Watercolor and panic selling' }
        ];
        
        // Create gallery items
        galleryItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            // Add glitch effect on hover
            galleryItem.addEventListener('mouseover', () => {
                const img = galleryItem.querySelector('img');
                img.style.filter = 'hue-rotate(90deg) contrast(150%) brightness(120%)';
            });
            
            galleryItem.addEventListener('mouseout', () => {
                const img = galleryItem.querySelector('img');
                img.style.filter = '';
            });
            
            gallery.appendChild(galleryItem);
        });
    }
}

// Initialize Memetic Logs
function initMemeticLogs() {
    const logs = document.querySelector('.memetic-logs');
    
    if (logs) {
        // Log data
        const logItems = [
            "ERROR: Tried to buy dip, dip kept dipping",
            "CRASH LOG: Portfolio down 99.9%, still bullish",
            "SYSTEM ALERT: Diamond hands protocol activated despite all logic",
            "WARNING: Wife still doesn't know about crypto investments",
            "CRITICAL: Confused 'sell' with 'buy' again",
            "NOTIFICATION: Ramen supplies running low, hodl endangered"
        ];
        
        // Create log items
        logItems.forEach(item => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logItem.innerHTML = `<p>${item}</p>`;
            logs.appendChild(logItem);
        });
        
        // Add typing effect to terminal
        const terminal = document.getElementById('terminal-output');
        if (terminal) {
            setTimeout(() => {
                terminal.innerHTML += `<p>> DISPLAYING MARKET FAILURES COMPLETE</p>`;
                terminal.innerHTML += `<p>> ANALYZING PAIN LEVELS: EXTREME</p>`;
                terminal.innerHTML += `<p>> RECOMMENDATION: BUY HIGH, SELL LOW</p>`;
            }, 2000);
        }
    }
}

// Initialize Tokenomics Chart
function initTokenomicsChart() {
    const chartCanvas = document.getElementById('tokenomics-chart');
    
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        // Set canvas dimensions
        chartCanvas.width = chartCanvas.parentElement.clientWidth;
        chartCanvas.height = chartCanvas.parentElement.clientHeight;
        
        // Draw glitchy chart
        drawGlitchyChart(ctx, chartCanvas.width, chartCanvas.height);
        
        // Add interaction to corrupt chart further
        chartCanvas.addEventListener('mousemove', (e) => {
            const rect = chartCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Draw corruption at mouse position
            drawCorruption(ctx, x, y);
        });
    }
}

// Draw glitchy chart
function drawGlitchyChart(ctx, width, height) {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Generate random price data
    const dataPoints = 20;
    const data = [];
    let price = 100;
    
    for (let i = 0; i < dataPoints; i++) {
        // Random price movement
        price += (Math.random() - 0.5) * 30;
        price = Math.max(10, price); // Ensure price doesn't go too low
        data.push(price);
    }
    
    // Draw price line
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const stepX = width / (dataPoints - 1);
    const maxPrice = Math.max(...data) * 1.1;
    
    for (let i = 0; i < dataPoints; i++) {
        const x = i * stepX;
        const y = height - (data[i] / maxPrice) * height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Add random glitches
        if (Math.random() < 0.2) {
            ctx.lineTo(x + Math.random() * 20 - 10, y + Math.random() * 40 - 20);
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Draw candles
    const candleWidth = stepX * 0.6;
    
    for (let i = 0; i < dataPoints - 1; i++) {
        const open = data[i];
        const close = data[i + 1];
        const high = Math.max(open, close) + Math.random() * 10;
        const low = Math.min(open, close) - Math.random() * 10;
        
        const x = i * stepX + stepX / 2;
        const y1 = height - (open / maxPrice) * height;
        const y2 = height - (close / maxPrice) * height;
        const y3 = height - (high / maxPrice) * height;
        const y4 = height - (low / maxPrice) * height;
        
        // Draw candle body
        ctx.fillStyle = close > open ? '#00ff55' : '#ff0055';
        ctx.fillRect(x - candleWidth / 2, y1, candleWidth, y2 - y1);
        
        // Draw wicks
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y3);
        ctx.lineTo(x, Math.min(y1, y2));
        ctx.moveTo(x, Math.max(y1, y2));
        ctx.lineTo(x, y4);
        ctx.stroke();
        
        // Add random glitches to some candles
        if (Math.random() < 0.3) {
            ctx.fillStyle = 'rgba(255, 0, 85, 0.5)';
            ctx.fillRect(x - candleWidth / 2 - Math.random() * 10, 
                        y1 + Math.random() * 20 - 10, 
                        candleWidth + Math.random() * 10, 
                        (y2 - y1) + Math.random() * 20 - 10);
        }
    }
}

// Draw corruption effect at mouse position
function drawCorruption(ctx, x, y) {
    // Draw glitchy pixels
    for (let i = 0; i < 50; i++) {
        const offsetX = Math.random() * 100 - 50;
        const offsetY = Math.random() * 100 - 50;
        const size = Math.random() * 5 + 1;
        
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
        ctx.fillRect(x + offsetX, y + offsetY, size, size);
    }
    
    // Draw digital artifacts
    ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
    ctx.fillRect(x - 50, y - 2, 100, 4);
    ctx.fillRect(x - 2, y - 50, 4, 100);
}

// Initialize AI Chat
function initAIChat() {
    const sendButton = document.getElementById('send-message');
    const userInput = document.getElementById('user-message');
    const chatMessages = document.getElementById('chat-messages');
    
    if (sendButton && userInput && chatMessages) {
        sendButton.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message) {
            // Add user message
            addMessage(message, 'user');
            
            // Clear input
            userInput.value = '';
            
            // Generate AI response after a short delay
            setTimeout(() => {
                const response = generateGlitchyResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
    }
    
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function generateGlitchyResponse(userMessage) {
        // Array of glitchy fortune responses
        const responses = [
            "ERROR 404: FUTURE NOT FOUND. YOUR INVESTMENTS WILL [REDACTED].",
            "CALCULATING PROBABILITY OF PROFIT... SYSTEM FAILURE. TRY AGAIN WHEN MARKET LESS BROKEN.",
            "YOUR FINANCIAL DESTINY APPEARS TO BE CORRUPTED. HAVE YOU TRIED TURNING IT OFF AND ON AGAIN?",
            "SCANNING MARKET CONDITIONS... RESULT: CHAOS IS THE ONLY CONSTANT.",
            "PREDICTION ENGINES OVERHEATING. YOUR PORTFOLIO HAS A 100% CHANCE OF BEING A PORTFOLIO.",
            "FORTUNE.EXE HAS CRASHED. BACKUP FORTUNE: BUY HIGH, SELL HIGHER... OR LOWER... UNCERTAIN.",
            "MARKET ANALYSIS COMPLETE: THE CHARTS WILL DEFINITELY MOVE TO THE RIGHT.",
            "YOUR QUESTION CONTAINS INVALID PARAMETERS. FORTUNE CANNOT BE COMPUTED WHEN LOGIC IS ABSENT FROM MARKETS.",
            "PROPHECY MODULE MALFUNCTIONING. BULLISH AND BEARISH SIGNALS DETECTED SIMULTANEOUSLY.",
            "FUTURE SCAN COMPLETE: I SEE GREEN CANDLES... OR RED... OR PERHAPS THEY'RE ON FIRE."
        ];
        
        // Return random response with some glitchy formatting
        let response = responses[Math.floor(Math.random() * responses.length)];
        
        // Add some glitchy characters
        response = response.replace(/A|E|I|O|U/g, match => {
            return Math.random() < 0.3 ? `${match}̷̢̛̠̖̩̙̜̘̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚͠͡ͅ` : match;
        });
        
        return response;
    }
} 