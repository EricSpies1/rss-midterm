async function fetchRSS(url, containerId, numItems = 12) {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (!data.items) {
            document.getElementById(containerId).innerHTML = `<p class="text-danger">Failed to load RSS feed.</p>`;
            return;
        }

        const rssContent = document.getElementById(containerId);
        rssContent.innerHTML = data.items
            .slice(0, numItems)
            .map(item => `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${item.enclosure?.link || 'images/placeholder.jpg'}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.description}</p>
                            <a href="${item.link}" target="_blank" class="btn btn-primary">Full Article</a>
                        </div>
                    </div>
                </div>
            `)
            .join('');
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        document.getElementById(containerId).innerHTML = `<p class="text-danger">Error loading RSS feed.</p>`;
    }
}
