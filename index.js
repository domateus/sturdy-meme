const { createServer } = require('http');

const dotenv = require('dotenv');

dotenv.config();

const app = require('./config/router-factory');
const { prototype } = require('events');

const http = createServer(app);

process.on('SIGINT', () => http.close((error) => {
    if(error){
        console.error(`${error.name}: ${error.message}`);
    }
    process.exit(error ? 1 : 0);
}));

http.listen(8080, () => console.log('Ouvindo no *:8080'));