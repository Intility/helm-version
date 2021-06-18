# helm-version

A tool for setting a Helm charts `appVersion` based on the `package.json` `version` field. To be used with `npm version`.

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

You can now call `npm version` as usual to version your app, and the `appVersion` field will be automatically updated and added to the git commit and tag!
