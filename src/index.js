import dotenv from 'dotenv';
import { logger } from './utils/logging.js';
import { server } from './utils/server.js';

dotenv.config();

server.listen(3001, () => logger.info('Server running on port 3001'));
