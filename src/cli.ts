#!/usr/bin/env node

import { create } from 'create-create-app';
import { resolve } from 'path';
import * as fs from 'fs';
import * as path from 'path';

const templateRoot = resolve(__dirname, '..', 'templates');

const caveat = `
Make sure you have Bun and Docker installed. 
Copy the .env.example and fill it in.
Now go out and build a bot!`;

// See https://github.com/uetchy/create-create-app/blob/master/README.md for other options.


// options
// {
//   name: 'test',
//   packageDir: '/home/jbender/NewBots/test',
//   template: 'default',
//   templateDir: '/home/jbender/JSProjects/create-bsky-bot/templates/default',
//   year: 2024,
//   run: [Function: run],
//   installNpmPackage: [AsyncFunction: _],
//   answers: {
//     description: 'description',
//     author: 'Juni',
//     email: 'june@juniper-bender.tech',
//     license: 'MIT',
//     'node-pm': undefined,
//     nodePm: undefined,
//     buildaction: true,
//     contact: 'Juni <june@juniper-bender.tech>'
//   }
// }

create('create-bsky-bot', {
  templateRoot,
    after: (options) =>{
      if(options.answers.buildaction){
        const projectPath = options.packageDir;
        const githubWorkflowsDir = path.join(projectPath, '.github', 'workflows');
        if (!fs.existsSync(githubWorkflowsDir)){
          fs.mkdirSync(githubWorkflowsDir, { recursive: true });
        }

        const defaultTemplateDir = options.templateDir;

        const templatesDir = path.join(defaultTemplateDir, '..');

        const workflowsTemplateDir = path.join(templatesDir, 'workflows');

        const sourceFile = path.join(workflowsTemplateDir, 'buildandpublishtoghcr.yml');
        const destFile = path.join(githubWorkflowsDir, 'buildandpublishtoghcr.yml');
        fs.copyFileSync(sourceFile, destFile);
        console.log("Added GH action")
      }


    console.log("Good to go")
    },
  extra: {
    buildaction: {
      type: 'confirm',
      describe: 'Should include gh action to build the bot',
      default: 'y',
      prompt: 'always',
    },
  },
  caveat,
  skipGitInit: true,
  skipNpmInstall: true
});
