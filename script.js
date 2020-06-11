const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=208692f9e6fc3293e21b3d9b337033b8&language=en-US&query=' + searchText;
    requestApi('GET', server);
    //const url = 'https://www.themoviedb.org/';

};

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    const request = new XMLHttpRequest();
    request.open(method, url)
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
            console.log('error: ' + request.status);
            return;
        }
        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function(item) {
            let nameItem = item.name || item.title;
            inner += `<div class='col-3'>${nameItem}</div>`;
        })
        movie.innerHTML = inner;

    });
}