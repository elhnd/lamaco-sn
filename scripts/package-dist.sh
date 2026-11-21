#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
node scripts/validate-build.mjs
mkdir -p artifacts
release_dir=$(mktemp -d "$PWD/artifacts/package.XXXXXX")
trap 'rm -rf "$release_dir"' EXIT HUP INT TERM
(cd dist && zip -qr "$release_dir/lamaco-v2-dist.zip" .)
unzip -tq "$release_dir/lamaco-v2-dist.zip"
mv "$release_dir/lamaco-v2-dist.zip" artifacts/lamaco-v2-dist.zip
(cd artifacts && sha256sum lamaco-v2-dist.zip > lamaco-v2-dist.zip.sha256)
printf '%s\n' 'Ready: artifacts/lamaco-v2-dist.zip (extract its contents directly into the subdomain document root).'
