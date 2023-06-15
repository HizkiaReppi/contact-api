import { logger } from './utils/logging.js';
import { server } from './utils/server.js';

server.listen(3001, () => logger.info('Server running on port 3001'));
