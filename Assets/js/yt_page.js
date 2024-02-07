const apiKey = 'AIzaSyDiNM5irWOw3mw-CPcogKOxzmQMuYaIni8';
function searchYouTubeVideos() {
    const searchQuery = document.getElementById('searchInput').value;

    // Function to fetch videos
function fetchYouTubeVideos() {
    const searchQuery = document.getElementById('searchInput').value;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${searchQuery}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear previous results
            document.getElementById('videoList').innerHTML = '';

            // Loop through fetched videos
            const videoListElement = document.getElementById('videoList');
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                const videoThumbnail = item.snippet.thumbnails.medium.url;

                // Create video card
                const videoCard = document.createElement('div');
                videoCard.classList.add('col-md-4', 'video-card');
                videoCard.innerHTML = `
                    <div class="card">
                        <img src="${videoThumbnail}" class="card-img-top" alt="Video Thumbnail">
                        <div class="card-body">
                            <h5 class="card-title">${item.snippet.title}</h5>
                            <a href="${videoUrl}" class="btn btn-primary" target="_blank">Watch Video</a>
                        </div>
                    </div>
                `;

                // Append card to video list
                videoListElement.appendChild(videoCard);
            });
        })
        .catch(error => console.error('Error fetching YouTube videos:', error));
}


    // Call the function
    fetchYouTubeVideos();
}