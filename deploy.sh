#!/bin/bash
# Deploy script — bouwt en herstart BEIDE PM2 processen
# Gebruik: bash deploy.sh

set -e

cd /var/www/next14-scaffold

echo "⏸️  PM2 tijdelijk stoppen (voorkomt incomplete .next tijdens build)..."
pm2 stop tinsights sonicroutes 2>/dev/null || true

echo "🔨 Bouwen..."
npm run build

echo "🔄 PM2 opnieuw starten via ecosystem.config.cjs (zelfde env op :3000 en :3001)..."
pm2 start ecosystem.config.cjs

echo ""
echo "⚠️  Tip: na een losse 'npm run build' altijd 'pm2 restart tinsights sonicroutes' draaien — anders blijft oude"
echo "   Node-proces draaien en krijg je 404 op /_next/static/css/*.css (pagina zonder styles, rare layout)."
echo ""
echo "✅ Deploy klaar! Beide processen draaien op de nieuwe build."
pm2 list | grep -E "sonicroutes|tinsights"
pm2 save
