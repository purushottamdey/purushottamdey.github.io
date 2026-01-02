// Cinematic Intro Sequence Controller
const introSequence = {
    globe: null,
    userData: null,
    soundEffect: null,
    audioEnabled: false,
    loopingAudio: null,
    
    // Initialize sound effect
    initSound: function() {
        if (!this.soundEffect) {
            this.soundEffect = new Audio('models/computer-processing-sound-effect-01-122131.mp3');
            this.soundEffect.volume = 0.4;
        }
    },
    
    // Enable audio on first user interaction
    enableAudio: function() {
        if (!this.audioEnabled) {
            this.initSound();
            // Try to play and immediately pause to unlock audio
            this.soundEffect.play().then(() => {
                this.soundEffect.pause();
                this.soundEffect.currentTime = 0;
                this.audioEnabled = true;
                console.log('✓ Audio enabled - sounds will now play during animations');
            }).catch(() => {
                this.audioEnabled = false;
            });
        }
    },
    
    // Play beep sound effect
    playSound: function() {
        if (!this.audioEnabled) return; // Don't play if audio disabled
        
        this.initSound();
        if (!this.soundEffect) return;
        
        try {
            this.soundEffect.currentTime = 0;
            const playPromise = this.soundEffect.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('🔊 Sound played');
                }).catch(e => {
                    console.log('⚠️ Sound blocked');
                });
            }
        } catch (e) {
            console.log('Sound play error:', e);
        }
    },
    
    // Start looping audio for database search
    startLoopingAudio: function() {
        if (!this.audioEnabled) return;
        
        if (!this.loopingAudio) {
            this.loopingAudio = new Audio('models/computer-processing-sound-effect-01-122131.mp3');
            this.loopingAudio.volume = 0.3;
            this.loopingAudio.loop = true;
        }
        
        try {
            this.loopingAudio.currentTime = 0;
            this.loopingAudio.play().then(() => {
                console.log('🔁 Looping audio started');
            }).catch(e => {
                console.log('Looping audio blocked:', e);
            });
        } catch (e) {
            console.log('Looping audio error:', e);
        }
    },
    
    // Stop looping audio
    stopLoopingAudio: function() {
        if (this.loopingAudio) {
            this.loopingAudio.pause();
            this.loopingAudio.currentTime = 0;
            console.log('🔇 Looping audio stopped');
        }
    },
    
    // Load user data from JSON file
    loadData: async function() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('Failed to load data.json');
            }
            this.userData = await response.json();
            console.log('✓ Intro user data loaded successfully');
        } catch (error) {
            console.error('Error loading intro user data:', error);
            // Fallback data
            this.userData = {
                name: "Error Loading Data",
                title: "Please check data.json",
                currentCompany: "N/A",
                currentRole: "N/A",
                skills: [],
                experience: [],
                contact: { email: "N/A", github: "#", linkedin: "#" }
            };
        }
    },
    
    init: async function() {
        console.log('Intro sequence starting...');
        // Load user data first
        await this.loadData();
        console.log('User data loaded, continuing with intro...');
        
        this.setupFooterBar();
        this.showTargetAcquired();
        // Initialize particles after target screen is visible
        setTimeout(() => {
            this.initParticlesBackground();
        }, 100);
    },
    
    initParticlesBackground: function() {
        // Initialize particles.js background immediately
        if (typeof particlesJS !== 'undefined') {
            particlesJS("particles-js", {
                particles: {
                    number: {
                        value: 120,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#0AE0DF"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#0AE0DF"
                        },
                        polygon: {
                            nb_sides: 5
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 2,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#0AE0DF",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 3,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        } else {
            console.error('particles.js library not loaded');
        }
    },
    
    setupFooterBar: function() {
        const footerBar = document.getElementById('terminalFooterBar');
        if (footerBar) {
            footerBar.onclick = () => {
                this.toggleTerminal();
            };
        }
    },
    
    showSoundPrompt: function() {
        return new Promise((resolve) => {
            const soundPrompt = document.getElementById('soundPrompt');
            const soundYes = document.getElementById('soundYes');
            const soundNo = document.getElementById('soundNo');
            const hudElements = document.getElementById('hudElements');
            const scanGrid = document.querySelector('.scan-grid');
            const idCardWrapper = document.querySelector('.id-card-wrapper');
            
            // Prompt is already visible, just setup handlers
            
            soundYes.onclick = () => {
                this.audioEnabled = true;
                this.enableAudio();
                anime({
                    targets: soundPrompt,
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeOutQuad',
                    complete: () => {
                        soundPrompt.style.display = 'none';
                        hudElements.style.display = 'block';
                        scanGrid.style.display = 'block';
                        idCardWrapper.style.display = 'block';
                    }
                });
                console.log('🔊 Audio enabled by user');
                resolve();
            };
            
            soundNo.onclick = () => {
                this.audioEnabled = false;
                anime({
                    targets: soundPrompt,
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeOutQuad',
                    complete: () => {
                        soundPrompt.style.display = 'none';
                        hudElements.style.display = 'block';
                        scanGrid.style.display = 'block';
                        idCardWrapper.style.display = 'block';
                    }
                });
                console.log('🔇 Audio disabled by user');
                resolve();
            };
        });
    },
    
    // Step 1: Target Acquired with HUD Animation
    showTargetAcquired: async function() {
        console.log('Showing target acquired screen...');
        const targetScreen = document.getElementById('targetScreen');
        targetScreen.style.display = 'flex';
        targetScreen.style.opacity = '1';
        
        // Set profile images
        this.setProfileImages();
        
        // Show sound prompt and wait for user choice
        await this.showSoundPrompt();
        
        // Now play sound and continue with animation
        this.playSound(); // Sound effect
        
        if (typeof anime === 'undefined') {
            console.error('Anime.js not loaded!');
            this.animateHUDElements();
            setTimeout(() => this.moveProfileToLeft(), 5000);
            return;
        }
        
        // Continue with HUD animations
        this.animateHUDElements();
        setTimeout(() => this.moveProfileToLeft(), 5000);
    },
    
    setProfileImages: function() {
        const data = this.userData;
        const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&size=420&background=0AE0DF&color=122023&bold=true`;
        const photoUrl = data.photo && data.photo.trim() !== '' ? data.photo : defaultImage;
        
        // Set all profile images
        const profileImg = document.getElementById('profileImg');
        const revealProfileImg = document.getElementById('revealProfileImg');
        
        if (profileImg) profileImg.src = photoUrl;
        if (revealProfileImg) revealProfileImg.src = photoUrl;
    },
    
    // Animate HUD scanning elements
    animateHUDElements: function() {
        // Update target name
        setTimeout(() => {
            document.getElementById('targetName').textContent = this.userData.name;
            document.getElementById('targetName').classList.remove('scanning');
        }, 800);
        
        // Animate biometric scan results
        setTimeout(() => {
            document.getElementById('retinal').textContent = 'MATCH ✓';
            document.getElementById('retinal').classList.remove('scanning');
            document.getElementById('retinal').classList.add('success');
        }, 1200);
        
        setTimeout(() => {
            document.getElementById('facial').textContent = 'MATCH ✓';
            document.getElementById('facial').classList.remove('scanning');
            document.getElementById('facial').classList.add('success');
        }, 1800);
        
        setTimeout(() => {
            document.getElementById('voice').textContent = 'MATCH ✓';
            document.getElementById('voice').classList.remove('scanning');
            document.getElementById('voice').classList.add('success');
        }, 2400);
        
        // Animate distance counter
        let distance = 1000;
        const distanceInterval = setInterval(() => {
            distance -= 50;
            document.getElementById('distance').textContent = distance.toFixed(1) + 'm';
            if (distance <= 0) {
                clearInterval(distanceInterval);
                document.getElementById('distance').textContent = '0.0m';
            }
        }, 100);
        
        // Update target status
        setTimeout(() => {
            document.getElementById('targetStatus').textContent = 'LOCKED ✓';
            document.getElementById('targetStatus').classList.remove('scanning');
            document.getElementById('targetStatus').classList.add('success');
        }, 3000);
        
        // Update lock text
        setTimeout(() => {
            document.getElementById('targetLockText').textContent = 'TARGET ACQUIRED';
            document.getElementById('targetLockText').style.color = '#00ff88';
        }, 3500);
    },
    
    // Step 2: Move card to right and show globe on same screen
    moveProfileToLeft: function() {
        const idCardWrapper = document.querySelector('.id-card-wrapper');
        const targetLockText = document.getElementById('targetLockText');
        const crosshair = document.querySelector('.hud-crosshair');
        const scanGrid = document.querySelector('.scan-grid');
        const coordinates = document.querySelectorAll('.coordinates');
        
        // Get current position before changing to absolute
        const rect = idCardWrapper.getBoundingClientRect();
        
        // Switch to absolute positioning immediately with current position
        idCardWrapper.style.position = 'absolute';
        idCardWrapper.style.left = rect.left + 'px';
        idCardWrapper.style.top = rect.top + 'px';
        idCardWrapper.style.margin = '0';
        idCardWrapper.style.transform = 'scale(1)';
        idCardWrapper.style.transformOrigin = 'top left';
        
        // Fade out HUD elements
        anime({
            targets: [targetLockText, crosshair, scanGrid, ...coordinates],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeOutQuad'
        });
        
        // Now animate to left position smoothly
        anime({
            targets: idCardWrapper,
            left: '20px',
            top: '20px',
            scale: 0.4,
            duration: 1200,
            easing: 'easeInOutCubic',
            complete: () => {
                // Now show the globe
                this.showSatelliteAndGlobe();
            }
        });
    },
    
    // Step 3: Show globe with integrated orbiting satellite
    showSatelliteAndGlobe: function() {
        console.log('Starting globe with orbiting satellite...');
        this.playSound(); // Sound effect
        const globeCanvas = document.getElementById('globeCanvas');
        
        // Create 3D globe (satellite is added inside)
        this.create3DGlobe();
        
        // Fade in globe
        setTimeout(() => {
            anime({
                targets: globeCanvas,
                opacity: [0, 1],
                duration: 2000,
                easing: 'easeInOutQuad'
            });
        }, 200);
        
        // After globe animation, show data centers
        setTimeout(() => this.showDataCenters(), 5000);
    },
    
    // Create 3D Globe with globe.gl and add orbiting satellite
    create3DGlobe: function() {
        console.log('Creating 3D globe with globe.gl...');
        const container = document.getElementById('globeCanvas');
        
        if (typeof Globe === 'undefined') {
            console.error('Globe.gl not loaded!');
            container.innerHTML = '<div style="color: #ef4444; text-align: center; padding: 50px;">Globe library failed to load</div>';
            setTimeout(() => this.showDataCenters(), 2000);
            return;
        }
        
        // Create globe.gl instance
        this.globe = Globe()
            (container)
            .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg') // Dark earth texture with city lights
            .backgroundColor('rgba(0,0,0,0)')
            .width(window.innerWidth)
            .height(window.innerHeight)
            .showAtmosphere(true);
        
        // Add satellite to globe's scene
        this.addSatelliteToGlobe();
        
        // Data center locations
        const dataCenters = [
            { lat: 40.7128, lng: -74.0060, name: 'New York', size: 0.5 },
            { lat: 51.5074, lng: -0.1278, name: 'London', size: 0.5 },
            { lat: 35.6762, lng: 139.6503, name: 'Tokyo', size: 0.5 },
            { lat: -33.8688, lng: 151.2093, name: 'Sydney', size: 0.5 },
            { lat: 37.7749, lng: -122.4194, name: 'San Francisco', size: 0.5 },
            { lat: 1.3521, lng: 103.8198, name: 'Singapore', size: 0.5 },
            { lat: 28.6139, lng: 77.2090, name: 'New Delhi', size: 0.5 },
            { lat: -23.5505, lng: -46.6333, name: 'São Paulo', size: 0.5 }
        ];
        
        // Add points for data centers
        this.globe
            .pointsData(dataCenters)
            .pointColor(() => '#0AE0DF')
            .pointAltitude(0.01)
            .pointRadius(0.5)
            .pointLabel(d => d.name);
        
        // Create connection arcs between data centers
        const arcs = [];
        for (let i = 0; i < dataCenters.length; i++) {
            for (let j = i + 1; j < dataCenters.length; j++) {
                if (Math.random() > 0.6) { // Random connections
                    arcs.push({
                        startLat: dataCenters[i].lat,
                        startLng: dataCenters[i].lng,
                        endLat: dataCenters[j].lat,
                        endLng: dataCenters[j].lng
                    });
                }
            }
        }
        
        // Add animated arcs
        this.globe
            .arcsData(arcs)
            .arcColor(() => ['rgba(10, 224, 223, 0.4)', 'rgba(10, 224, 223, 0.6)'])
            .arcDashLength(0.4)
            .arcDashGap(0.2)
            .arcDashInitialGap(() => Math.random())
            .arcDashAnimateTime(3000)
            .arcStroke(0.5);
        
        // Start globe rotation immediately
        let angle = 0;
        const rotateGlobe = () => {
            if (this.globe) {
                angle += 0.2;
                this.globe.pointOfView({ lat: 20, lng: angle, altitude: 2.5 });
                if (document.getElementById('globeScreen').style.display !== 'none') {
                    requestAnimationFrame(rotateGlobe);
                }
            }
        };
        rotateGlobe();
        
        // Update connection status
        setTimeout(() => {
            const statusText = document.querySelector('.status-text');
            if (statusText) {
                statusText.textContent = 'SATELLITE LINK ESTABLISHED';
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: statusText,
                        scale: [1, 1.1, 1],
                        duration: 500,
                        easing: 'easeInOutQuad'
                    });
                }
            }
        }, 2000);
        
        console.log('Globe created successfully');
    },
    
    // Add satellite model to globe's 3D scene
    addSatelliteToGlobe: function() {
        console.log('Adding satellite to globe scene...');
        
        if (!THREE.GLTFLoader) {
            console.error('GLTFLoader not available');
            return;
        }
        
        const loader = new THREE.GLTFLoader();
        if (THREE.DRACOLoader) {
            const dracoLoader = new THREE.DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
            loader.setDRACOLoader(dracoLoader);
        }
        
        loader.load(
            'assets/models/Basic_Satellite.glb',
            (gltf) => {
                const satellite = gltf.scene;
                
                // Scale satellite appropriately for globe scene
                const box = new THREE.Box3().setFromObject(satellite);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                satellite.scale.setScalar(60 / maxDim); // Scale for globe scene
                
                // Add glow
                satellite.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material.emissive = new THREE.Color(0x0AE0DF);
                        child.material.emissiveIntensity = 0.4;
                    }
                });
                
                // Add to globe's scene
                const globeScene = this.globe.scene();
                globeScene.add(satellite);
                
                // Start with satellite at initial orbit position
                const orbitRadius = 120;
                let orbitAngle = 0;
                satellite.position.x = Math.cos(orbitAngle) * orbitRadius;
                satellite.position.z = Math.sin(orbitAngle) * orbitRadius;
                satellite.position.y = 0;
                
                // Set camera to standard viewing position
                this.globe.pointOfView({ 
                    lat: 20, 
                    lng: 0, 
                    altitude: 2.5
                }, 0);
                
                // Show globe immediately
                const globeMaterial = this.globe.globeMaterial();
                globeMaterial.opacity = 1;
                this.globe.showAtmosphere(true);
                
                console.log('🌍 Globe and satellite visible');
                
                // Start orbit animation
                const orbitSpeed = 0.005;
                
                const animateOrbit = () => {
                    orbitAngle += orbitSpeed;
                    
                    // Calculate position in 3D space around globe
                    satellite.position.x = Math.cos(orbitAngle) * orbitRadius;
                    satellite.position.z = Math.sin(orbitAngle) * orbitRadius;
                    satellite.position.y = Math.sin(orbitAngle * 2) * 25;
                    
                    // Rotate satellite on its own axis
                    satellite.rotation.y += 0.01;
                    satellite.rotation.x += 0.005;
                    
                    requestAnimationFrame(animateOrbit);
                };
                
                animateOrbit();
                console.log('✅ Satellite orbiting globe');
            },
            undefined,
            (error) => {
                console.error('❌ Error loading satellite for globe:', error);
            }
        );
    },
    
    // Step 4: Show data centers with mini terminals
    showDataCenters: function() {
        this.playSound(); // Sound effect
        
        // Start looping audio
        this.startLoopingAudio();
        
        const globeScreen = document.getElementById('globeScreen');
        const datacenterScreen = document.getElementById('datacenterScreen');
        
        // Fade out globe
        anime({
            targets: globeScreen,
            opacity: [1, 0],
            duration: 500,
            complete: () => {
                globeScreen.style.display = 'none';
                datacenterScreen.style.display = 'block';
                
                anime({
                    targets: datacenterScreen,
                    opacity: [0, 1],
                    duration: 800
                });
                
                this.createMiniTerminals();
            }
        });
    },
    
    createMiniTerminals: function() {
        const grid = document.getElementById('datacenterGrid');
        const terminalCount = 12;
        
        const randomTexts = [
            'Scanning database...',
            'Querying records...',
            'Accessing server...',
            'Fetching data...',
            'Parsing information...',
            'Verifying credentials...',
            'Decrypting files...',
            'Loading profiles...',
            'Searching archives...',
            'Analyzing data...'
        ];
        
        for (let i = 0; i < terminalCount; i++) {
            const terminal = document.createElement('div');
            terminal.className = 'mini-terminal';
            grid.appendChild(terminal);
            
            // Animate terminal appearance
            setTimeout(() => {
                anime({
                    targets: terminal,
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    duration: 400,
                    easing: 'easeOutBack'
                });
                
                // Add random scrolling text
                this.addTerminalText(terminal, randomTexts);
            }, i * 150);
        }
        
        // Show search status
        setTimeout(() => {
            const searchStatus = document.getElementById('searchStatus');
            anime({
                targets: searchStatus,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                easing: 'easeOutQuad'
            });
        }, 2000);
        
        // After searching, show data found
        setTimeout(() => this.showDataFound(), 6000);
    },
    
    addTerminalText: function(terminal, texts) {
        const interval = setInterval(() => {
            const line = document.createElement('div');
            line.className = 'mini-terminal-line';
            line.textContent = '> ' + texts[Math.floor(Math.random() * texts.length)];
            terminal.appendChild(line);
            
            if (terminal.children.length > 15) {
                terminal.removeChild(terminal.firstChild);
            }
        }, 500);
        
        // Stop after 5 seconds
        setTimeout(() => clearInterval(interval), 5000);
    },
    
    // Step 5: Data Found and Copying
    showDataFound: function() {
        const searchStatus = document.getElementById('searchStatus');
        const datacenterGrid = document.getElementById('datacenterGrid');
        const dataFoundSection = document.getElementById('dataFoundSection');
        const popupHeader = document.querySelector('.popup-header h2');
        
        // Update header
        popupHeader.textContent = 'DATA ACQUIRED';
        
        // Hide search status and grid
        anime({
            targets: [searchStatus, datacenterGrid],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeOutQuad',
            complete: () => {
                searchStatus.style.display = 'none';
                datacenterGrid.style.display = 'none';
                
                // Show data found section
                dataFoundSection.style.display = 'block';
                anime({
                    targets: dataFoundSection,
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                
                this.startCopyingProgress();
            }
        });
    },
    
    startCopyingProgress: function() {
        const progressBar = document.getElementById('copyProgressBar');
        const percentage = document.getElementById('copyPercentage');
        const transferRate = document.getElementById('transferRate');
        const timeRemaining = document.getElementById('timeRemaining');
        
        let progress = 0;
        const duration = 5000; // 5 seconds
        const interval = 50;
        const increment = (interval / duration) * 100;
        
        const copyInterval = setInterval(() => {
            progress += increment;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(copyInterval);
                setTimeout(() => this.showDataReveal(), 1000);
            }
            
            progressBar.style.width = progress + '%';
            percentage.textContent = Math.floor(progress) + '%';
            transferRate.textContent = (Math.random() * 50 + 20).toFixed(1) + ' MB/s';
            timeRemaining.textContent = Math.max(0, Math.floor((100 - progress) * duration / 10000)) + 's';
        }, interval);
    },
    
    // Step 6: Reveal data one by one
    showDataReveal: function() {
        const dataFoundSection = document.getElementById('dataFoundSection');
        const revealSectionPopup = document.getElementById('revealSectionPopup');
        const popupHeader = document.querySelector('.popup-header h2');
        
        // Hide data found section
        anime({
            targets: dataFoundSection,
            opacity: [1, 0],
            duration: 500,
            easing: 'easeOutQuad',
            complete: () => {
                dataFoundSection.style.display = 'none';
                
                // Update header
                popupHeader.textContent = 'PROFILE DATA';
                
                // Populate reveal data in popup
                this.populateRevealData();
                
                // Show reveal section in popup
                revealSectionPopup.style.display = 'block';
                anime({
                    targets: revealSectionPopup,
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutQuad',
                    complete: () => {
                        // After 3 seconds, hide popup and show reveal card
                        setTimeout(() => this.convertRevealToCard(), 3000);
                    }
                });
            }
        });
    },
    
    convertRevealToCard: function() {
        const datacenterScreen = document.getElementById('datacenterScreen');
        const revealCardWrapper = document.getElementById('revealCardWrapper');
        
        // Hide datacenter popup
        anime({
            targets: datacenterScreen,
            opacity: [1, 0],
            duration: 800,
            easing: 'easeOutQuad',
            complete: () => {
                datacenterScreen.style.display = 'none';
                
                // Populate reveal card
                this.populateRevealCard();
                
                // Position card at center initially (like target card animation)
                const centerX = window.innerWidth / 2 - 400;
                const centerY = window.innerHeight / 2 - 300;
                
                revealCardWrapper.style.display = 'block';
                revealCardWrapper.style.position = 'absolute';
                revealCardWrapper.style.left = centerX + 'px';
                revealCardWrapper.style.top = centerY + 'px';
                revealCardWrapper.style.transform = 'scale(1)';
                revealCardWrapper.style.transformOrigin = 'top left';
                revealCardWrapper.style.opacity = '1';
                
                // Add click handler before animation
                const self = this;
                revealCardWrapper.onclick = function(e) {
                    console.log('Reveal card clicked!');
                    e.stopPropagation();
                    e.preventDefault();
                    self.openDetailPopup();
                };
                
                // Animate to position below target card (matching target card animation)
                anime({
                    targets: revealCardWrapper,
                    left: '20px',
                    top: '330px',
                    scale: 0.4,
                    duration: 1200,
                    easing: 'easeInOutCubic',
                    complete: () => {
                        // Stop looping audio when data reveal animation ends
                        this.stopLoopingAudio();
                        
                        // Show AI mesh card after reveal card animation
                        this.showAIMeshCard();
                    }
                });
            }
        });
    },
    
    showAIMeshCard: function() {
        this.playSound(); // Sound effect
        const aiMeshCard = document.getElementById('aiMeshCard');
        
        aiMeshCard.style.display = 'block';
        anime({
            targets: aiMeshCard,
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutCubic',
            complete: () => {
                // Start mesh animation
                this.initMeshAnimation();
            }
        });
    },
    
    initMeshAnimation: function() {
        const container = document.getElementById('meshCanvas');
        
        // Create Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 400 / 500, 0.01, 40);
        const renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true, antialias: true });
        
        renderer.setSize(400, 500);
        renderer.setClearColor(0x000000, 0);
        camera.position.set(0, 0, 1.5);
        
        // Load PCD file from Three.js repository
        const loader = new THREE.PCDLoader();
        const pcdUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/pcd/binary/Zaghetto.pcd';
        
        loader.load(pcdUrl, function(points) {
            // Center and rotate the point cloud
            points.geometry.center();
            points.geometry.rotateX(Math.PI);
            
            // Update material to cyan color
            points.material.color.setHex(0x0AE0DF);
            points.material.size = 0.003;
            
            scene.add(points);
            
            // Add ambient particles
            const ambientCount = 800;
            const ambientGeometry = new THREE.BufferGeometry();
            const ambientPositions = new Float32Array(ambientCount * 3);
            
            for (let i = 0; i < ambientCount; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 0.6 + Math.random() * 0.3;
                
                ambientPositions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
                ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
                ambientPositions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
            }
            
            ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
            
            const ambientMaterial = new THREE.PointsMaterial({
                color: 0x0AE0DF,
                size: 0.002,
                transparent: true,
                opacity: 0.2,
                sizeAttenuation: true
            });
            
            const ambientParticles = new THREE.Points(ambientGeometry, ambientMaterial);
            scene.add(ambientParticles);
            
            // Create scanning beam effect
            const scanGeometry = new THREE.PlaneGeometry(2, 0.05);
            const scanMaterial = new THREE.MeshBasicMaterial({
                color: 0x0AE0DF,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide
            });
            const scanBeam = new THREE.Mesh(scanGeometry, scanMaterial);
            scanBeam.rotation.x = Math.PI / 2;
            scene.add(scanBeam);
            
            // Store original particle positions for ripple effect
            const originalAmbientPos = new Float32Array(ambientPositions);
            
            // Animation
            let frame = 0;
            const animate = () => {
                frame++;
                
                // Scanning beam moving up and down
                const scanSpeed = 0.015;
                const scanY = Math.sin(frame * scanSpeed) * 0.8;
                scanBeam.position.y = scanY;
                
                // Pulsing scan beam
                scanMaterial.opacity = 0.4 + Math.sin(frame * 0.05) * 0.3;
                
                // Progressive reveal based on scan position
                const positions = points.geometry.attributes.position.array;
                const colors = points.geometry.attributes.color ? points.geometry.attributes.color.array : null;
                
                if (!points.geometry.attributes.alpha) {
                    const alphas = new Float32Array(positions.length / 3);
                    points.geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
                    points.material.transparent = true;
                    points.material.vertexColors = false;
                    points.material.onBeforeCompile = (shader) => {
                        shader.vertexShader = shader.vertexShader.replace(
                            'void main() {',
                            'attribute float alpha;\nvarying float vAlpha;\nvoid main() {\nvAlpha = alpha;'
                        );
                        shader.fragmentShader = shader.fragmentShader.replace(
                            'void main() {',
                            'varying float vAlpha;\nvoid main() {'
                        );
                        shader.fragmentShader = shader.fragmentShader.replace(
                            'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
                            'gl_FragColor = vec4( outgoingLight, diffuseColor.a * vAlpha );'
                        );
                    };
                }
                
                const alphas = points.geometry.attributes.alpha.array;
                for (let i = 0; i < positions.length / 3; i++) {
                    const y = positions[i * 3 + 1];
                    const dist = Math.abs(y - scanY);
                    
                    // Fade in points near the scan beam
                    if (dist < 0.3) {
                        alphas[i] = Math.min(1, alphas[i] + 0.05);
                    }
                    
                    // Glow effect near scan beam
                    if (dist < 0.1) {
                        alphas[i] = 1;
                    } else if (alphas[i] > 0.7) {
                        alphas[i] = 0.7 + Math.sin(frame * 0.1 + i * 0.1) * 0.15;
                    }
                }
                points.geometry.attributes.alpha.needsUpdate = true;
                
                // Breathing effect on face
                const breathe = 1 + Math.sin(frame * 0.01) * 0.02;
                points.scale.set(breathe, breathe, breathe);
                
                // Strong ripple wave animation for ambient particles
                for (let i = 0; i < ambientCount; i++) {
                    const idx = i * 3;
                    const time = frame * 0.03;
                    const offset = i * 0.15;
                    
                    // Create ripple from center
                    const dx = originalAmbientPos[idx] - 0;
                    const dy = originalAmbientPos[idx + 1] - scanY;
                    const dz = originalAmbientPos[idx + 2] - 0;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    
                    // Wave ripple effect
                    const ripple = Math.sin(distance * 5 - time * 2) * 0.03;
                    
                    ambientPositions[idx] = originalAmbientPos[idx] + Math.sin(time + offset) * 0.015 + dx * ripple;
                    ambientPositions[idx + 1] = originalAmbientPos[idx + 1] + Math.cos(time * 0.6 + offset) * 0.02 + dy * ripple;
                    ambientPositions[idx + 2] = originalAmbientPos[idx + 2] + Math.sin(time * 0.8 + offset) * 0.015 + dz * ripple;
                }
                ambientGeometry.attributes.position.needsUpdate = true;
                
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            };
            
            animate();
            
            // Update stats
            const pointCount = points.geometry.attributes.position.count;
            document.getElementById('nodeCount').textContent = pointCount.toLocaleString();
            document.getElementById('connectionCount').textContent = 'HUMAN SCAN';
            
        }, undefined, function(error) {
            console.error('Error loading PCD file:', error);
            
            // Fallback message
            document.getElementById('nodeCount').textContent = 'LOADING';
            document.getElementById('connectionCount').textContent = 'FAILED';
        });
    },
    
    openDetailPopup: function() {
        const popup = document.getElementById('revealDetailPopup');
        const data = this.userData;
        
        // Set avatar image
        const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&size=240&background=00ff88&color=122023&bold=true`;
        const photoUrl = data.photo && data.photo.trim() !== '' ? data.photo : defaultImage;
        console.log('Detail popup photo URL:', photoUrl);
        const avatarImg = document.getElementById('detailAvatar');
        if (avatarImg) {
            avatarImg.src = photoUrl;
            console.log('Avatar image set to:', avatarImg.src);
        } else {
            console.error('detailAvatar element not found!');
        }
        document.getElementById('detailName').textContent = data.name;
        document.getElementById('detailRole').textContent = data.title;
        
        // Get current company from first experience entry
        const currentCompany = data.experience && data.experience.length > 0 ? data.experience[0].company : 'N/A';
        document.getElementById('detailCompany').textContent = currentCompany;
        
        // Skills
        const skillsContainer = document.getElementById('detailSkills');
        skillsContainer.innerHTML = '';
        if (data.skills && data.skills.length > 0) {
            data.skills.forEach(skill => {
                const skillTag = document.createElement('div');
                skillTag.className = 'detail-skill-tag';
                skillTag.textContent = typeof skill === 'string' ? skill : skill.name;
                skillsContainer.appendChild(skillTag);
            });
        }
        
        // Experience
        const experienceContainer = document.getElementById('detailExperience');
        experienceContainer.innerHTML = '';
        if (data.experience && data.experience.length > 0) {
            data.experience.forEach(exp => {
                const expItem = document.createElement('div');
                expItem.className = 'detail-exp-item';
                expItem.innerHTML = `
                    <div class="detail-exp-header">
                        <span class="detail-exp-role">${exp.title}</span>
                        <span class="detail-exp-years">${exp.duration}</span>
                    </div>
                    <div class="detail-exp-company">${exp.company}</div>
                `;
                experienceContainer.appendChild(expItem);
            });
        }
        
        // Projects
        const projectsContainer = document.getElementById('detailProjects');
        projectsContainer.innerHTML = '';
        if (data.projects && data.projects.length > 0) {
            data.projects.forEach(project => {
                const projectItem = document.createElement('div');
                projectItem.className = 'detail-project-item';
                projectItem.innerHTML = `
                    <div class="detail-project-name">${project.name}</div>
                    <div class="detail-project-desc">${project.description || ''}</div>
                    ${project.tech && project.tech.length > 0 ? `
                        <div class="detail-project-tech">
                            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    ` : ''}
                `;
                projectsContainer.appendChild(projectItem);
            });
        }
        
        // Certifications
        const certificationsContainer = document.getElementById('detailCertifications');
        certificationsContainer.innerHTML = '';
        if (data.certifications && data.certifications.length > 0) {
            data.certifications.forEach(cert => {
                const certItem = document.createElement('div');
                certItem.className = 'detail-cert-item';
                certItem.innerHTML = `
                    <div class="detail-cert-name">${cert.name}</div>
                    <div class="detail-cert-issuer">${cert.issuer} • ${cert.date}</div>
                `;
                certificationsContainer.appendChild(certItem);
            });
        }
        
        // Contact
        const contactContainer = document.getElementById('detailContact');
        contactContainer.innerHTML = `
            <div class="detail-contact-item">
                <span class="detail-contact-label">EMAIL:</span>
                <span class="detail-contact-value">${data.email || 'N/A'}</span>
            </div>
            <div class="detail-contact-item">
                <span class="detail-contact-label">GITHUB:</span>
                <span class="detail-contact-value">${data.github || 'N/A'}</span>
            </div>
            <div class="detail-contact-item">
                <span class="detail-contact-label">LINKEDIN:</span>
                <span class="detail-contact-value">${data.linkedin || 'N/A'}</span>
            </div>
        `;
        
        // Show popup
        popup.style.display = 'flex';
        anime({
            targets: popup,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        // Close handler
        document.getElementById('closeDetailPopup').onclick = (e) => {
            e.stopPropagation();
            this.closeDetailPopup();
        };
        
        // Click outside to close
        popup.onclick = (e) => {
            if (e.target === popup) {
                this.closeDetailPopup();
            }
        };
    },
    
    closeDetailPopup: function() {
        const popup = document.getElementById('revealDetailPopup');
        anime({
            targets: popup,
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutQuad',
            complete: () => {
                popup.style.display = 'none';
            }
        });
    },
    
    populateRevealCard: function() {
        const data = this.userData;
        
        // Update profile image
        const img = document.getElementById('revealProfileImg');
        const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&size=420&background=00ff88&color=122023&bold=true`;
        const photoUrl = data.photo && data.photo.trim() !== '' ? data.photo : defaultImage;
        img.src = photoUrl;
        
        // Basic info
        document.getElementById('revealCardName').textContent = data.name;
        document.getElementById('revealCardRole').textContent = data.title;
        
        // Get current company from first experience entry
        const currentCompany = data.experience && data.experience.length > 0 ? data.experience[0].company : 'N/A';
        document.getElementById('revealCardCompany').textContent = currentCompany;
        
        // Calculate years of experience from duration
        let yearsExp = 'N/A';
        if (data.experience && data.experience.length > 0) {
            const duration = data.experience[0].duration;
            const match = duration.match(/(\d{4})/);
            if (match) {
                const startYear = parseInt(match[1]);
                const currentYear = new Date().getFullYear();
                const years = currentYear - startYear;
                yearsExp = years > 0 ? `${years}+ years` : '< 1 year';
            }
        }
        document.getElementById('revealCardExp').textContent = yearsExp;
        
        // Skills - show top skills
        const skillsContainer = document.getElementById('revealCardSkills');
        skillsContainer.innerHTML = '';
        if (data.skills && data.skills.length > 0) {
            data.skills.slice(0, 8).forEach(skill => {
                const skillTag = document.createElement('div');
                skillTag.className = 'skill-tag';
                skillTag.textContent = typeof skill === 'string' ? skill : skill.name;
                skillsContainer.appendChild(skillTag);
            });
        }
        
        // Experience history
        const experienceContainer = document.getElementById('revealCardExperience');
        experienceContainer.innerHTML = '';
        if (data.experience && data.experience.length > 0) {
            data.experience.forEach(exp => {
                const expItem = document.createElement('div');
                expItem.className = 'experience-item';
                expItem.innerHTML = `
                    <div class="exp-header">
                        <span class="exp-role">${exp.title}</span>
                        <span class="exp-years">${exp.duration}</span>
                    </div>
                    <div class="exp-company">${exp.company}</div>
                `;
                experienceContainer.appendChild(expItem);
            });
        }
        
        // Contact
        document.getElementById('revealCardEmail').textContent = data.email || 'N/A';
        document.getElementById('revealCardGithub').textContent = (data.github || '').replace('https://github.com/', '').replace('github.com/', '');
        document.getElementById('revealCardLinkedin').textContent = (data.linkedin || '').replace('https://linkedin.com/in/', '').replace('linkedin.com/in/', '');
    },
    
    populateRevealData: function() {
        const data = this.userData;
        
        // Basic info
        document.getElementById('revealName').textContent = data.name;
        document.getElementById('revealRole').textContent = data.title;
        
        // Get current company from first experience entry
        const currentCompany = data.experience && data.experience.length > 0 ? data.experience[0].company : 'N/A';
        document.getElementById('revealCompany').textContent = currentCompany;
        
        // Calculate years of experience from duration
        let yearsExp = 'N/A';
        if (data.experience && data.experience.length > 0) {
            const duration = data.experience[0].duration;
            const match = duration.match(/(\d{4})/);
            if (match) {
                const startYear = parseInt(match[1]);
                const currentYear = new Date().getFullYear();
                const years = currentYear - startYear;
                yearsExp = years > 0 ? `${years}+ years` : '< 1 year';
            }
        }
        document.getElementById('revealExperience').textContent = yearsExp;
        
        // Skills
        const skillsContainer = document.getElementById('revealSkills');
        skillsContainer.innerHTML = '';
        if (data.skills && data.skills.length > 0) {
            data.skills.forEach(skill => {
                const skillTag = document.createElement('div');
                skillTag.className = 'skill-tag';
                skillTag.textContent = typeof skill === 'string' ? skill : skill.name;
                skillsContainer.appendChild(skillTag);
            });
        }
        
        // Certifications
        const certificationsContainer = document.getElementById('revealCertifications');
        certificationsContainer.innerHTML = '';
        if (data.certifications && data.certifications.length > 0) {
            data.certifications.forEach(cert => {
                const certItem = document.createElement('div');
                certItem.className = 'cert-item-reveal';
                certItem.innerHTML = `
                    <div class="cert-name-reveal">${cert.name}</div>
                    <div class="cert-issuer-reveal">${cert.issuer} • ${cert.date}</div>
                `;
                certificationsContainer.appendChild(certItem);
            });
        } else {
            certificationsContainer.innerHTML = '<div class="contact-item">No certifications available</div>';
        }
        
        // Contact
        const contactContainer = document.getElementById('revealContact');
        contactContainer.innerHTML = `
            <div class="contact-item">Email: <span>${data.email || 'N/A'}</span></div>
            <div class="contact-item">GitHub: <span>${data.github || 'N/A'}</span></div>
            <div class="contact-item">LinkedIn: <span>${data.linkedin || 'N/A'}</span></div>
        `;
    },
    
    revealDataSequentially: function() {
        const container = document.getElementById('revealContainerPopup');
        const data = this.userData;
        
        const sections = [
            {
                label: 'Identity Confirmed',
                value: data.name,
                delay: 0
            },
            {
                label: 'Current Position',
                value: data.currentRole,
                subvalue: `@ ${data.currentCompany}`,
                delay: 1500
            },
            {
                label: 'Past Experience',
                type: 'list',
                items: data.pastExperience.map(exp => `${exp.role} @ ${exp.company} (${exp.years})`),
                delay: 3000
            },
            {
                label: 'Skills & Technologies',
                type: 'grid',
                items: data.skills,
                delay: 4500
            },
            {
                label: 'Contact Information',
                type: 'contact',
                items: [
                    `Email: ${data.contact.email}`,
                    `GitHub: ${data.contact.github}`,
                    `LinkedIn: ${data.contact.linkedin}`
                ],
                delay: 6000
            }
        ];
        
        sections.forEach(section => {
            setTimeout(() => this.createRevealSection(container, section), section.delay);
        });
        
        // After all reveals, transition to main portfolio
        setTimeout(() => this.transitionToPortfolio(), 8000);
    },
    
    createRevealSection: function(container, section) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'reveal-section';
        
        const label = document.createElement('div');
        label.className = 'reveal-label';
        label.textContent = section.label;
        sectionDiv.appendChild(label);
        
        if (section.type === 'list' || section.type === 'contact') {
            const list = document.createElement('div');
            list.className = 'reveal-list';
            section.items.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'reveal-item';
                itemDiv.textContent = item;
                list.appendChild(itemDiv);
                
                setTimeout(() => {
                    anime({
                        targets: itemDiv,
                        opacity: [0, 1],
                        translateX: [-20, 0],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });
                }, index * 200);
            });
            sectionDiv.appendChild(list);
        } else if (section.type === 'grid') {
            const grid = document.createElement('div');
            grid.className = 'reveal-list';
            section.items.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'reveal-item';
                itemDiv.textContent = item;
                grid.appendChild(itemDiv);
                
                setTimeout(() => {
                    anime({
                        targets: itemDiv,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 600,
                        easing: 'easeOutElastic(1, .6)'
                    });
                }, index * 100);
            });
            sectionDiv.appendChild(grid);
        } else {
            const value = document.createElement('div');
            value.className = 'reveal-value';
            value.textContent = section.value;
            sectionDiv.appendChild(value);
            
            if (section.subvalue) {
                const subvalue = document.createElement('div');
                subvalue.className = 'reveal-subvalue';
                subvalue.textContent = section.subvalue;
                sectionDiv.appendChild(subvalue);
            }
        }
        
        container.appendChild(sectionDiv);
        
        anime({
            targets: sectionDiv,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            easing: 'easeOutExpo'
        });
    },
    

    toggleTerminal: function() {
        this.playSound(); // Sound effect
        const terminalContainer = document.querySelector('.terminal-container');
        const introSequence = document.getElementById('introSequence');
        
        // Check if terminal is actually visible (not just display:flex but also has opacity)
        const isTerminalVisible = terminalContainer.style.display === 'flex' && 
                                  window.getComputedStyle(terminalContainer).opacity === '1';
        const isIntroVisible = introSequence.style.display !== 'none' && 
                               window.getComputedStyle(introSequence).opacity === '1';
        
        if (isTerminalVisible) {
            this.returnFromTerminal();
        } else if (isIntroVisible) {
            this.openTerminal();
        }
        // If neither is fully visible, do nothing (animation in progress)
    },
    
    openTerminal: function() {
        const introSequence = document.getElementById('introSequence');
        const terminalContainer = document.querySelector('.terminal-container');
        
        anime({
            targets: introSequence,
            opacity: [1, 0],
            duration: 500,
            easing: 'easeOutQuad',
            complete: async () => {
                introSequence.style.display = 'none';
                introSequence.style.pointerEvents = 'none';
                terminalContainer.style.display = 'flex';
                terminalContainer.style.pointerEvents = 'auto';
                terminalContainer.classList.add('loaded');
                
                // Initialize terminal
                if (typeof terminal !== 'undefined') {
                    console.log('Initializing terminal...');
                    await terminal.init();
                } else {
                    console.error('Terminal object not found!');
                }
            }
        });
    },
    
    returnFromTerminal: function() {
        const introSequence = document.getElementById('introSequence');
        const terminalContainer = document.querySelector('.terminal-container');
        
        anime({
            targets: terminalContainer,
            opacity: [1, 0],
            duration: 500,
            easing: 'easeOutQuad',
            complete: () => {
                terminalContainer.style.display = 'none';
                terminalContainer.style.pointerEvents = 'none';
                introSequence.style.display = 'flex';
                introSequence.style.pointerEvents = 'auto';
                
                anime({
                    targets: introSequence,
                    opacity: [0, 1],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }
        });
    },
};

// Start intro when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking dependencies...');
    
    // Check if anime.js is loaded
    if (typeof anime === 'undefined') {
        console.error('Anime.js failed to load! Check internet connection.');
        alert('Animation library failed to load. Please refresh the page or check your internet connection.');
        return;
    }
    
    // Check if globe.gl is loaded
    if (typeof Globe === 'undefined') {
        console.error('globe.gl failed to load! Check internet connection.');
        console.warn('Globe visualization will not work without globe.gl library.');
    }
    
    console.log('Dependencies loaded successfully');
    console.log('Anime.js version:', anime.version);
    console.log('Globe.gl loaded:', typeof Globe !== 'undefined');
    
    // Start intro sequence
    introSequence.init();
});
