// Terminal Portfolio Script
const terminal = {
    output: null,
    input: null,
    commandHistory: [],
    historyIndex: -1,
    
    // User Data - Update these with your information
    userData: null,
    
    // Load user data from JSON file
    loadData: async function() {
        try {
            // Try to load from data.json first (if using web server)
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('Failed to load data.json');
            }
            this.userData = await response.json();
            console.log('✓ User data loaded successfully from data.json');
        } catch (error) {
            console.log('Loading embedded data (file:// protocol)');
            // Embedded data for local file access (without web server)
            this.userData = {
                "name": "Purushottam Dey",
                "title": "Jr. QA Engineer",
                "location": "working remotely from Kolkata, India",
                "photo": "assets/images/profile.png",
                "email": "purushottam.dey@outlook.com",
                "github": "https://github.com/purushottamdey",
                "linkedin": "https://www.linkedin.com/in/purushottam-dey2/",
                "about": "I'm a passionate developer with expertise in building modern web applications.\nI love creating efficient, scalable solutions and exploring new technologies.\nCurrently focused on full-stack development with a keen interest in DevOps and cloud technologies.",
                "skills": [
                    { "name": "JavaScript/TypeScript", "level": "Expert", "icon": "code" },
                    { "name": "React/Vue/Angular", "level": "Advanced", "icon": "component" },
                    { "name": "Node.js/Express", "level": "Advanced", "icon": "server" },
                    { "name": "Python/Django", "level": "Intermediate", "icon": "python" },
                    { "name": "Database (SQL/NoSQL)", "level": "Advanced", "icon": "database" },
                    { "name": "Docker/Kubernetes", "level": "Intermediate", "icon": "container" },
                    { "name": "AWS/Azure/GCP", "level": "Intermediate", "icon": "cloud" },
                    { "name": "Git/CI/CD", "level": "Advanced", "icon": "git" }
                ],
                "experience": [
                    {
                        "title": "Jr. QA Engineer",
                        "company": "The Elixr Labs",
                        "duration": "2022 - Present",
                        "description": "As a Qa Engineer, I am responsible for designing and executing test plans, identifying bugs, and ensuring the quality of software products through automated and manual testing."
                    }
                ],
                "projects": [
                    {
                        "name": "E-Commerce Platform",
                        "description": "Full-stack e-commerce solution with React, Node.js, and MongoDB",
                        "github": "https://github.com/yourusername/ecommerce-platform",
                        "tech": ["React", "Node.js", "MongoDB", "Redis"]
                    },
                    {
                        "name": "Real-time Chat Application",
                        "description": "WebSocket-based chat app with end-to-end encryption",
                        "github": "https://github.com/yourusername/chat-app",
                        "tech": ["Socket.io", "Express", "PostgreSQL"]
                    },
                    {
                        "name": "DevOps Dashboard",
                        "description": "Monitoring dashboard for containerized applications",
                        "github": "https://github.com/yourusername/devops-dashboard",
                        "tech": ["Vue.js", "Docker", "Kubernetes", "Prometheus"]
                    }
                ],
                "certifications": [
                    {
                        "name": "AWS Certified Solutions Architect",
                        "issuer": "Amazon Web Services",
                        "date": "2023",
                        "credentialId": "ABC123XYZ"
                    },
                    {
                        "name": "Certified Kubernetes Administrator",
                        "issuer": "Cloud Native Computing Foundation",
                        "date": "2022",
                        "credentialId": "CKA-2022-001"
                    },
                    {
                        "name": "Professional Scrum Master I",
                        "issuer": "Scrum.org",
                        "date": "2021",
                        "credentialId": "PSM-123456"
                    }
                ]
            };
        }
    },
    
    commands: {
        ls: {
            description: "List all available commands",
            execute: () => terminal.showHelp()
        },
        scan: {
            description: "Scan target profile data",
            execute: () => terminal.showAbout()
        },
        hack: {
            description: "Initiate hack sequence (show skills)",
            execute: () => terminal.showSkills()
        },
        exploit: {
            description: "Exploit vulnerabilities (show experience)",
            execute: () => terminal.showExperience()
        },
        netstat: {
            description: "Network status & connections",
            execute: () => terminal.showContact()
        },
        recon: {
            description: "Reconnaissance mission data",
            execute: () => terminal.showProjects()
        },
        certs: {
            description: "Display certifications & awards",
            execute: () => terminal.showCertifications()
        },
        clear: {
            description: "Clear terminal screen",
            execute: () => terminal.clearScreen()
        },
        github: {
            description: "Open GitHub profile",
            execute: () => terminal.openGithub()
        },
        linkedin: {
            description: "Open LinkedIn profile",
            execute: () => terminal.openLinkedIn()
        },
        matrix: {
            description: "Toggle matrix rain effect",
            execute: () => terminal.toggleMatrix()
        },
        theme: {
            description: "Change terminal theme (green/blue/red/purple/yellow)",
            execute: (args) => terminal.changeTheme(args[0])
        },
        whoami: {
            description: "Display current user info",
            execute: () => terminal.triggerRedAlert()
        }
    },
    
    init: async function() {
        // Load user data first
        await this.loadData();
        
        this.output = document.getElementById('output');
        this.input = document.getElementById('commandInput');
        
        // Setup close button
        const closeBtn = document.querySelector('.btn-close');
        if (closeBtn) {
            closeBtn.style.cursor = 'pointer';
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof introSequence !== 'undefined' && introSequence.returnFromTerminal) {
                    introSequence.returnFromTerminal();
                }
            });
        }
        
        // Setup event listeners
        this.input.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.input.addEventListener('blur', () => {
            setTimeout(() => this.input.focus(), 0);
        });
        this.input.focus();
        
        // Focus input when clicking terminal
        document.querySelector('.terminal-body').addEventListener('click', (e) => {
            e.preventDefault();
            this.input.focus();
        });
        
        // Prevent any clicks from unfocusing
        document.addEventListener('click', (e) => {
            if (!this.input.contains(e.target)) {
                e.preventDefault();
                this.input.focus();
            }
        });
        
        // Animate banner and welcome text
        this.animateBanner();
    },
    
    animateBanner: function() {
        const banner = document.getElementById('banner');
        const welcomeText = document.querySelector('.welcome-text');
        
        // Animate ASCII art
        anime({
            targets: banner,
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 1000,
            easing: 'easeOutExpo'
        });
        
        // Animate welcome text
        anime({
            targets: welcomeText,
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 800,
            delay: 500,
            easing: 'easeOutExpo'
        });
    },
    
    handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.input.value.trim();
            
            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.executeCommand(command);
                this.input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete();
        }
    },
    
    executeCommand: function(input) {
        let [cmd, ...args] = input.toLowerCase().trim().split(' ');
        
        console.log('Command received:', cmd);
        console.log('Available commands:', Object.keys(this.commands));
        
        // Map aliases to main command
        if (cmd === 'dir') cmd = 'ls';
        if (cmd === 'cls') cmd = 'clear';
        if (cmd === 'about' || cmd === 'info') cmd = 'scan';
        if (cmd === 'skills') cmd = 'hack';
        if (cmd === 'experience') cmd = 'exploit';
        if (cmd === 'contact') cmd = 'netstat';
        if (cmd === 'projects') cmd = 'recon';
        if (cmd === 'list') cmd = 'ls';
        
        // Display command
        this.addCommandLine(input);
        
        // Execute command with JARVIS-style animation
        if (this.commands[cmd]) {
            console.log('Executing command:', cmd);
            // Show system messages quickly
            this.addSystemMessage('[....] Establishing satellite connection');
            
            setTimeout(() => {
                this.addSystemMessage('[ OK ] Signal acquired - Fetching data');
                
                setTimeout(() => {
                    this.addSystemMessage('[ OK ] Data retrieved - Rendering');
                    
                    setTimeout(() => {
                        try {
                            this.commands[cmd].execute(args);
                        } catch (error) {
                            this.addOutput(`Error: ${error.message}`, 'error');
                            console.error('Command error:', error);
                        }
                    }, 200);
                }, 300);
            }, 200);
        } else {
            this.addSystemMessage('[FAIL] Command not recognized');
            setTimeout(() => {
                this.addOutput(`Command not found: <span class="highlight">${cmd}</span>`, 'error');
            }, 200);
        }
    },
    
    addCommandLine: function(command) {
        const cmdLine = document.createElement('div');
        cmdLine.className = 'command-line';
        cmdLine.innerHTML = `
            <span class="prompt">visitor@portfolio:~$</span>
            <span>${this.escapeHtml(command)}</span>
        `;
        this.output.appendChild(cmdLine);
        
        // Animate command line with CSS fallback
        if (typeof anime !== 'undefined') {
            anime({
                targets: cmdLine,
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 300,
                easing: 'easeOutCubic'
            });
        } else {
            cmdLine.style.opacity = '1';
        }
        
        this.scrollToBottom();
    },
    
    addSystemMessage: function(message) {
        const sysMsg = document.createElement('div');
        sysMsg.className = 'system-message scanning';
        sysMsg.innerHTML = message;
        this.output.appendChild(sysMsg);
        
        // Animate system message with fallback
        if (typeof anime !== 'undefined') {
            anime({
                targets: sysMsg,
                opacity: [0, 0.9],
                translateX: [-20, 0],
                duration: 400,
                easing: 'easeOutQuad'
            });
        } else {
            sysMsg.style.opacity = '0.9';
        }
        
        this.scrollToBottom();
    },
    
    addOutput: function(content, type = 'normal') {
        const output = document.createElement('div');
        output.className = `output-text ${type}`;
        output.innerHTML = content;
        this.output.appendChild(output);
        
        // JARVIS-style animation with fallback
        if (typeof anime !== 'undefined') {
            anime({
                targets: output,
                opacity: [0, 1],
                translateX: [-40, 0],
                duration: 600,
                easing: 'easeOutExpo'
            });
        } else {
            output.style.opacity = '1';
        }
        
        this.scrollToBottom();
    },
    
    showHelp: function() {
        let helpText = '<div class="help-section">';
        helpText += '<p class="highlight">Available Commands:</p>';
        
        for (const [cmd, data] of Object.entries(this.commands)) {
            helpText += `<div class="help-command">
                <span class="cmd">${cmd}</span>
                <span class="desc">${data.description}</span>
            </div>`;
        }
        
        helpText += '</div>';
        this.addOutput(helpText);
    },
    
    showAbout: function() {
        const svgIcon = this.getSVGIcon('user');
        let aboutText = `
            <div style="margin: 0;">
                ${svgIcon}
                <span class="highlight" style="font-size: 18px;">${this.userData.name}</span><br>
                <span class="info">${this.userData.title}</span><br>
                <span style="color: var(--warning-color);">${this.userData.location}</span>
                <br><br>
                <p>${this.userData.about.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        this.addOutput(aboutText);
    },
    
    triggerRedAlert: function() {
        // Show initial message
        const svgIcon = this.getSVGIcon('user');
        let aboutText = `
            <div style="margin: 0;">
                ${svgIcon}
                <span class="highlight" style="font-size: 18px;">${this.userData.name}</span><br>
                <span class="info">${this.userData.title}</span><br>
                <span style="color: var(--warning-color);">${this.userData.location}</span>
                <br><br>
                <p>${this.userData.about.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        this.addOutput(aboutText);
        
        // Trigger the red alert sequence immediately for mini terminal, with delay for main
        const isMiniTerminal = this.output && this.output.id === 'miniOutput';
        const delay = isMiniTerminal ? 500 : 2000;
        
        setTimeout(() => {
            this.startRedAlertSequence();
        }, delay);
    },
    
    startRedAlertSequence: function() {
        // Add red alert theme to entire page
        document.body.classList.add('red-alert-active');
        
        // Play alarm sound
        const alarmSound = new Audio();
        alarmSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCiJ0/LTgjMGHm7A7+OZUQ0PVqzn77FhGQU+mdvy0YMuBSZ/zPDdi' +
            'jcIDWSy6+OdUhAOUKXh8K5hGgU8ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8LdlGgU+ldjywH0pBCuF0PTYhzYIGWq27OylUhEPVq3o8A==';
        alarmSound.loop = true;
        alarmSound.volume = 0.7;
        alarmSound.play().catch(e => console.log('Alarm autoplay blocked:', e));
        
        // Show red alert screen
        const redAlertScreen = document.getElementById('redAlertScreen');
        if (redAlertScreen) {
            redAlertScreen.classList.add('active');
            
            // Simulate IP detection
            setTimeout(() => {
                document.getElementById('sourceIP').textContent = '192.168.1.' + Math.floor(Math.random() * 255);
            }, 1000);
            
            setTimeout(() => {
                document.getElementById('sourceLocation').textContent = 'EARTH / UNKNOWN REGION';
            }, 2000);
            
            // Animate progress bar
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 2;
                const progressBar = document.getElementById('alertProgress');
                const progressPercent = document.getElementById('alertPercent');
                if (progressBar && progressPercent) {
                    progressBar.style.width = progress + '%';
                    progressPercent.textContent = progress + '%';
                }
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    // After progress completes, start particle voice
                    setTimeout(() => {
                        this.playParticleVoice(alarmSound);
                    }, 1000);
                }
            }, 50);
        }
    },
    
    playParticleVoice: function(alarmSound) {
        // Stop alarm
        if (alarmSound) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
        
        // Play random audio from interactive particles
        const audioFiles = [
            'models/audio/This is not magic.mp3',
            'models/audio/This bug wasnt hiding.mp3',
            'models/audio/No alerts.mp3'
        ];
        
        const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
        const voice = new Audio(randomAudio);
        voice.volume = 1.0;
        
        voice.play().then(() => {
            console.log('Particle voice playing:', randomAudio);
        }).catch(e => {
            console.log('Voice play failed:', e);
            // If autoplay blocked, play on next user interaction
            document.addEventListener('click', () => {
                voice.play();
            }, { once: true });
        });
        
        // After voice plays, you can trigger next animation
        voice.onended = () => {
            console.log('Voice ended - ready for next animation');
            
            // Close red alert after 5 seconds
            setTimeout(() => {
                this.closeRedAlert();
            }, 5000);
        };
    },
    
    closeRedAlert: function() {
        // Keep red alert theme active for DDoS attack
        // Don't remove body.red-alert-active here
        
        // Hide the alert screen
        const alertScreen = document.querySelector('.red-alert-screen');
        if (alertScreen) {
            alertScreen.classList.remove('active');
        }
        
        console.log('Red alert screen closed - theme remains active');
        
        // Trigger DDoS attack simulation
        setTimeout(() => {
            this.startDDoSAttack();
        }, 1000);
    },
    
    startDDoSAttack: async function() {
        console.log('Starting DDoS attack simulation...');
        
        // Load achievement data
        let achievements = [];
        try {
            const response = await fetch('achievement.json');
            const data = await response.json();
            achievements = data.achievements;
        } catch (error) {
            console.error('Failed to load achievement.json:', error);
            return;
        }
        
        const container = document.getElementById('ddosContainer');
        if (!container) return;
        
        container.style.display = 'block';
        container.innerHTML = '';
        
        // Take first 20 achievements
        const selectedAchievements = achievements.slice(0, 20);
        
        // Create cards with random positions and delays
        selectedAchievements.forEach((achievement, index) => {
            setTimeout(() => {
                this.createDDoSCard(achievement, container);
            }, index * 200); // Stagger appearance
        });
    },
    
    createDDoSCard: function(achievement, container) {
        const card = document.createElement('div');
        card.className = 'ddos-card';
        
        // Random position
        const randomX = Math.random() * (window.innerWidth - 350);
        const randomY = Math.random() * (window.innerHeight - 400);
        card.style.left = randomX + 'px';
        card.style.top = randomY + 'px';
        
        // Get icon based on type
        const icon = this.getDDoSIcon(achievement.type, achievement.icon);
        
        // Build card content based on type
        let bodyContent = '';
        
        if (achievement.type === 'bugs') {
            bodyContent = `
                <div class="ddos-stat-row">
                    <span class="ddos-stat-label">Blocker</span>
                    <span class="ddos-stat-value critical">${achievement.blocker}</span>
                </div>
                <div class="ddos-stat-row">
                    <span class="ddos-stat-label">Critical</span>
                    <span class="ddos-stat-value high">${achievement.critical}</span>
                </div>
                <div class="ddos-stat-row">
                    <span class="ddos-stat-label">Major</span>
                    <span class="ddos-stat-value medium">${achievement.major}</span>
                </div>
                <div class="ddos-stat-row">
                    <span class="ddos-stat-label">Minor</span>
                    <span class="ddos-stat-value low">${achievement.minor}</span>
                </div>
                <div class="ddos-stat-row">
                    <span class="ddos-stat-label">Trivial</span>
                    <span class="ddos-stat-value low">${achievement.trivial}</span>
                </div>
                <div class="ddos-stat-row" style="margin-top: 10px; border-top: 2px solid rgba(10, 224, 223, 0.3); padding-top: 10px;">
                    <span class="ddos-stat-label">Total Bugs</span>
                    <span class="ddos-stat-value">${achievement.total}</span>
                </div>
            `;
        } else if (achievement.type === 'tool') {
            bodyContent = `
                <div class="ddos-description">${achievement.description}</div>
                ${achievement.impact ? `<div class="ddos-impact">⚡ ${achievement.impact}</div>` : ''}
            `;
        } else if (achievement.type === 'award' || achievement.type === 'certification') {
            bodyContent = `
                <div class="ddos-description">${achievement.description}</div>
                <div class="ddos-stat-row" style="margin-top: 10px;">
                    <span class="ddos-stat-label">Organization</span>
                    <span class="ddos-stat-value">${achievement.organization || achievement.date || 'N/A'}</span>
                </div>
            `;
        } else if (achievement.type === 'activity') {
            bodyContent = `
                <div class="ddos-stat-row">
                    <span class="ddos-stat-label">Count</span>
                    <span class="ddos-stat-value">${achievement.value}</span>
                </div>
                <div class="ddos-description">${achievement.description}</div>
            `;
        }
        
        card.innerHTML = `
            <div class="ddos-close-btn" onclick="terminal.closeDDoSCard(this)">×</div>
            <div class="ddos-card-header">
                <div class="ddos-card-icon">${icon}</div>
                <div class="ddos-card-title">${achievement.title}</div>
            </div>
            <div class="ddos-card-body">
                ${bodyContent}
            </div>
        `;
        
        container.appendChild(card);
        
        // Auto-remove after some time (optional)
        // setTimeout(() => card.remove(), 15000);
    },
    
    closeDDoSCard: function(closeBtn) {
        const card = closeBtn.parentElement;
        const container = document.getElementById('ddosContainer');
        
        // Animate card removal
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.5) rotate(10deg)';
        
        setTimeout(() => {
            card.remove();
            
            // Check if all cards are closed
            const remainingCards = container.querySelectorAll('.ddos-card');
            if (remainingCards.length === 0) {
                // All cards closed - remove red theme
                document.body.classList.remove('red-alert-active');
                container.style.display = 'none';
                console.log('All DDoS cards closed - red theme removed');
            }
        }, 300);
    },
    
    getDDoSIcon: function(type, iconName) {
        const icons = {
            trophy: '🏆',
            tool: '🔧',
            dashboard: '📊',
            document: '📄',
            code: '💻',
            certificate: '🎓',
            api: '🔌',
            chart: '📈',
            education: '👨‍🏫',
            bugs: '🐛',
            shield: '🛡️',
            database: '💾',
            browsers: '🌐',
            mobile: '📱',
            ai: '🤖'
        };
        
        if (iconName && icons[iconName]) {
            return icons[iconName];
        }
        
        // Default icons by type
        const typeIcons = {
            award: '🏆',
            bugs: '🐛',
            tool: '🔧',
            activity: '📊',
            certification: '🎓'
        };
        
        return typeIcons[type] || '⚡';
    },
    
    showSkills: function() {
        const container = document.createElement('div');
        container.className = 'skills-grid';
        this.output.appendChild(container);
        
        // Animate each skill one by one
        this.userData.skills.forEach((skill, index) => {
            setTimeout(() => {
                const icon = this.getSVGIcon(skill.icon);
                const skillDiv = document.createElement('div');
                skillDiv.className = 'skill-item data-item';
                skillDiv.innerHTML = `
                    ${icon}
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-level">${skill.level}</div>
                `;
                container.appendChild(skillDiv);
                
                // JARVIS reveal animation with fallback
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: skillDiv,
                        opacity: [0, 1],
                        translateX: [-60, 0],
                        scale: [0.8, 1],
                        duration: 800,
                        easing: 'easeOutElastic(1, .8)'
                    });
                } else {
                    skillDiv.style.opacity = '1';
                    skillDiv.style.transform = 'translateX(0)';
                }
                
                this.scrollToBottom();
            }, index * 200);
        });
    },
    
    showExperience: function() {
        const container = document.createElement('div');
        container.style.margin = '0';
        this.output.appendChild(container);
        
        // Reveal each experience one by one
        this.userData.experience.forEach((exp, index) => {
            setTimeout(() => {
                const expDiv = document.createElement('div');
                expDiv.className = 'experience-item data-item';
                expDiv.innerHTML = `
                    <div class="exp-title glow">${exp.title}</div>
                    <div class="exp-company">${exp.company}</div>
                    <div class="exp-duration">${exp.duration}</div>
                    <div class="exp-description">${exp.description}</div>
                `;
                container.appendChild(expDiv);
                
                // Dramatic reveal with fallback
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: expDiv,
                        opacity: [0, 1],
                        translateX: [-80, 0],
                        rotateY: [-15, 0],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                } else {
                    expDiv.style.opacity = '1';
                    expDiv.style.transform = 'translateX(0)';
                }
                
                this.scrollToBottom();
            }, index * 400);
        });
    },
    
    showProjects: function() {
        const container = document.createElement('div');
        container.style.margin = '0';
        this.output.appendChild(container);
        
        // Reveal projects one by one
        this.userData.projects.forEach((project, index) => {
            setTimeout(() => {
                const icon = this.getSVGIcon('github');
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project-item data-item scanning';
                projectDiv.innerHTML = `
                    ${icon}
                    <div class="project-name glow">${project.name}</div>
                    <div class="project-desc">${project.description}</div>
                    <div><strong>Tech Stack:</strong> ${project.tech.join(', ')}</div>
                    <a href="${project.github}" target="_blank" class="project-link">
                        View on GitHub →
                    </a>
                `;
                container.appendChild(projectDiv);
                
                // JARVIS project reveal with fallback
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: projectDiv,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        scale: [0.9, 1],
                        duration: 900,
                        easing: 'easeOutBack'
                    });
                } else {
                    projectDiv.style.opacity = '1';
                    projectDiv.style.transform = 'translateY(0)';
                }
                
                this.scrollToBottom();
            }, index * 500);
        });
    },
    
    showCertifications: function() {
        if (!this.userData.certifications || this.userData.certifications.length === 0) {
            this.addOutput('No certifications data available.', 'warning');
            return;
        }
        
        const container = document.createElement('div');
        container.style.margin = '0';
        this.output.appendChild(container);
        
        this.userData.certifications.forEach((cert, index) => {
            setTimeout(() => {
                const certDiv = document.createElement('div');
                certDiv.className = 'cert-item data-item';
                certDiv.innerHTML = `
                    <div class="cert-name glow">${cert.name}</div>
                    <div class="cert-issuer">${cert.issuer}</div>
                    <div class="cert-meta">
                        <span>Issued: ${cert.date}</span>
                        ${cert.credentialId ? `<span class="cert-id">ID: ${cert.credentialId}</span>` : ''}
                    </div>
                `;
                container.appendChild(certDiv);
                
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: certDiv,
                        opacity: [0, 1],
                        translateX: [-60, 0],
                        scale: [0.9, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                } else {
                    certDiv.style.opacity = '1';
                }
                
                this.scrollToBottom();
            }, index * 300);
        });
    },
    
    showContact: function() {
        const emailIcon = this.getSVGIcon('email');
        const githubIcon = this.getSVGIcon('github');
        const linkedinIcon = this.getSVGIcon('linkedin');
        
        let contactHTML = `
            <div style="margin: 15px 0;">
                <p class="highlight" style="margin-bottom: 15px;">Get in touch:</p>
                
                <div class="contact-item">
                    ${emailIcon}
                    <span class="label">Email:</span>
                    <a href="mailto:${this.userData.email}">${this.userData.email}</a>
                </div>
                
                <div class="contact-item">
                    ${githubIcon}
                    <span class="label">GitHub:</span>
                    <a href="${this.userData.github}" target="_blank">${this.userData.github}</a>
                </div>
                
                <div class="contact-item">
                    ${linkedinIcon}
                    <span class="label">LinkedIn:</span>
                    <a href="${this.userData.linkedin}" target="_blank">${this.userData.linkedin}</a>
                </div>
            </div>
        `;
        
        this.addOutput(contactHTML);
    },
    
    clearScreen: function() {
        anime({
            targets: this.output.children,
            opacity: [1, 0],
            translateY: [0, -20],
            duration: 300,
            delay: anime.stagger(30),
            easing: 'easeInExpo',
            complete: () => {
                this.output.innerHTML = '';
            }
        });
    },
    
    openGithub: function() {
        this.addOutput(`Opening GitHub profile...`, 'info');
        setTimeout(() => {
            window.open(this.userData.github, '_blank');
        }, 500);
    },
    
    openLinkedIn: function() {
        this.addOutput(`Opening LinkedIn profile...`, 'info');
        setTimeout(() => {
            window.open(this.userData.linkedin, '_blank');
        }, 500);
    },
    
    toggleMatrix: function() {
        let matrixCanvas = document.querySelector('.matrix-bg');
        
        if (matrixCanvas) {
            matrixCanvas.remove();
            this.addOutput('Matrix effect disabled.', 'info');
        } else {
            this.createMatrixEffect();
            this.addOutput('Matrix effect enabled.', 'info');
        }
    },
    
    createMatrixEffect: function() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-bg';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
    },
    
    changeTheme: function(color) {
        const themes = {
            green: '#00ff41',
            blue: '#00d4ff',
            red: '#ff3860',
            purple: '#bd93f9',
            yellow: '#ffdd57'
        };
        
        if (themes[color]) {
            document.documentElement.style.setProperty('--text-color', themes[color]);
            this.addOutput(`Theme changed to ${color}.`, 'info');
        } else {
            this.addOutput(`Available themes: ${Object.keys(themes).join(', ')}`, 'warning');
        }
    },
    
    autoComplete: function() {
        const value = this.input.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(value));
        
        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`Possible commands: ${matches.join(', ')}`, 'info');
        }
    },
    
    getSVGIcon: function(type) {
        const icons = {
            user: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
            code: '<svg class="icon" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
            email: '<svg class="icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
            github: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>',
            linkedin: '<svg class="icon" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
            component: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11L12 2zM5.5 13a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm13 0a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/></svg>',
            server: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 1h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 8h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm0 8h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zM9 5h1V3H9v2zm0 8h1v-2H9v2zm0 8h1v-2H9v2zM6 5h1V3H6v2zm0 8h1v-2H6v2zm0 8h1v-2H6v2z"/></svg>',
            python: '<svg class="icon" viewBox="0 0 24 24"><path d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 3 7.647 3l-.006 2.347h4.363v.645H5.863s-3.255-.365-3.255 4.38c0 4.745 2.838 4.58 2.838 4.58h1.691V13.04s-.095-2.84 2.782-2.84l4.32.002zm-.157-6.161a.819.819 0 1 1-.001-1.638.819.819 0 0 1 .001 1.638z"/><path d="M18.452 7.532h-1.681v1.886s.091 2.851-2.781 2.851l-4.31-.002s-2.433-.04-2.433 2.35v3.951s-.369 2.391 4.409 2.391c4.573 0 4.288 0 4.288 0l.006-2.347h-4.363v-.645h6.141s3.255.365 3.255-4.38c0-4.745-2.838-4.58-2.838-4.58l.307-.475zm-3.99 10.985a.819.819 0 1 1 .001 1.638.819.819 0 0 1-.001-1.638z"/></svg>',
            database: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.59 4 8 4s8-1.79 8-4V9c0 2.21-3.59 4-8 4s-8-1.79-8-4zm0 5v3c0 2.21 3.59 4 8 4s8-1.79 8-4v-3c0 2.21-3.59 4-8 4s-8-1.79-8-4z"/></svg>',
            container: '<svg class="icon" viewBox="0 0 24 24"><path d="M20.2 3H3.8C2.8 3 2 3.8 2 4.8v14.4c0 1 .8 1.8 1.8 1.8h16.4c1 0 1.8-.8 1.8-1.8V4.8c0-1-.8-1.8-1.8-1.8zM11 17H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V5h16v4z"/></svg>',
            cloud: '<svg class="icon" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',
            git: '<svg class="icon" viewBox="0 0 24 24"><path d="M21.62 11.108l-8.731-8.729a1.292 1.292 0 0 0-1.823 0L9.257 4.19l2.299 2.3a1.532 1.532 0 0 1 1.939 1.95l2.214 2.217a1.53 1.53 0 0 1 1.583 2.531c-.599.6-1.566.6-2.166 0a1.536 1.536 0 0 1-.337-1.662l-2.074-2.063V14.9c.146.071.286.169.407.29a1.537 1.537 0 0 1 0 2.166 1.536 1.536 0 0 1-2.174 0 1.528 1.528 0 0 1 0-2.164c.152-.15.322-.264.504-.339v-5.49a1.529 1.529 0 0 1-.83-2.008l-2.26-2.271-5.987 5.982c-.5.504-.5 1.32 0 1.824l8.731 8.729a1.286 1.286 0 0 0 1.821 0l8.69-8.689a1.284 1.284 0 0 0 .003-1.822"/></svg>'
        };
        
        return icons[type] || icons.code;
    },
    
    scrollToBottom: function() {
        setTimeout(() => {
            const outputContainer = this.output;
            if (typeof anime !== 'undefined') {
                anime({
                    targets: outputContainer,
                    scrollTop: outputContainer.scrollHeight,
                    duration: 600,
                    easing: 'easeInOutQuad'
                });
            } else {
                outputContainer.scrollTop = outputContainer.scrollHeight;
            }
        }, 50);
    },
    
    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },
    
    // Minimize/Expand functionality
    minimizeTerminal: function() {
        console.log('Terminal minimize called');
        const terminalContainer = document.querySelector('.terminal-container');
        const minimizedCard = document.getElementById('minimizedTerminal');
        const introSequence = document.getElementById('introSequence');
        const miniInput = document.getElementById('miniCommandInput');
        const miniOutput = document.getElementById('miniOutput');
        const mainOutput = document.getElementById('output');
        
        console.log('Terminal container:', terminalContainer);
        console.log('Minimized card:', minimizedCard);
        
        if (minimizedCard) {
            // Copy current terminal output to mini output
            if (mainOutput && miniOutput) {
                const outputTexts = mainOutput.querySelectorAll('.output-text');
                miniOutput.innerHTML = '';
                outputTexts.forEach((text, index) => {
                    if (index >= outputTexts.length - 10) { // Only show last 10 lines
                        const miniLine = document.createElement('div');
                        miniLine.className = 'mini-output-line';
                        miniLine.innerHTML = text.innerHTML;
                        miniOutput.appendChild(miniLine);
                    }
                });
                miniOutput.scrollTop = miniOutput.scrollHeight;
            }
            
            // Only hide terminal if it's currently visible (after intro)
            if (terminalContainer && terminalContainer.style.display !== 'none') {
                terminalContainer.style.position = 'absolute';
                terminalContainer.style.top = '-9999px';
                terminalContainer.style.left = '-9999px';
                terminalContainer.style.visibility = 'hidden';
            }
            
            // Show intro sequence in background if it exists
            if (introSequence) {
                introSequence.style.display = 'flex';
                introSequence.style.opacity = '1';
            }
            
            // Show minimized card
            minimizedCard.style.display = 'block';
            setTimeout(() => {
                minimizedCard.style.opacity = '1';
            }, 50);
            
            // Focus on mini input
            setTimeout(() => {
                if (miniInput) miniInput.focus();
            }, 100);
        } else {
            console.error('Elements not found for minimize');
        }
    },
    
    expandTerminal: function() {
        console.log('Terminal expand called');
        const terminalContainer = document.querySelector('.terminal-container');
        const minimizedCard = document.getElementById('minimizedTerminal');
        const introSequence = document.getElementById('introSequence');
        const mainInput = document.getElementById('commandInput');
        
        if (minimizedCard) {
            // Hide minimized card
            minimizedCard.style.opacity = '0';
            setTimeout(() => {
                minimizedCard.style.display = 'none';
            }, 300);
            
            // Hide intro sequence again
            if (introSequence) {
                introSequence.style.display = 'none';
                introSequence.style.opacity = '0';
            }
            
            // Only show terminal if it should be visible
            if (terminalContainer && terminalContainer.style.display !== 'none') {
                terminalContainer.style.position = 'relative';
                terminalContainer.style.top = 'auto';
                terminalContainer.style.left = 'auto';
                terminalContainer.style.visibility = 'visible';
                
                // Focus on main input
                setTimeout(() => {
                    if (mainInput) mainInput.focus();
                }, 100);
            }
        } else {
            console.error('Elements not found for expand');
        }
    },
    
    handleMiniCommand: function(command) {
        const miniOutput = document.getElementById('miniOutput');
        const miniInput = document.getElementById('miniCommandInput');
        
        if (!command) return;
        
        // Add command to mini output
        const cmdLine = document.createElement('div');
        cmdLine.className = 'mini-output-line';
        cmdLine.innerHTML = `<span style="color: #10b981;">$</span> ${this.escapeHtml(command)}`;
        miniOutput.appendChild(cmdLine);
        
        // Clear input
        miniInput.value = '';
        
        // Process command directly in mini terminal
        let cmd = command.toLowerCase().trim();
        let output = '';
        
        // Map aliases to main command (same as main terminal)
        if (cmd === 'dir') cmd = 'ls';
        if (cmd === 'cls') cmd = 'clear';
        if (cmd === 'about' || cmd === 'info') cmd = 'scan';
        if (cmd === 'skills') cmd = 'hack';
        if (cmd === 'experience') cmd = 'exploit';
        if (cmd === 'contact') cmd = 'netstat';
        if (cmd === 'projects') cmd = 'recon';
        if (cmd === 'list') cmd = 'ls';
        
        // Special command: whoami triggers red alert
        if (cmd === 'whoami') {
            // Show user info first
            const data = this.userData;
            const currentJob = data.experience && data.experience.length > 0 ? data.experience[0] : null;
            output = `<div style="color: #00E5FF; margin-bottom: 8px;">USER IDENTIFICATION</div>
                <div style="line-height: 1.8;">
                <span style="color: #10b981;">Name:</span> ${data.name}<br>
                <span style="color: #10b981;">Role:</span> ${data.title}<br>
                ${currentJob ? `<span style="color: #10b981;">Company:</span> ${currentJob.company}<br>` : ''}
                <span style="color: #10b981;">Location:</span> ${data.location}</div>`;
            
            const resultLine = document.createElement('div');
            resultLine.className = 'mini-output-line';
            resultLine.innerHTML = output;
            miniOutput.appendChild(resultLine);
            
            // Then trigger red alert after short delay
            setTimeout(() => {
                this.startRedAlertSequence();
            }, 1500);
            
            miniOutput.scrollTop = miniOutput.scrollHeight;
            return;
        }
        
        if (cmd === 'help' || cmd === 'ls') {
            output = `<div class="help-text">Available commands:<br>
                <span style="color: #00E5FF;">whoami</span> - Identify user<br>
                <span style="color: #00E5FF;">scan</span> - About me<br>
                <span style="color: #00E5FF;">hack</span> - Technical skills<br>
                <span style="color: #00E5FF;">exploit</span> - Work experience<br>
                <span style="color: #00E5FF;">recon</span> - Projects & achievements<br>
                <span style="color: #00E5FF;">netstat</span> - Contact information<br>
                <span style="color: #00E5FF;">certs</span> - Certifications & awards<br>
                <span style="color: #00E5FF;">clear</span> - Clear terminal</div>`;
        } else if (cmd === 'scan') {
            // Display profile info as text
            const data = this.userData;
            const currentJob = data.experience && data.experience.length > 0 ? data.experience[0] : null;
            output = `<div style="color: #00E5FF; margin-bottom: 8px;">PROFILE INFORMATION</div>
                <div style="line-height: 1.8;">
                <span style="color: #10b981;">Name:</span> ${data.name}<br>
                <span style="color: #10b981;">Role:</span> ${data.title}<br>
                ${currentJob ? `<span style="color: #10b981;">Company:</span> ${currentJob.company}<br>` : ''}
                <span style="color: #10b981;">Email:</span> ${data.email}<br>
                <span style="color: #10b981;">Phone:</span> ${data.phone || 'N/A'}<br>
                <span style="color: #10b981;">Location:</span> ${data.location}</div>`;
        } else if (cmd === 'hack') {
            // Display skills as text
            const skills = this.userData.skills.map(s => 
                `<span style="color: #10b981;">▸</span> ${s.name} - ${s.level}`
            ).join('<br>');
            output = `<div style="color: #00E5FF; margin-bottom: 8px;">TECHNICAL SKILLS</div>
                <div style="line-height: 1.8;">${skills}</div>`;
        } else if (cmd === 'exploit') {
            // Display experience as text
            const exp = this.userData.experience.map(e => 
                `<div style="margin-bottom: 12px;">
                <span style="color: #10b981;">▸ ${e.title}</span><br>
                <span style="color: #666;">${e.company} | ${e.duration}</span><br>
                ${e.description}</div>`
            ).join('');
            output = `<div style="color: #00E5FF; margin-bottom: 8px;">WORK EXPERIENCE</div>${exp}`;
        } else if (cmd === 'recon') {
            // Display projects as text
            const projects = this.userData.projects.map(p => 
                `<div style="margin-bottom: 12px;">
                <span style="color: #10b981;">▸ ${p.name}</span><br>
                ${p.description}<br>
                <span style="color: #666;">Tech: ${(p.tech || p.technologies || []).join(', ')}</span></div>`
            ).join('');
            output = `<div style="color: #00E5FF; margin-bottom: 8px;">PROJECTS</div>${projects}`;
        } else if (cmd === 'netstat') {
            // Display contact as text
            const data = this.userData;
            output = `<div style="color: #00E5FF; margin-bottom: 8px;">CONTACT INFORMATION</div>
                <div style="line-height: 1.8;">
                <span style="color: #10b981;">Email:</span> ${data.email}<br>
                <span style="color: #10b981;">Phone:</span> ${data.phone}<br>
                <span style="color: #10b981;">Location:</span> ${data.location}<br>
                <span style="color: #10b981;">LinkedIn:</span> ${data.linkedin || 'N/A'}<br>
                <span style="color: #10b981;">GitHub:</span> ${data.github || 'N/A'}</div>`;        } else if (cmd === 'certs') {
            // Display certifications as text
            const certs = this.userData.certifications.map(c => 
                `<div style="margin-bottom: 12px;">
                <span style="color: #10b981;">▸ ${c.name}</span><br>
                <span style="color: #666;">Issuer: ${c.issuer} | Date: ${c.date}</span><br>
                ${c.credentialId ? `<span style="color: #666;">ID: ${c.credentialId}</span>` : ''}</div>`
            ).join('');
            output = `<div style="color: #00E5FF; margin-bottom: 8px;">CERTIFICATIONS & AWARDS</div>${certs}`;        } else if (cmd === 'clear') {
            miniOutput.innerHTML = '';
            return;
        } else {
            output = `<span style="color: #ef4444;">Command not found: ${this.escapeHtml(command)}</span>`;
        }
        
        // Add output to mini terminal
        if (output) {
            const miniOutLine = document.createElement('div');
            miniOutLine.className = 'mini-output-line';
            miniOutLine.innerHTML = output;
            miniOutput.appendChild(miniOutLine);
        }
        
        // Scroll to bottom
        miniOutput.scrollTop = miniOutput.scrollHeight;
    }
};

// Initialize terminal when DOM is loaded
// Note: Terminal init is called from intro.js after sequence completes

// Add event listeners for mini terminal input
document.addEventListener('DOMContentLoaded', () => {
    const miniInput = document.getElementById('miniCommandInput');
    
    if (miniInput) {
        miniInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = miniInput.value.trim();
                if (command) {
                    terminal.handleMiniCommand(command);
                }
            }
        });
    }
});
// If you want to skip intro, uncomment the line below:
// document.addEventListener('DOMContentLoaded', () => { terminal.init(); });

// Prevent context menu
document.addEventListener('contextmenu', e => e.preventDefault());
