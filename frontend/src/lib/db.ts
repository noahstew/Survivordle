import { neonConfig, Pool } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '../.env') });

neonConfig.fetchConnectionCache = true;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export { pool };
