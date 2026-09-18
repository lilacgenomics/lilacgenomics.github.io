# Lilac Genomics — Notion template shop

A static site for GitHub Pages. No build step, no npm, no framework. Edit the files, push, done.

```
index.html                    home page
products/lila-life-os.html    product page (duplicate this for template #2)
assets/css/styles.css         all styling
assets/js/products.js         ← the only file you normally edit
assets/js/main.js             carousel, gallery, buy buttons, email form
assets/img/                   your screenshots (placeholders included)
robots.txt, sitemap.xml, 404.html, .nojekyll
```

---

## 1. Put it online (10 minutes)

1. On GitHub, create a repository named **`lilacgenomics.github.io`** — it must match your username exactly, or the root URL won't work.
2. Upload every file and folder here, keeping the structure. **Add file → Upload files**, then drag the whole folder in.
3. **Settings → Pages**. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Wait a minute or two, then open `https://lilacgenomics.github.io`.

Using a differently named repo (e.g. `shop`)? The site lives at `https://username.github.io/shop/` instead, and the two absolute `/assets/...` paths in `404.html` need to become `assets/...`.

---

## 2. Claim the domain on Pinterest

1. Pinterest → **Settings → Claimed accounts → Claim → Websites → Add HTML tag**.
2. Copy the `content="..."` value.
3. Paste it into the `p:domain_verify` tag near the top of **both** `index.html` and `products/lila-life-os.html`, replacing `PASTE_YOUR_PINTEREST_CODE_HERE`.
4. Push, wait for the page to go live, then hit **Verify**.

**Rich Pins** are already wired up — the product page carries `og:type=product`, `product:price:amount` and Product schema, so pins can show your live price. After claiming, run the product URL through Pinterest's [URL debugger](https://developers.pinterest.com/tools/url-debugger/) and apply once.

---

## 3. Connect Gumroad

In `assets/js/products.js`, replace the `gumroad` value with your real product link:

```js
gumroad: "https://lilacgenomics.gumroad.com/l/lila-life-os",
```

Every button marked `data-buy="..."` picks it up. `gumroad.js` is already loaded, so checkout opens as an overlay on your own page instead of bouncing the visitor to Gumroad — the single biggest conversion win for a one-product store. In Gumroad, under the product's **Share** settings, make sure embedding is allowed.

**Delivering the Notion template itself:** in Gumroad, put your Notion share link in the product's *Content* section, or attach a PDF containing it. In Notion, open your template page → **Share → Publish to web**, turn on **Allow duplicate as template**, and use that published URL. Test it from a logged-out browser before you sell.

Changing the price? Update it in three places: `products.js`, the product page's `product:price:amount` meta tag, and the JSON-LD `price` field.

---

## 4. Swap in your screenshots

Replace the files in `assets/img/` keeping the same names, or point `products.js` at new ones.

| What | File | Size |
|---|---|---|
| Hero / cover | `cover-dashboard.jpg` | 1600 × 1000 |
| Page previews | `page-planner.jpg` etc. | 1600 × 1000 |
| Social preview | `og-image.jpg` | 1200 × 630 (jpg or png) |
| Favicon | `favicon.png` | 256 × 256 |

For screenshots that match the site: open your template in Notion, hide the sidebar, set the browser to roughly 1600 px wide, and capture just the page area. Compress each one under ~400 KB at [Squoosh](https://squoosh.app).

For Pinterest, make a separate 1000 × 1500 (2:3) version of your best screen with the template name on it — vertical pins get far more saves than landscape ones.

---

## 5. Add template #2

1. Uncomment the block at the bottom of `PRODUCTS` in `products.js` and fill it in.
2. Duplicate `products/lila-life-os.html`, rename it to match the `page` value, then update the title, description, meta tags, JSON-LD, images and the `data-buy` id inside.
3. Add the new URL to `sitemap.xml`.

The home grid and carousel update themselves from `products.js`.

---

## 6. Email sign-ups (optional)

The form does nothing until you give it an endpoint. Easiest free option is [formspree.io](https://formspree.io):

```js
newsletterEndpoint: "https://formspree.io/f/YOUR_ID"
```

ConvertKit, Getform and Buttondown accept the same JSON POST, so any of their endpoints drop straight in.

---

## 7. Custom domain (optional)

Add a file named `CNAME` at the root containing just `lilacgenomics.com`, then point your DNS at GitHub:

```
A     185.199.108.153
A     185.199.109.153
A     185.199.110.153
A     185.199.111.153
```

Then update `url` in `products.js` plus the `og:url` and `canonical` tags on each page, and claim the new domain on Pinterest again.

---

## Conversion notes

- Real screenshots matter more than any layout choice here. Placeholder gradients will sink the conversion rate before the design gets a chance.
- Keep the overlay checkout — don't remove `gumroad.js`.
- A free mini template is the usual way to grow the email list. Put it on Gumroad at $0, link it where the email form is, and sell the paid one to that list later.
- Pins convert best when the image shows the template in use with the name readable at thumbnail size.
- Don't add a second competing button next to "Buy now". One obvious action per screen.
