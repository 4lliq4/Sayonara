// Simple Focused Nostalgic Interactivity

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-audio');
    const toggleBtn = document.getElementById('audio-toggle');
    const playingIcon = document.getElementById('music-playing');
    const mutedIcon = document.getElementById('music-muted');
    const mainCard = document.querySelector('.main-card');

    let isPlaying = false;

    // 1. Audio Toggle Logic
    const startAudio = () => {
        audio.play().then(() => {
            isPlaying = true;
            playingIcon.classList.remove('hidden');
            mutedIcon.classList.add('hidden');
            // Remove the interaction listener once audio starts successfully
            document.removeEventListener('click', startAudio);
            document.removeEventListener('touchstart', startAudio);
        }).catch(err => {
            console.log("Autoplay prevented. Waiting for user interaction.");
        });
    };

    if (toggleBtn && audio) {
        // Try autoplay immediately
        startAudio();

        // Fallback: Start on first interaction if autoplay failed
        document.addEventListener('click', startAudio);
        document.addEventListener('touchstart', startAudio);

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent startAudio from firing if it's already a toggle click
            if (isPlaying) {
                audio.pause();
                playingIcon.classList.add('hidden');
                mutedIcon.classList.remove('hidden');
            } else {
                audio.play();
                playingIcon.classList.remove('hidden');
                mutedIcon.classList.add('hidden');
            }
            isPlaying = !isPlaying;
        });
    }

    // 2. Initial Animation
    if (mainCard) {
        mainCard.style.opacity = '0';
        setTimeout(() => {
            mainCard.style.opacity = '1';
            mainCard.classList.add('animate-fade-in');
        }, 300);
    }

    // 3. Optional: Subtle background movement on mouse move
    const bgContainer = document.querySelector('.blurred-bg');
    if (bgContainer) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            bgContainer.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
    }
});