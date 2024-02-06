const apiKey = 'AIzaSyDiNM5irWOw3mw-CPcogKOxzmQMuYaIni8';
function searchYouTubeVideos() {
    const searchQuery = document.getElementById('searchInput').value;

    // Function to fetch videos
    function fetchYouTubeVideos() {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${searchQuery}&key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Clear previous
                document.getElementById('videoList').innerHTML = '';

                // Loop
                const videoListElement = document.getElementById('videoList');
                data.items.forEach(item => {
                    const videoId = item.id.videoId;
                    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                    const videoThumbnail = item.snippet.thumbnails.medium.url;

                    // Create a Bootstrap card
                    const videoCard = document.createElement('div');
                    videoCard.className = 'col-md-4 mb-4';
                    videoCard.innerHTML = `
                        <div class="card">
                            <img src="${videoThumbnail}" class="card-img-top" alt="Video Thumbnail">
                            <div class="card-body">
                                <h5 class="card-title">${item.snippet.title}</h5>
                                <a href="${videoUrl}" class="btn btn-primary" target="_blank">Watch Video</a>
                            </div>
                        </div>
                    `;

                    // Append the video
                    videoListElement.appendChild(videoCard);
                });
            })
            .catch(error => console.error('Error fetching YouTube videos:', error));
    }

    // Call the function
    fetchYouTubeVideos();
}