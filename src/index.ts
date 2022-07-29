import { initDB } from './components/sequelize';
import { server } from './components/server';
import config from './config.json';

console.log(`
888b    888                                                                 
8888b   888                                                                 
88888b  888                                                                 
888Y88b 888  .d88b.   8888b.  888d888       .d8888b .d88b.  888d888 .d88b.  
888 Y88b888 d8P  Y8b     "88b 888P"        d88P"   d88""88b 888P"  d8P  Y8b 
888  Y88888 88888888 .d888888 888   888888 888     888  888 888    88888888 
888   Y8888 Y8b.     888  888 888          Y88b.   Y88..88P 888    Y8b.     
888    Y888  "Y8888  "Y888888 888           "Y8888P "Y88P"  888     "Y8888  
`);

initDB();
server.listen(config.listening_port);
