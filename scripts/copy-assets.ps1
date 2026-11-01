# Run this script to copy your hero image and resume into public/
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$public = Join-Path $root "public"

$heroSources = @(
  "C:\Users\Likethan KJ\Pictures\hero.png",
  "C:\Users\Likethan\Pictures\hero.png"
)
$resumeSources = @(
  "C:\Users\Likethan KJ\Documents\Likethan_KJ_Resume.pdf",
  "C:\Users\Likethan\Documents\Likethan_KJ_Resume.pdf"
)

New-Item -ItemType Directory -Force -Path $public | Out-Null

foreach ($src in $heroSources) {
  if (Test-Path $src) {
    Copy-Item $src (Join-Path $public "hero.png") -Force
    Write-Host "Copied hero.png from $src"
    break
  }
}

foreach ($src in $resumeSources) {
  if (Test-Path $src) {
    Copy-Item $src (Join-Path $public "likethan-kj-resume.pdf") -Force
    Write-Host "Copied resume from $src"
    break
  }
}

Write-Host "Done. Verify files in $public"
