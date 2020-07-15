let websiteUrl = 'https://www.taniarascia.com/rss.xml';

fetch(websiteUrl)
    .then(res => {
        res.text().then(htmlText => {
            var domParser = new DOMParser();
            let doc = domParser.parseFromString(htmlText, 'text/html');
            console.log(doc);
            var feedUrl = doc.querySelector('link').href;
            console.log(feedUrl);
        })
    }).catch((err) => console.log(err));

