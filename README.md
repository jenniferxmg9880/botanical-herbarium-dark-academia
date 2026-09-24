# Herbology OSINT Challenge — Answer Key

**Flag:** `witchacademy{h1dden_1n_pl41n_p3t4ls}`

This is a **4-step chain**, each step nudging toward the next. Nothing requires
tools beyond a browser — view-source, dev tools console, and reading a file
that's just sitting on the server.

## Step 1 — View source on index.html
Near the top of the `<head>`, an HTML comment contains a base64 string:
`d2l0Y2hhY2FkZW15e2gxZGRlbl8=` → decodes to `witchacademy{h1dden_`
The comment text also hints that "a crawler is told where NOT to go" — nudging toward robots.txt.

## Step 2 — Check /robots.txt
```
User-agent: *
Disallow: /grimoire-restricted.html
```
Visiting that disallowed path is the intended move (robots.txt lists what NOT
to index, not what's actually secret — a classic OSINT/recon lesson).

## Step 3 — /grimoire-restricted.html
Contains fragment `1n_` directly in the page text, plus a riddle pointing at
"a specimen pressed without its leaves" (the Autumn Crocus, card No. 07) and
telling the player to inspect its illustration's metadata.

## Step 4 — Inspect the Autumn Crocus SVG (card No. 07)
View-source or inspect-element on the `<svg>` in that card reveals a `<title>`
element (this stands in for real EXIF metadata, which SVG doesn't natively
carry): it contains fragment `pl41n_`.

## Step 5 — Browser console
`script.js` logs a styled console message on every page load containing the
final fragment `p3t4ls}`.

## Reassembled
`witchacademy{` + `h1dden_` + `1n_` + `pl41n_` + `p3t4ls}`
= **`witchacademy{h1dden_1n_pl41n_p3t4ls}`**

---

## If you want to change the flag
Search each file for these fragment strings and swap them:
- `index.html` — the base64 comment near the top of `<head>` (re-encode with `base64`)
- `grimoire-restricted.html` — the `.fragment` div text
- `index.html` — the Autumn Crocus card's `<title>` tag inside its `<svg>`
- `script.js` — the last line of the `console.log` string

## Ideas to make it harder (optional extensions)
- Replace the SVG `<title>` trick with **real EXIF data** in an actual JPEG
  photo of a crocus (use `exiftool -Comment="..." photo.jpg`), swapped in for
  the illustration. That turns step 4 into genuine image-metadata OSINT.
- Password-protect `/grimoire-restricted.html` with a hint elsewhere (e.g. a
  Latin name as the password) instead of leaving it open once found.
- Add a `sitemap.xml` as a second, misleading path alongside robots.txt.
- Register a decoy meta `content` in `<meta name="author">` that's a red
  herring rather than flavor text, if you want to punish careless players.
