// Set the current date as default
document.getElementById('date').valueAsDate = new Date();

async function getNasaData() {
    const startDate = document.getElementById('date').value;
    const apiKey = 'jUp8fTd4bUbib3gDp7gprHwLy1eCw9jMGKyVkoml'; // Ganti dengan API key Anda
    const daysToFetch = 5; // Jumlah hari yang ingin ditampilkan

    // Generate array of dates
    const dates = generateDateRange(startDate, daysToFetch);

    try {
        // Fetch data for all dates in parallel
        const promises = dates.map(date => fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`).then(res => res.json()));
        const results = await Promise.all(promises);

        // Display results
        displayResults(results);
    } catch (error) {
        console.error('Error fetching NASA data:', error);
        document.getElementById('result').innerHTML = `<p>Unable to fetch data. Please try again later.</p>`;
    }
}

function generateDateRange(startDate, days) {
    const dates = [];
    const start = new Date(startDate);

    for (let i = 0; i < days; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() - i); // Subtract `i` days
        dates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }

    return dates;
}

function displayResults(dataArray) {
    const resultDiv = document.getElementById('result');
    let content = '';

    dataArray.forEach(data => {
        if (data.media_type === 'image') {
            content += `<div class="card">
                          <h2>${data.title}</h2>
                          <img src="${data.url}" alt="${data.title}" style="max-width:100%; height:auto;">
                          <p>${data.explanation}</p>
                        </div>`;
        } else if (data.media_type === 'video') {
            content += `<div class="card">
                          <h2>${data.title}</h2>
                          <iframe src="${data.url}" frameborder="0" style="width:100%; height:400px;" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                          <p>${data.explanation}</p>
                        </div>`;
        }
    });

    resultDiv.innerHTML = content;
}
