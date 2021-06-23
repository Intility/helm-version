#!/usr/bin/env node

import YAML from 'yaml';
import fs from 'fs';
import { readPackageUpSync } from 'read-pkg-up';

if (process.argv.length > 2) {
  const [,, chartPath, prefix = 'v' ] = process.argv;
  
  const helmChart = YAML.parseDocument(fs.readFileSync(`${chartPath}/Chart.yaml`, 'utf8'));

  const version = readPackageUpSync().packageJson.version;
  
  helmChart.set('appVersion', prefix + version);
  
  fs.writeFileSync(`${chartPath}/Chart.yaml`, helmChart.toString());
} else {
  console.log('Usage:');
  console.log('helm-version <chart> <prefix = "v">\n');
  process.exit(0);
}
