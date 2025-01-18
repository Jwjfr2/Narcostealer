// Get user email from localStorage
function getUserEmail() {
    return localStorage.getItem('userEmail') || 'user@example.com';
}

// Check if user is logged in
function checkLogin() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        window.location.href = 'index.html';
        return false;
    }
    return userEmail;
}

document.addEventListener('DOMContentLoaded', () => {
    // Check login and set welcome message
    const userEmail = checkLogin();
    if (!userEmail) return;

    // Set welcome message
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.textContent = `Welcome ${userEmail}`;

    // Initialize data counters
    const stats = {
        'Credentials': 85400,
        'Cookies': 142000,
        'Wallets': 2100
    };

    // Simulate loading data
    simulateCharts();
    simulateRealtimeUpdates(stats);
});

function simulateCharts() {
    // Simulate line chart animation
    const lineChart = document.querySelector('.line-chart');
    let path = '';
    for (let i = 0; i < 100; i++) {
        const x = i;
        const y = 50 + Math.sin(i / 10) * 30 + Math.random() * 10;
        path += i === 0 ? `M ${x},${y} ` : `L ${x},${y} `;
    }
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.width = '100%';
    svg.style.height = '100%';
    
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute('d', path);
    pathElement.style.stroke = '#ffffff';
    pathElement.style.strokeWidth = '0.5';
    pathElement.style.fill = 'none';
    pathElement.style.filter = 'blur(0.5px)';
    
    svg.appendChild(pathElement);
    lineChart.appendChild(svg);
}

function simulateRealtimeUpdates(stats) {
    // Update stats periodically
    setInterval(() => {
        document.querySelectorAll('.stat-card').forEach(card => {
            const statType = card.querySelector('h3').textContent;
            const statValue = card.querySelector('.stat-value');
            
            // Skip bot count update
            if (statType === 'Active Bots') {
                return;
            }
            
            // Calculate realistic increments based on stat type
            let increment = 0;
            switch(statType) {
                case 'Credentials':
                    // Add 2-10 credentials every update
                    increment = Math.floor(Math.random() * 8) + 2;
                    break;
                case 'Cookies':
                    // Add 15-50 cookies every update
                    increment = Math.floor(Math.random() * 35) + 15;
                    break;
                case 'Wallets':
                    // Add 0-2 wallets every update (more rare)
                    increment = Math.random() < 0.3 ? Math.floor(Math.random() * 2) + 1 : 0;
                    break;
            }
            
            // Update the stats object
            stats[statType] += increment;
            
            // Format and display the number
            let formattedValue;
            if (stats[statType] >= 1000000) {
                formattedValue = (stats[statType] / 1000000).toFixed(1) + 'M';
            } else if (stats[statType] >= 1000) {
                formattedValue = (stats[statType] / 1000).toFixed(1) + 'K';
            } else {
                formattedValue = stats[statType].toString();
            }
            
            // Update display with animation if there's an increment
            if (increment > 0) {
                statValue.style.transform = 'scale(1.1)';
                statValue.style.color = '#00ff9d';
                setTimeout(() => {
                    statValue.style.transform = 'scale(1)';
                    statValue.style.color = '';
                }, 300);
            }
            
            statValue.textContent = formattedValue;
            
            // Update percentage change
            const changeSpan = card.querySelector('.stat-change');
            if (changeSpan) {
                const totalChange = ((stats[statType] - getInitialValue(statType)) / getInitialValue(statType) * 100).toFixed(1);
                changeSpan.textContent = `+${totalChange}%`;
            }
        });
    }, 3000);

    function getInitialValue(statType) {
        switch(statType) {
            case 'Credentials': return 85400;
            case 'Cookies': return 142000;
            case 'Wallets': return 2100;
            default: return 0;
        }
    }

    // Add new log entries periodically with realistic data
    const logTypes = ['success', 'info', 'warning', 'error'];
    const logMessages = [
        { type: 'success', message: 'Retrieved [COUNT] cookies from Bot' },
        { type: 'info', message: 'Found [COUNT] new credentials from Bot' },
        { type: 'success', message: 'Extracted [COUNT] new wallet(s) from Bot' },
        { type: 'warning', message: 'Detected antivirus on Bot' },
        { type: 'error', message: 'Connection lost with Bot' }
    ];
    const countries = ['United States', 'Germany', 'Brazil', 'Russia', 'India', 'China', 'Ukraine', 'Romania'];

    setInterval(() => {
        const logTable = document.querySelector('.log-table');
        const newEntry = document.createElement('div');
        newEntry.className = 'log-entry';

        const time = new Date();
        const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
        
        // Select random message and customize it
        const messageTemplate = logMessages[Math.floor(Math.random() * logMessages.length)];
        let count = '';
        if (messageTemplate.message.includes('[COUNT]')) {
            switch(true) {
                case messageTemplate.message.includes('cookies'):
                    count = Math.floor(Math.random() * 35) + 15;
                    break;
                case messageTemplate.message.includes('credentials'):
                    count = Math.floor(Math.random() * 8) + 2;
                    break;
                case messageTemplate.message.includes('wallet'):
                    count = 1;
                    break;
            }
        }
        
        const message = messageTemplate.message.replace('[COUNT]', count);
        const country = countries[Math.floor(Math.random() * countries.length)];
        const botId = Math.floor(Math.random() * 1000 + 1337);

        newEntry.innerHTML = `
            <span class="log-time">${timeString}</span>
            <span class="log-type ${messageTemplate.type}">${messageTemplate.type.charAt(0).toUpperCase() + messageTemplate.type.slice(1)}</span>
            <span class="log-message">${message} #${botId} ${message.includes('Bot') ? 'from ' + country : ''}</span>
        `;

        // Add new entry at the top
        logTable.insertBefore(newEntry, logTable.firstChild);

        // Remove oldest entry if more than 6 entries
        if (logTable.children.length > 6) {
            logTable.removeChild(logTable.lastChild);
        }

        // Add fade-in effect
        newEntry.style.opacity = '0';
        newEntry.style.transform = 'translateY(-10px)';
        newEntry.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            newEntry.style.opacity = '1';
            newEntry.style.transform = 'translateY(0)';
        }, 50);
    }, 5000);
}

// Add click handlers for navigation
document.querySelectorAll('.nav-links li').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.nav-links li').forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
    });
});
