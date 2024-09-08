const fetchRandomFact = async () => {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/today');
        if (!response.ok) {
            throw new Error('Failed to fetch random fact');
        }
        const data = await response.json();
        const factText = data.text || 'No fact available today.';
        document.getElementById('factText').innerText = factText;
    } catch (error) {
        console.error('Error fetching random fact:', error);
        document.getElementById('factText').innerText = 'Unable to load fact.';
    }
};
fetchRandomFact();

async function fetchDiscordPresence() {
    try {
        const response = await fetch('https://api.lanyard.rest/v1/users/789872551731527690');
        const data = await response.json();

        if (data.success) {
            const activity = data.data.activities[0];

            if (activity) {
                const activityName = activity.name || 'No activity detected';
                const activityDetails = activity.details || '';

                document.getElementById('discordActivityName').textContent = activityName;
                document.getElementById('discordActivityDetails').textContent = activityDetails;

                if (activity.assets && activity.assets.large_image) {
                    let imageUrl = '';

                    // Check if the image ID is in the old format
                    if (activity.assets.large_image.startsWith('mp:external/')) {
                        const parts = activity.assets.large_image.split('/https/');
                        if (parts.length === 2) {
                            imageUrl = `https://${parts[1]}`;
                        } else {
                            imageUrl = 'https://cdn.discordapp.com/app-assets/your_application_id/placeholder.png'; // Fallback URL
                        }
                    } else {
                        // Use the new format
                        const applicationId = activity.application_id;
                        const imageId = activity.assets.large_image;
                        imageUrl = `https://cdn.discordapp.com/app-assets/${applicationId}/${imageId}.png`;
                    }

                    document.getElementById('discordActivityImage').src = imageUrl;
                    document.getElementById('discordActivityImage').alt = activityName;
                } else {
                    document.getElementById('discordActivityImage').src = "";
                    document.getElementById('discordActivityImage').alt = "No image available";
                }
            } else {
                document.getElementById('discordActivityName').textContent = "No activity detected.";
                document.getElementById('discordActivityDetails').textContent = "";
                document.getElementById('discordActivityImage').src = "";
                document.getElementById('discordActivityImage').alt = "No image available";
            }
        }
    } catch (error) {
        console.error('Error fetching Discord presence:', error);
    }
}
fetchDiscordPresence();

// Playlist functionality
const songs = [
    {
        title: "I'm a Winner",
        src: "https://fortnite.gg/img/items/14694/audio.mp3",
        albumArt: "https://i.ibb.co/DkHZXG6/icon.jpg"
    },
    {
        title: "Stay by The Kid LAROI",
        src: "https://fortnite.gg/img/items/9047/audio.mp3",
        albumArt: "https://i.ibb.co/RGnPG6h/Stay-Cover-Art-Music-Fortnite.png"
    }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audioPlayer');
const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');

// Function to play the current song
function playSong(index) {
    songTitle.textContent = `Song: ${songs[index].title}`;
    albumArt.src = songs[index].albumArt;
    audioPlayer.src = songs[index].src;
    audioPlayer.play();
}

// Play the next song when the current one ends
audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop back to the first song
    playSong(currentSongIndex);
});

// Start the playlist by playing the first song
playSong(currentSongIndex);
