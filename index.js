#!/usr/bin/env node

import YAML from "yaml";
import fs from "fs";
import semver from "semver";

if (process.argv.length > 2) {
  const [, , chartPath, prefix = "v"] = process.argv;

  const helmChart = YAML.parseDocument(
    fs.readFileSync(`${chartPath}/Chart.yaml`, "utf8")
  );

  // get app versions and calculate diff
  const prevAppVersion = helmChart.get("appVersion");

  // https://docs.npmjs.com/cli/v9/using-npm/scripts?v=true#packagejson-vars
  const newAppVersion = process.env.npm_package_version;

  // apply new appVersion
  helmChart.set("appVersion", prefix + newAppVersion);

  // detect diff in appVersion
  const appVersionDiff = semver.diff(prevAppVersion, newAppVersion);

  if (appVersionDiff !== null) {
    // get helm version and apply the app version diff
    const prevHelmVersion = helmChart.get("version");
    const newHelmVersion = semver.inc(prevHelmVersion, appVersionDiff);

    // apply the new versions
    helmChart.set("version", newHelmVersion);
  } else {
    console.log(
      "No difference in appVersion detected, not updating version field."
    );
  }

  fs.writeFileSync(`${chartPath}/Chart.yaml`, helmChart.toString());
} else {
  console.log("Usage:");
  console.log('helm-version <chart> <prefix = "v">\n');
  process.exit(0);
}
