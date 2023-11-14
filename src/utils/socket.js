import { io } from 'socket.io-client';

// const URL = 'https://skupstina.azurewebsites.net/';
const URL = 'http://localhost:4000/';


export const socket = io(URL);