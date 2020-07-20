let RSS_URLS = [
    `https://feeds.feedblitz.com/sethsblog`,
    `https://news.ycombinator.com/rss`
];

/*
    I believe you can get the full content of certain feeds but I'm still trying to find out how that works
    <p>${el.getElementsByTagNameNS("*", "encoded").item(0).textContent}</p>
 */

new Vue({
    el: '#app',
    template: "#app-template",
    /**
     * The data method is called by the component, and the values returned become the data model for that component.
     * The rssFeedUrls being passed here are defined at the top of this file.
     * The data for our case is going to be some RSS url feeds
     */
    data: function() {
        return {
           RSS_URLS
        }
    },

    methods: {
        fetchFeed: function () {
            fetch(RSS_URLS[0])
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
                .then(data => {
                    console.log(data);
                    const items = data.querySelectorAll('item');
                    let html = ``;
                    items.forEach(el => {
                        html += `
                            <article>
                                <h2>
                                    <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
                                        ${el.querySelector('title').innerHTML}
                                    </a>
                                </h2>
                            </article>               
                        `;
                    })
                    console.log(html);
                    document.body.insertAdjacentHTML('beforeend', html);
                });
        }
    }
})

