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
                'USM4': {
                    title: 'Ultimate Spider-Man #4 (2000)',
                    pages: [
                        'comics/USM4/cover.jpg',
                        'comics/USM4/page1.jpg',
                        'comics/USM4/page2.jpg',
                        'comics/USM4/page3.jpg',
                        'comics/USM4/page4.jpg',
                        'comics/USM4/page5.jpg',
                        'comics/USM4/page6.jpg'
                    ]
                },
                'USM37': {
                    title: 'Ultimate Spider-Man #37 (2000)',
                    pages: [
                        'comics/USM37/cover.jpg',
                        'comics/USM37/page1.jpg',
                        'comics/USM37/page2.jpg',
                        'comics/USM37/page3.jpg',
                        'comics/USM37/page4.jpg',
                        'comics/USM37/page5.jpg',
                        'comics/USM37/page6.jpg',
                        'comics/USM37/page7.jpg',
                        'comics/USM37/page8.jpg',
                        'comics/USM37/page9.jpg',
                        'comics/USM37/page10.jpg',
                        'comics/USM37/page11.jpg',
                        'comics/USM37/page12.jpg',
                        'comics/USM37/page13.jpg',
                        'comics/USM37/page14.jpg',
                        'comics/USM37/page15.jpg',
                        'comics/USM37/page16.jpg',
                        'comics/USM37/page17.jpg',
                        'comics/USM37/page18.jpg',
                        'comics/USM37/page19.jpg',
                        'comics/USM37/page20.jpg'
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
