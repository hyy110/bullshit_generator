import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import { generator } from './lib/generator';
import { createRandomPicker } from './lib/random';

const __dirname = dirname(fileURLToPath(import.meta.url));

