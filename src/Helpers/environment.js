let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'ncg-character-creative-client.herokuapp.com':
        APIURL = 'https://ncg-character-creative-server.herokuapp.com'
}

export default APIURL;  

