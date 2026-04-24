# Welcome to your Lovable project

## Open locally

From the project folder run:

```sh
npm install
npm run dev
```

Then open **http://localhost:8080** in your browser (or the port Vite prints if 8080 is in use). Shopify credentials are required for live product, cart, checkout, and preorder flows.

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## GitHub as frontend, Shopify as backend and checkout

This app is a **custom storefront**: the UI lives in this repo (and can be hosted on GitHub Pages); **products, cart, and checkout** are handled by **Shopify**.

### Local development

1. Copy env example and add your Shopify credentials:
   ```sh
   cp .env.example .env
   ```
2. Edit `.env`:
   - `VITE_SHOPIFY_STORE_DOMAIN` — your store (e.g. `your-store.myshopify.com`)
   - `VITE_SHOPIFY_STOREFRONT_TOKEN` — Storefront API token from Shopify Admin (Settings → Apps and sales channels → Develop apps → Configure Storefront API)
   - If you use the preorder signup form, the Storefront token also needs the `unauthenticated_write_customers` scope for `customerEmailMarketingSubscribe`
3. Run the app:
   ```sh
   npm i && npm run dev
   ```
4. If either Shopify variable is missing, the app now shows a runtime warning and production builds fail fast.

### Deploy frontend to GitHub Pages

1. In your GitHub repo: **Settings → Pages** → Source: **GitHub Actions**.
2. Add credentials for the build:
   - **Settings → Secrets and variables → Actions**
   - **Variables**: add `VITE_SHOPIFY_STORE_DOMAIN` (e.g. `your-store.myshopify.com`)
   - **Secrets**: add `VITE_SHOPIFY_STOREFRONT_TOKEN` (your Storefront API token)
3. Push to `main`; the workflow in `.github/workflows/deploy-pages.yml` will build and deploy.
4. The site will be at `https://<username>.github.io/<repo>/`. Checkout and payments run on Shopify.
5. Production builds now fail if Shopify credentials are missing, which helps catch broken GitHub Actions configuration before deploy.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
