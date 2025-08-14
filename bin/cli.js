#!/usr/bin/env node

const { Command } = require('commander');
const { loadConfig } = require('../lib/config');
const { buildRoutes } = require('../lib/builder');
const { startWatcher } = require('../lib/watcher');
const pkg = require('../package.json');

const program = new Command();

const config = loadConfig();

if (!config.enabled) {
  console.log('[Nexora] Nexora is disabled in configuration. Exiting.');
  process.exit(0);
}

program
  .version(pkg.version, '-v, --version', 'Output the current version')
  .description(pkg.description);

program
  .command('build')
  .description('Generate the route map file once.')
  .action(() => {
    buildRoutes(config);
  });

program
  .command('watch')
  .description('Watch for changes in the routers directory and regenerate the map automatically.')
  .action(() => {
    startWatcher(config);
  });
program.parse(process.argv);