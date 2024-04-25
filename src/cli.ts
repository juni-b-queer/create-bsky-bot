#!/usr/bin/env node

import { create } from 'create-create-app';
import { resolve } from 'path';

const templateRoot = resolve(__dirname, '..', 'templates');

const caveat = `
Make sure you have Bun and Docker installed, copy the .env.example and fill it out.
Now go out and build a bot!`;

// See https://github.com/uetchy/create-create-app/blob/master/README.md for other options.

create('create-bsky-bot', {
  templateRoot,
    after: () => console.log(`Good to go!`),
  caveat,
  skipGitInit: true,
  skipNpmInstall: true
});
