# Tinsights Website

Productie-website gebouwd met Next.js 14.

## Vereisten

- Node.js 20+
- npm 10+
- Linux server (Ubuntu aanbevolen)
- PM2 (voor process management)
- Nginx (reverse proxy + SSL)

## Lokale ontwikkeling

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build voor productie

```bash
npm install
npm run build
npm run start
```

## Environment variables

Maak een `.env.local` (of productie `.env`) met minimaal:

```bash
SESSION_SECRET=your_long_random_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
RESEND_API_KEY=your_resend_key
MAIL_FROM=noreply@yourdomain.com
MAIL_TO=you@yourdomain.com
```

## Deploy op een andere server (PM2)

1. Clone repo op de server
2. Installeer dependencies
3. Build de app
4. Start met PM2

```bash
git clone <repo-url> /var/www/next14-scaffold
cd /var/www/next14-scaffold
npm install
npm run build
pm2 start npm --name tinsights -- start
pm2 save
pm2 startup
```

## Nginx reverse proxy (voorbeeld)

Proxy naar de Next.js app op poort `3000`:

```nginx
server {
    server_name tinsights.nl www.tinsights.nl;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activeer daarna SSL met Certbot.

## Handige productiecommando's

```bash
pm2 list
pm2 logs tinsights
pm2 restart tinsights
```

## Backup en herstel

- Elke push naar GitHub is je off-site backup.
- Herstellen op nieuwe server = repo clonen + `.env` zetten + `npm install` + `npm run build` + `pm2 start`.
