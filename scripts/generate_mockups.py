"""
Generates 5 professional device-framed mockup images for SonicRoutes FeaturedWork section.
Each image is 1280x1280px with a shots.so-style light background and realistic device frames.
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD    = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
OUT_DIR      = "/var/www/next14-scaffold/public/assets"

SIZE = 1280


# ─── Colour palettes ───────────────────────────────────────────────────────────
INDIGO  = (99,  102, 241)
SLATE9  = (15,  23,  42)
SLATE7  = (51,  65,  85)
SLATE5  = (100, 116, 139)
SLATE2  = (226, 232, 240)
SLATE1  = (241, 245, 249)
WHITE   = (255, 255, 255)
BLACK   = (0,   0,   0)
GREEN   = (34,  197, 94)
AMBER   = (245, 158, 11)
ROSE    = (244, 63,  94)
SKY     = (14,  165, 233)
PURPLE  = (168, 85,  247)
EMERALD = (16,  185, 129)
ORANGE  = (249, 115, 22)


# ─── Helpers ───────────────────────────────────────────────────────────────────
def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def rounded_rect(draw: ImageDraw.Draw, xy, radius: int, fill, outline=None, outline_width=1):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill,
                           outline=outline, width=outline_width)


def shadow_rect(img: Image.Image, xy, radius: int, blur_passes=6, alpha_max=70):
    """Paint a soft box-shadow under a rect by drawing blurred dark rectangles."""
    shadow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    x0, y0, x1, y1 = xy
    for i in range(blur_passes, 0, -1):
        alpha = int(alpha_max * (blur_passes - i + 1) / (blur_passes + 1))
        offset = i * 3
        sd.rounded_rectangle(
            [x0 + offset, y0 + offset, x1 + offset, y1 + offset],
            radius=radius + i,
            fill=(0, 0, 0, alpha),
        )
    img.paste(shadow, (0, 0), shadow)


def gradient_rect(draw: ImageDraw.Draw, x0, y0, x1, y1, color_top, color_bottom):
    h = y1 - y0
    for row in range(h):
        t = row / max(h - 1, 1)
        r = int(color_top[0] + (color_bottom[0] - color_top[0]) * t)
        g = int(color_top[1] + (color_bottom[1] - color_top[1]) * t)
        b = int(color_top[2] + (color_bottom[2] - color_top[2]) * t)
        draw.line([(x0, y0 + row), (x1, y0 + row)], fill=(r, g, b))


def canvas_bg(size=1280):
    """Create a shots.so-style light background."""
    img = Image.new("RGB", (size, size), (248, 248, 252))
    draw = ImageDraw.Draw(img)
    # subtle radial-ish gradient: slightly darker corners
    for i in range(30):
        alpha_val = int(8 * i / 30)
        draw.rectangle([i, i, size - i, size - i], outline=(220, 220, 230))
    return img


def browser_chrome(draw: ImageDraw.Draw, x0, y0, width, chrome_h=44, url="sonicroutes.com"):
    """Draw browser top-chrome bar."""
    # Chrome bg
    draw.rounded_rectangle([x0, y0, x0 + width, y0 + chrome_h], radius=14,
                            fill=(245, 245, 250), outline=SLATE2, width=1)
    # Traffic lights
    for ci, col in enumerate([(255, 95, 87), (255, 189, 46), (39, 201, 63)]):
        cx = x0 + 18 + ci * 20
        cy = y0 + chrome_h // 2
        draw.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=col)
    # URL bar
    ub_x0, ub_y0 = x0 + 82, y0 + 8
    ub_x1, ub_y1 = x0 + width - 16, y0 + chrome_h - 8
    draw.rounded_rectangle([ub_x0, ub_y0, ub_x1, ub_y1], radius=6,
                            fill=WHITE, outline=SLATE2, width=1)
    font_url = load_font(FONT_REGULAR, 11)
    draw.text((ub_x0 + 10, ub_y0 + 4), f"  {url}", fill=SLATE5, font=font_url)


def phone_frame(img: Image.Image, x0, y0, width, height):
    """Draw an iPhone-style phone frame around a region already drawn in img."""
    draw = ImageDraw.Draw(img)
    # Outer body
    draw.rounded_rectangle([x0 - 14, y0 - 56, x0 + width + 14, y0 + height + 56],
                            radius=46, fill=(30, 30, 35), outline=(55, 55, 60), width=2)
    # Side buttons
    for by in [y0 + 60, y0 + 110, y0 + 160]:
        draw.rounded_rectangle([x0 - 20, by, x0 - 15, by + 40], radius=3, fill=(50, 50, 55))
    draw.rounded_rectangle([x0 + width + 15, y0 + 90, x0 + width + 20, y0 + 150],
                            radius=3, fill=(50, 50, 55))
    # Screen bezel
    draw.rounded_rectangle([x0 - 8, y0 - 48, x0 + width + 8, y0 + height + 48],
                            radius=38, fill=(18, 18, 22))
    # Notch / Dynamic Island
    ni_w, ni_h = 100, 22
    ni_x = x0 + (width - ni_w) // 2
    draw.rounded_rectangle([ni_x, y0 - 38, ni_x + ni_w, y0 - 16], radius=11, fill=(10, 10, 14))
    # Bottom indicator bar
    bar_y = y0 + height + 28
    draw.rounded_rectangle([x0 + width // 2 - 50, bar_y, x0 + width // 2 + 50, bar_y + 4],
                            radius=2, fill=(80, 80, 85))


# ─── Mockup 1 – Webshop op maat ───────────────────────────────────────────────
def mockup_webshop(out_path: str):
    img = canvas_bg()
    draw = ImageDraw.Draw(img)

    BW, BH = 880, 620
    BX, BY = (SIZE - BW) // 2, (SIZE - BH) // 2 - 20
    CHROME = 44

    shadow_rect(img, [BX, BY, BX + BW, BY + BH], 18)
    draw.rounded_rectangle([BX, BY, BX + BW, BY + BH], radius=18, fill=WHITE, outline=SLATE2, width=1)
    browser_chrome(draw, BX, BY, BW, chrome_h=CHROME, url="jouwwebshop.nl")

    # — Navbar inside browser —
    CY = BY + CHROME
    draw.rectangle([BX, CY, BX + BW, CY + 52], fill=(255, 255, 255))
    fn_bold = load_font(FONT_BOLD, 15)
    fn_reg  = load_font(FONT_REGULAR, 12)
    draw.text((BX + 24, CY + 16), "ShopCo.", fill=SLATE9, font=fn_bold)
    for i, label in enumerate(["Home", "Producten", "Over ons", "Contact"]):
        draw.text((BX + 140 + i * 100, CY + 18), label, fill=SLATE7, font=fn_reg)
    # Cart button
    draw.rounded_rectangle([BX + BW - 120, CY + 12, BX + BW - 24, CY + 40],
                            radius=14, fill=INDIGO)
    draw.text((BX + BW - 108, CY + 18), "Winkelwagen", fill=WHITE,
              font=load_font(FONT_REGULAR, 10))

    # — Hero banner —
    HY = CY + 52
    gradient_rect(draw, BX, HY, BX + BW, HY + 160, (224, 231, 255), (199, 210, 254))
    draw.text((BX + 32, HY + 22), "Nieuw binnen dit seizoen", fill=INDIGO,
              font=load_font(FONT_BOLD, 18))
    draw.text((BX + 32, HY + 50), "Tot 30% korting op geselecteerde artikelen", fill=SLATE7,
              font=fn_reg)
    draw.rounded_rectangle([BX + 32, HY + 84, BX + 200, HY + 116], radius=22, fill=INDIGO)
    draw.text((BX + 60, HY + 94), "Shop nu →", fill=WHITE, font=load_font(FONT_BOLD, 13))
    # Hero decoration circles
    for cx, cy, r, col in [(BX + BW - 80, HY + 30, 50, (199, 210, 254)),
                           (BX + BW - 40, HY + 100, 70, (224, 231, 255))]:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)

    # — Product grid —
    GY = HY + 168
    draw.text((BX + 24, GY), "Bestsellers", fill=SLATE9, font=load_font(FONT_BOLD, 14))
    card_colors = [(224, 231, 255), (254, 243, 199), (220, 252, 231), (254, 226, 226)]
    for ci in range(4):
        cx = BX + 20 + ci * 210
        cy = GY + 28
        draw.rounded_rectangle([cx, cy, cx + 190, cy + 200], radius=12,
                                fill=WHITE, outline=SLATE2, width=1)
        draw.rounded_rectangle([cx + 10, cy + 10, cx + 180, cy + 120], radius=8,
                                fill=card_colors[ci])
        price_y = cy + 130
        draw.text((cx + 12, price_y), f"Product {ci + 1}", fill=SLATE9,
                  font=load_font(FONT_BOLD, 12))
        draw.text((cx + 12, price_y + 20), f"€ {19 + ci * 10},-", fill=INDIGO,
                  font=load_font(FONT_BOLD, 14))
        draw.rounded_rectangle([cx + 10, cy + 168, cx + 180, cy + 190], radius=10,
                                fill=INDIGO)
        draw.text((cx + 54, cy + 172), "In winkelwagen", fill=WHITE,
                  font=load_font(FONT_REGULAR, 10))

    img.save(out_path, "PNG", optimize=True)
    print(f"✓ {out_path}")


# ─── Mockup 2 – Bedrijfssite ──────────────────────────────────────────────────
def mockup_bedrijfssite(out_path: str):
    img = canvas_bg()
    draw = ImageDraw.Draw(img)

    BW, BH = 880, 620
    BX, BY = (SIZE - BW) // 2, (SIZE - BH) // 2 - 20
    CHROME = 44

    shadow_rect(img, [BX, BY, BX + BW, BY + BH], 18)
    draw.rounded_rectangle([BX, BY, BX + BW, BY + BH], radius=18, fill=WHITE, outline=SLATE2, width=1)
    browser_chrome(draw, BX, BY, BW, chrome_h=CHROME, url="bedrijfsnaam.nl")

    CY = BY + CHROME
    fn_bold = load_font(FONT_BOLD, 15)
    fn_reg  = load_font(FONT_REGULAR, 12)
    fn_sm   = load_font(FONT_REGULAR, 10)

    # Navbar
    draw.rectangle([BX, CY, BX + BW, CY + 52], fill=SLATE9)
    draw.text((BX + 24, CY + 16), "BedrijfNL", fill=WHITE, font=fn_bold)
    for i, label in enumerate(["Diensten", "Over ons", "Cases", "Blog"]):
        draw.text((BX + 140 + i * 100, CY + 18), label, fill=SLATE2, font=fn_reg)
    draw.rounded_rectangle([BX + BW - 130, CY + 12, BX + BW - 24, CY + 40],
                            radius=14, fill=INDIGO)
    draw.text((BX + BW - 118, CY + 18), "Neem contact op", fill=WHITE,
              font=load_font(FONT_REGULAR, 9))

    # Hero
    HY = CY + 52
    gradient_rect(draw, BX, HY, BX + BW, HY + 200, SLATE9, (30, 41, 59))
    draw.text((BX + 36, HY + 28), "Wij bouwen digitale\noplossingen die werken", fill=WHITE,
              font=load_font(FONT_BOLD, 22))
    draw.text((BX + 36, HY + 104), "Strategie · Design · Technologie · Groei", fill=SLATE5,
              font=fn_reg)
    draw.rounded_rectangle([BX + 36, HY + 140, BX + 200, HY + 172], radius=22, fill=INDIGO)
    draw.text((BX + 62, HY + 150), "Bekijk diensten", fill=WHITE,
              font=load_font(FONT_BOLD, 12))
    # abstract circles in hero
    for cx, cy, r in [(BX + BW - 100, HY + 60, 80), (BX + BW - 60, HY + 140, 60)]:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                     outline=(99, 102, 241), width=2)

    # Stats bar
    SY = HY + 200
    draw.rectangle([BX, SY, BX + BW, SY + 64], fill=INDIGO)
    for i, (val, lbl) in enumerate([("150+", "Projecten"), ("8 jr", "Ervaring"),
                                    ("98%", "Klanttevredenheid"), ("24/7", "Support")]):
        sx = BX + 60 + i * 210
        draw.text((sx, SY + 10), val, fill=WHITE, font=load_font(FONT_BOLD, 18))
        draw.text((sx, SY + 38), lbl, fill=(199, 210, 254), font=fn_sm)

    # Services cards
    SVY = SY + 76
    draw.text((BX + 24, SVY + 6), "Onze diensten", fill=SLATE9,
              font=load_font(FONT_BOLD, 14))
    icons = [(INDIGO, "Web ontwikkeling"), (SKY, "UI / UX Design"),
             (PURPLE, "SEO & Marketing")]
    for ci, (col, label) in enumerate(icons):
        cx = BX + 20 + ci * 285
        cy = SVY + 34
        draw.rounded_rectangle([cx, cy, cx + 262, cy + 160], radius=12,
                                fill=SLATE1, outline=SLATE2, width=1)
        draw.rounded_rectangle([cx + 14, cy + 14, cx + 48, cy + 48], radius=8, fill=col)
        draw.text((cx + 14, cy + 62), label, fill=SLATE9, font=load_font(FONT_BOLD, 13))
        draw.rounded_rectangle([cx + 14, cy + 90, cx + 220, cy + 100], radius=4, fill=SLATE2)
        draw.rounded_rectangle([cx + 14, cy + 110, cx + 180, cy + 120], radius=4, fill=SLATE2)
        draw.rounded_rectangle([cx + 14, cy + 130, cx + 200, cy + 140], radius=4, fill=SLATE2)

    img.save(out_path, "PNG", optimize=True)
    print(f"✓ {out_path}")


# ─── Mockup 3 – Dienstverleningssite / Leadgeneratie ──────────────────────────
def mockup_diensten(out_path: str):
    img = canvas_bg()
    draw = ImageDraw.Draw(img)

    BW, BH = 880, 620
    BX, BY = (SIZE - BW) // 2, (SIZE - BH) // 2 - 20
    CHROME = 44

    shadow_rect(img, [BX, BY, BX + BW, BY + BH], 18)
    draw.rounded_rectangle([BX, BY, BX + BW, BY + BH], radius=18, fill=WHITE, outline=SLATE2, width=1)
    browser_chrome(draw, BX, BY, BW, chrome_h=CHROME, url="dienstverlener.nl")

    CY = BY + CHROME
    fn_bold = load_font(FONT_BOLD, 15)
    fn_reg  = load_font(FONT_REGULAR, 12)
    fn_sm   = load_font(FONT_REGULAR, 10)

    # Navbar
    draw.rectangle([BX, CY, BX + BW, CY + 52], fill=WHITE)
    draw.line([(BX, CY + 52), (BX + BW, CY + 52)], fill=SLATE2, width=1)
    draw.text((BX + 24, CY + 16), "DienstPro", fill=SLATE9, font=fn_bold)
    for i, label in enumerate(["Diensten", "Werkwijze", "Reviews", "Prijzen"]):
        draw.text((BX + 150 + i * 110, CY + 18), label, fill=SLATE7, font=fn_reg)
    draw.rounded_rectangle([BX + BW - 160, CY + 12, BX + BW - 24, CY + 40],
                            radius=14, fill=GREEN)
    draw.text((BX + BW - 148, CY + 18), "Gratis Adviesgesprek", fill=WHITE,
              font=load_font(FONT_REGULAR, 9))

    # Hero – two columns
    HY = CY + 52
    draw.rectangle([BX, HY, BX + BW, HY + 260], fill=(250, 250, 255))
    # Left col
    draw.text((BX + 36, HY + 30), "Meer klanten.\nMeer omzet.", fill=SLATE9,
              font=load_font(FONT_BOLD, 26))
    draw.text((BX + 36, HY + 126), "Wij zorgen voor een website die converteert.\nMet bewezen\
 strategie en meetbare resultaten.", fill=SLATE5, font=fn_reg)
    draw.rounded_rectangle([BX + 36, HY + 190, BX + 210, HY + 224], radius=22, fill=GREEN)
    draw.text((BX + 58, HY + 200), "Start vandaag nog ↗", fill=WHITE,
              font=load_font(FONT_BOLD, 12))
    draw.text((BX + 36, HY + 234), "✓ Geen verborgen kosten   ✓ Binnen 10 dagen live",
              fill=SLATE5, font=fn_sm)
    # Right col — form card
    FC_X = BX + 510
    draw.rounded_rectangle([FC_X, HY + 16, FC_X + 340, HY + 244], radius=14,
                            fill=WHITE, outline=SLATE2, width=1)
    draw.text((FC_X + 20, HY + 28), "Plan uw gratis gesprek", fill=SLATE9,
              font=load_font(FONT_BOLD, 13))
    for fi, ph in enumerate(["Uw naam", "E-mailadres", "Telefoonnummer"]):
        fy = HY + 60 + fi * 46
        draw.rounded_rectangle([FC_X + 16, fy, FC_X + 320, fy + 30], radius=6,
                                fill=SLATE1, outline=SLATE2, width=1)
        draw.text((FC_X + 24, fy + 8), ph, fill=SLATE5, font=fn_sm)
    draw.rounded_rectangle([FC_X + 16, HY + 202, FC_X + 320, HY + 232],
                            radius=10, fill=GREEN)
    draw.text((FC_X + 116, HY + 210), "Verstuur →", fill=WHITE,
              font=load_font(FONT_BOLD, 12))

    # Trust bar
    TY = HY + 260
    draw.rectangle([BX, TY, BX + BW, TY + 52], fill=SLATE1)
    draw.text((BX + 28, TY + 16), "✓ 5-sterren reviews", fill=EMERALD,
              font=load_font(FONT_BOLD, 11))
    draw.text((BX + 230, TY + 16), "★★★★★  4.9/5  (127 reviews)", fill=AMBER,
              font=load_font(FONT_BOLD, 11))
    draw.text((BX + 580, TY + 16), "✓ KVK geregistreerd", fill=SLATE7,
              font=load_font(FONT_REGULAR, 11))

    # Reviews
    RY = TY + 64
    for ci in range(3):
        rx = BX + 20 + ci * 285
        draw.rounded_rectangle([rx, RY, rx + 262, RY + 160], radius=12,
                                fill=WHITE, outline=SLATE2, width=1)
        draw.text((rx + 14, RY + 14), "★★★★★", fill=AMBER,
                  font=load_font(FONT_BOLD, 14))
        draw.rounded_rectangle([rx + 14, RY + 42, rx + 240, RY + 52], radius=3, fill=SLATE2)
        draw.rounded_rectangle([rx + 14, RY + 60, rx + 200, RY + 70], radius=3, fill=SLATE2)
        draw.rounded_rectangle([rx + 14, RY + 78, rx + 220, RY + 88], radius=3, fill=SLATE2)
        draw.rounded_rectangle([rx + 14, RY + 108, rx + 36, RY + 130],
                                radius=11, fill=INDIGO)
        draw.text((rx + 52, RY + 112), f"Klant {ci + 1}", fill=SLATE9,
                  font=load_font(FONT_BOLD, 11))
        draw.text((rx + 52, RY + 128), "Ondernemer", fill=SLATE5,
                  font=fn_sm)

    img.save(out_path, "PNG", optimize=True)
    print(f"✓ {out_path}")


# ─── Mockup 4 – Portfolio layout ──────────────────────────────────────────────
def mockup_portfolio(out_path: str):
    img = canvas_bg()
    draw = ImageDraw.Draw(img)

    BW, BH = 880, 620
    BX, BY = (SIZE - BW) // 2, (SIZE - BH) // 2 - 20
    CHROME = 44

    shadow_rect(img, [BX, BY, BX + BW, BY + BH], 18)
    draw.rounded_rectangle([BX, BY, BX + BW, BY + BH], radius=18, fill=SLATE9, outline=(30, 41, 59), width=1)
    browser_chrome(draw, BX, BY, BW, chrome_h=CHROME, url="portfolio.design")

    CY = BY + CHROME
    fn_bold = load_font(FONT_BOLD, 15)
    fn_reg  = load_font(FONT_REGULAR, 12)
    fn_sm   = load_font(FONT_REGULAR, 10)

    # Navbar dark
    draw.rectangle([BX, CY, BX + BW, CY + 52], fill=(15, 23, 42))
    draw.text((BX + 24, CY + 16), "Studio.io", fill=WHITE, font=fn_bold)
    for i, label in enumerate(["Work", "About", "Process", "Contact"]):
        draw.text((BX + 150 + i * 110, CY + 18), label, fill=SLATE5, font=fn_reg)
    draw.rounded_rectangle([BX + BW - 120, CY + 12, BX + BW - 24, CY + 40],
                            radius=14, fill=INDIGO)
    draw.text((BX + BW - 108, CY + 18), "Hire me ✦", fill=WHITE,
              font=load_font(FONT_REGULAR, 10))

    # Hero tagline
    HY = CY + 52
    draw.rectangle([BX, HY, BX + BW, HY + 120], fill=(15, 23, 42))
    draw.text((BX + 36, HY + 14), "Selected", fill=SLATE5,
              font=load_font(FONT_REGULAR, 12))
    draw.text((BX + 36, HY + 34), "Work — 2024", fill=WHITE,
              font=load_font(FONT_BOLD, 32))
    draw.text((BX + 36, HY + 82), "Digital design · Branding · Web development",
              fill=(99, 102, 241), font=fn_reg)

    # Masonry-like project grid
    PY = HY + 128
    proj_colors = [
        ((99, 102, 241), "Brand Identity", "Fintech startup"),
        ((14, 165, 233), "Web Platform", "SaaS product"),
        ((168, 85, 247), "Mobile App", "Health & Wellness"),
        ((34, 197, 94),  "E-commerce", "Fashion brand"),
        ((245, 158, 11), "Dashboard", "Analytics tool"),
        ((244, 63, 94),  "Landing Page", "Creative agency"),
    ]
    cols = [(0, 285), (289, 574), (578, BW - BX + BX)]
    row_h = [180, 140]
    flat = list(range(6))
    for pi, idx in enumerate(flat):
        col_i = pi % 3
        row_i = pi // 3
        px = BX + col_i * 289 + 4
        py = PY + row_i * (row_h[0] + 4)
        pw = 281
        ph = row_h[row_i % 2]
        col, title, sub = proj_colors[idx]
        draw.rounded_rectangle([px, py, px + pw, py + ph], radius=10, fill=(22, 31, 48))
        gradient_rect(draw, px, py, px + pw, py + int(ph * 0.7), col,
                      (col[0] // 2, col[1] // 2, col[2] // 2))
        # overlay
        draw.rounded_rectangle([px, py + ph - 50, px + pw, py + ph], radius=10,
                                fill=(15, 23, 42))
        draw.text((px + 10, py + ph - 44), title, fill=WHITE,
                  font=load_font(FONT_BOLD, 12))
        draw.text((px + 10, py + ph - 26), sub, fill=SLATE5, font=fn_sm)
        # arrow
        draw.text((px + pw - 26, py + ph - 38), "↗", fill=col,
                  font=load_font(FONT_BOLD, 16))

    img.save(out_path, "PNG", optimize=True)
    print(f"✓ {out_path}")


# ─── Mockup 5 – Mobiele weergave (phone frame) ────────────────────────────────
def mockup_mobile(out_path: str):
    img = canvas_bg()
    draw = ImageDraw.Draw(img)

    # Phone content area
    PW, PH = 360, 740
    PX = (SIZE - PW) // 2
    PY = (SIZE - PH) // 2

    fn_bold = load_font(FONT_BOLD, 15)
    fn_reg  = load_font(FONT_REGULAR, 12)
    fn_sm   = load_font(FONT_REGULAR, 10)
    fn_xl   = load_font(FONT_BOLD, 20)

    # Phone frame first (background layer)
    shadow_rect(img, [PX - 14, PY - 56, PX + PW + 14, PY + PH + 56], 46, alpha_max=90)

    # Screen content
    # status bar
    screen = Image.new("RGB", (PW, PH), WHITE)
    sd = ImageDraw.Draw(screen)
    gradient_rect(sd, 0, 0, PW, PH, WHITE, (240, 242, 255))

    # Status bar
    sd.rectangle([0, 0, PW, 40], fill=(248, 248, 252))
    sd.text((14, 12), "9:41", fill=SLATE9, font=load_font(FONT_BOLD, 12))
    sd.text((PW - 60, 12), "●●●●●", fill=SLATE9, font=load_font(FONT_REGULAR, 8))

    # Mobile nav
    sd.rectangle([0, 40, PW, 88], fill=WHITE)
    sd.line([(0, 88), (PW, 88)], fill=SLATE2, width=1)
    sd.text((14, 54), "SonicRoutes", fill=INDIGO, font=load_font(FONT_BOLD, 16))
    # Hamburger
    for hi in range(3):
        hy = 54 + hi * 9
        sd.rounded_rectangle([PW - 36, hy, PW - 16, hy + 3], radius=1, fill=SLATE7)

    # Hero
    gradient_rect(sd, 0, 88, PW, 240, (238, 242, 255), (224, 231, 255))
    sd.text((14, 104), "Jouw website.\nSnel. Strak. Gevonden.", fill=SLATE9,
            font=load_font(FONT_BOLD, 18))
    sd.text((14, 168), "Wij bouwen websites die converteren.", fill=SLATE5, font=fn_sm)
    sd.rounded_rectangle([14, 192, 180, 224], radius=22, fill=INDIGO)
    sd.text((30, 200), "Bekijk ons werk →", fill=WHITE, font=load_font(FONT_BOLD, 11))

    # Services list
    SY = 252
    sd.text((14, SY), "Onze diensten", fill=SLATE9, font=load_font(FONT_BOLD, 13))
    service_items = [
        (INDIGO,   "Website op maat"),
        (GREEN,    "Webshop ontwikkeling"),
        (PURPLE,   "SEO Optimalisatie"),
        (AMBER,    "Onderhoud & Hosting"),
    ]
    for si, (col, label) in enumerate(service_items):
        iy = SY + 30 + si * 52
        sd.rounded_rectangle([14, iy, PW - 14, iy + 44], radius=10,
                              fill=WHITE, outline=SLATE2, width=1)
        sd.rounded_rectangle([24, iy + 10, 44, iy + 34], radius=6, fill=col)
        sd.text((56, iy + 14), label, fill=SLATE9, font=fn_bold)
        sd.text((PW - 26, iy + 14), "›", fill=SLATE5, font=fn_bold)

    # CTA card
    CTA_Y = SY + 30 + 4 * 52 + 8
    gradient_rect(sd, 14, CTA_Y, PW - 14, CTA_Y + 90, INDIGO, PURPLE)
    sd.rounded_rectangle([14, CTA_Y, PW - 14, CTA_Y + 90], radius=14, fill=None)
    sd.text((28, CTA_Y + 14), "Gratis offerte?", fill=WHITE, font=load_font(FONT_BOLD, 15))
    sd.text((28, CTA_Y + 36), "Plan een gratis gesprek van 15 min.", fill=(199, 210, 254),
            font=fn_sm)
    sd.rounded_rectangle([28, CTA_Y + 56, PW - 28, CTA_Y + 80], radius=12,
                         fill=WHITE)
    sd.text((70, CTA_Y + 62), "Plan gesprek →", fill=INDIGO,
            font=load_font(FONT_BOLD, 11))

    # Bottom nav bar
    BNY = PH - 60
    sd.rectangle([0, BNY, PW, PH], fill=WHITE)
    sd.line([(0, BNY), (PW, BNY)], fill=SLATE2, width=1)
    for ni, (icon, label) in enumerate([("⌂", "Home"), ("☰", "Diensten"),
                                         ("✉", "Contact"), ("★", "Reviews")]):
        nx = 30 + ni * 80
        col_ = INDIGO if ni == 0 else SLATE5
        sd.text((nx, BNY + 10), icon, fill=col_, font=load_font(FONT_BOLD, 16))
        sd.text((nx - 4, BNY + 32), label, fill=col_, font=fn_sm)

    # Draw phone frame first (background), then paste screen inside
    shadow_rect(img, [PX - 14, PY - 56, PX + PW + 14, PY + PH + 56], 46, alpha_max=90)
    frame_draw = ImageDraw.Draw(img)
    # Outer body
    frame_draw.rounded_rectangle([PX - 14, PY - 56, PX + PW + 14, PY + PH + 56],
                                  radius=46, fill=(30, 30, 35), outline=(55, 55, 60), width=2)
    # Side buttons
    for by in [PY + 60, PY + 110, PY + 160]:
        frame_draw.rounded_rectangle([PX - 20, by, PX - 15, by + 40], radius=3, fill=(50, 50, 55))
    frame_draw.rounded_rectangle([PX + PW + 15, PY + 90, PX + PW + 20, PY + 150],
                                  radius=3, fill=(50, 50, 55))
    # Outer bezel ring
    frame_draw.rounded_rectangle([PX - 8, PY - 48, PX + PW + 8, PY + PH + 48],
                                  radius=38, fill=(18, 18, 22))

    # Paste screen content (AFTER bezel so it sits on top of dark frame interior)
    img.paste(screen, (PX, PY))

    # Draw notch + home indicator on top of screen
    top_draw = ImageDraw.Draw(img)
    ni_w, ni_h = 100, 22
    ni_x = PX + (PW - ni_w) // 2
    top_draw.rounded_rectangle([ni_x, PY - 38, ni_x + ni_w, PY - 16], radius=11, fill=(10, 10, 14))
    bar_y = PY + PH + 28
    top_draw.rounded_rectangle([PX + PW // 2 - 50, bar_y, PX + PW // 2 + 50, bar_y + 4],
                                radius=2, fill=(80, 80, 85))

    img.save(out_path, "PNG", optimize=True)
    print(f"✓ {out_path}")


# ─── Main ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    mockup_webshop(   f"{OUT_DIR}/mockup-1.png")
    mockup_bedrijfssite(f"{OUT_DIR}/mockup-2.png")
    mockup_diensten(  f"{OUT_DIR}/mockup-3.png")
    mockup_portfolio( f"{OUT_DIR}/mockup-4.png")
    mockup_mobile(    f"{OUT_DIR}/mockup-5.png")
    print("\nAlle mockups gegenereerd!")
