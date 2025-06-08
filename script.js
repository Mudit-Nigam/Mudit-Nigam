const projectData = {
	//["github-link", "demo-link"]
    "3": ["https://github.com/Mudit-Nigam/Snake-Game-Computer-Vision-", ""],
    "4": ["https://github.com/Mudit-Nigam/google-suite-task-manager", ""],
    "5": ["https://github.com/Mudit-Nigam/vibgyor", ""],
    "6": ["https://github.com/Mudit-Nigam/ANIMAL-MANAGEMENT-SYSTEM-USING-PHP-MYSQL-HTML-CSS", ""],
    "7": ["", ""],
    "8": ["https://github.com/Mudit-Nigam/VOICE-BIOMETRIC-PASSWORD-WITH-VOICE-OTP", ""],
    "9": ["https://github.com/Mudit-Nigam/ACCIDENT-PREVENTION-IDENTIFICATION-AND-ALERTING", ""],
    "10": ["https://github.com/Mudit-Nigam/Rakshak", ""]
}

const projectOutput = {
	//["github repo name", "path"]
	"3" : ["Snake-Game-Computer-Vision-", "Output"],
	"4" : ["google-suite-task-manager", "Output"],
	"5" : ["vibgyor", "Output"],
	"6" : ["ANIMAL-MANAGEMENT-SYSTEM-USING-PHP-MYSQL-HTML-CSS", "Output"],
	"7" : ["", ""],
    "8" : ["VOICE-BIOMETRIC-PASSWORD-WITH-VOICE-OTP", "Output"],
    "9" : ["ACCIDENT-PREVENTION-IDENTIFICATION-AND-ALERTING", "Output"],
    "10" : ["Rakshak", "Output"]
}

let flickityInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    const date = document.getElementById('date')
    const setCurrentYear = () => {
        const currentYear = new Date().getFullYear()
        date.textContent = currentYear
    }
    setCurrentYear()

    // hamburger menu
    const hamburger = document.querySelector('.hamburger')
    const navList = document.querySelector('.nav-list')
    const socials = document.querySelector('.social-nav')
    const navLinks = document.querySelectorAll('.nav-links')

    const toggleMobileMenu = () => {
        hamburger.classList.toggle('open')
        navList.classList.toggle('open')
        socials.classList.toggle('open')
        document.body.classList.toggle('open')
    }

    navLinks.forEach(link => link.addEventListener('click', toggleMobileMenu))
    hamburger.addEventListener('click', toggleMobileMenu)

    // initialize aos (library for scroll animation)
    AOS.init()
})

function showOverlay(projID) {
    const overlay = document.getElementById('overlay');
    const galleryCarousell = document.getElementById('galleryCarousell');

    // Clear existing carousel cells
    galleryCarousell.innerHTML = '';

    // Show overlay
    overlay.style.display = 'flex';

	// Destroy existing Flickity instance if it exists
    if (flickityInstance) {
        flickityInstance.destroy();
        flickityInstance = null;
    }

    // Set project data
    const githubBtn = document.getElementById('overlay-github-btn');
    const liveDemoBtn = document.getElementById('overlay-live-btn');

    githubBtn.style.display = projectData[projID][0] ? "block" : "none";
    githubBtn.href = projectData[projID][0];

    liveDemoBtn.style.display = projectData[projID][1] ? "block" : "none";
    liveDemoBtn.href = projectData[projID][1];

    const repoOwner = 'Mudit-Nigam';
    // const repoName = 'Personal-Portfolio-forme';
    // const folderPath = 'assets/Projects/Project_';
    const repoName = projectOutput[projID][0];
    const folderPath = projectOutput[projID][1];

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

    axios.get(apiUrl)
        .then(response => {
            const files = response.data;

            files.forEach(file => {
                const fileDiv = document.createElement('div');
                fileDiv.className = 'carousel-cell';

                const imgDiv = document.createElement('img');
                imgDiv.src = file['download_url'];
                imgDiv.className = "carousel-cell-image";
                fileDiv.appendChild(imgDiv);

                galleryCarousell.appendChild(fileDiv);
            });

			// Initialize Flickity after adding all items
            flickityInstance = new Flickity(galleryCarousell, {
                wrapAround: true,
                autoPlay: true
            });
        })
		
		.catch(error => {
            console.error('Error fetching files:', error);
        })

        
}

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';

	// Destroy Flickity instance when hiding overlay
    if (flickityInstance) {
        flickityInstance.destroy();
        flickityInstance = null;
    }
}

