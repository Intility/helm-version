<h1 align="center">
  <img src="./.github/images/logo192.png" width="124px"/><br/>
  @intility/helm-version
</h1>

<p align="center">
  A tool for setting a Helm charts `appVersion` based on the `package.json` `version` field. To be used with `npm version`.
</p>

<p align="center">
  <a href="https://github.com/Intility/helm-version/actions">
    <img alt="pipeline" src="https://github.com/Intility/helm-version/actions/workflows/publish.yml/badge.svg" style="max-width:100%;" />
  </a>
  <a href="https://www.npmjs.com/package/@intility/helm-version">
    <img alt="package version" src="https://img.shields.io/npm/v/@intility/helm-version" style="max-width:100%;" />
  </a>
</p>

## Usage

Install with

```shell
npm install @intility/helm-version
```

Add a `version` script to your `package.json`

```json
{
  "scripts": {
    "version": "helm-version path/to/chart && git add path/to/chart/Chart.yaml"
  }
}
```

You can now call `npm version` as usual to version your app,
and the `appVersion` field will be automatically updated and added to the git commit and tag!

Alternatively, you can run it manually

```shell
helm-version <chart> <prefix>
```

Prefix is optional, and defaults to `v`.
This is because `npm version` prefixes the git tag with `v`.
