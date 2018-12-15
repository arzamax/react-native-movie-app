import axios from 'axios';

import config from '../config';

export const network = axios.create({
    baseURL: config.path
});
