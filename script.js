document.addEventListener('DOMContentLoaded', () => {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);

            let currentPage = 0;
            let totalPages = 0;

            // Get comic ID
            const comicId = new URLSearchParams(window.location.search).get('comic');

            const COMICS = {
                'sillyteam-ep1': {
                    title: 'sillyteam #1',
                    pages: [
                        'comics/sillyteam/sillyteamep1cover.png',
                        'comics/sillyteam/page1.png',
                        'comics/sillyteam/page2.png',
                        'comics/sillyteam/page3.png',
                        'comics/sillyteam/page4.png',
                        'comics/sillyteam/page5.png',
                        'comics/sillyteam/page6.png',
                        'comics/sillyteam/page7.png',
                        'comics/sillyteam/page8.png',
                        'comics/sillyteam/page9.png'
                    ]
                },
                'villain-ep1': {
                    title: 'A Villain #1',
                    pages: [
                        'comics/kasar/cover.png',
                        'comics/kasar/page1.png'
                    ]
                }
            };

            //Loading comics
            if (COMICS[comicId]) {
                loadComic(COMICS[comicId]);
            }

            function loadComic(comic) {
                const viewport = document.getElementById('comicViewport');
                const titleEl = document.getElementById('comicTitle');
                const counter = document.getElementById('pageCounter');

                //Set comic title
                titleEl.textContent = comic.title;
                //Clear pages
                viewport.innerHTML = '';

                //Build the page img element
                comic.pages.forEach((pageSrc, index) => {
                    const img = document.createElement('img');
                    img.src = pageSrc;
                    img.className = 'comicPage';
                    img.alt = `Page ${index + 1}`;
                    img.dataset.page = index;

                    //Hide all pages except first
                    img.style.display = (index === 0) ? 'block' : 'none';
                    viewport.appendChild(img);
                });

                //Initialize page counter
                totalPages = comic.pages.length;
                currentPage = 0;
                updateControls();
            }

            //Nav controls

            function updateControls() {
                const prevBtn = document.getElementById('prevButton');
                const nextBtn = document.getElementById('nextButton');
                const counter = document.getElementById('pageCounter');

                //Disable prev on first page
                prevBtn.disabled = currentPage === 0;
                nextBtn.disabled = currentPage === totalPages - 1;

                //Update counter text
                counter.textContent = `${currentPage + 1}/${totalPages}`;

                //Show current page hide others
                document.querySelectorAll('.comicPage').forEach((page, i) => {
                    page.style.display = i === currentPage ? 'block' : 'none';
                });
            }

            //Nav buttons
            document.getElementById('prevButton').addEventListener('click', () => {
                if (currentPage > 0) {
                    currentPage--;
                    updateControls();
                }
            });

            document.getElementById('nextButton').addEventListener('click', () => {
                if (currentPage < totalPages - 1) {
                    currentPage++;
                    updateControls();
                }
            });

            // Keyboard arrow support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') document.getElementById('prevButton').click();
                if (e.key === 'ArrowRight') document.getElementById('nextButton').click();
            });
        });
});
