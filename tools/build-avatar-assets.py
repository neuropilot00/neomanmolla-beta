from pathlib import Path
import re

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "source"
AVATAR_DIR = ROOT / "assets" / "avatar"
PRESET_DIR = AVATAR_DIR / "presets"
THUMB_DIR = AVATAR_DIR / "thumbs"
DATA_PATH = ROOT / "game-data.js"
CANVAS = 256
TARGETS = {
    "body": (55, 18, 201, 238),
    "face": (55, 18, 201, 238),
    "hair": (34, 12, 222, 122),
    "eyes": (90, 78, 166, 106),
    "lips": (108, 104, 148, 122),
    "top": (45, 114, 211, 202),
    "pants": (52, 138, 204, 238),
    "shoes": (58, 208, 198, 254),
    "accessory": (72, 54, 184, 118),
    "beauty": (82, 80, 174, 126),
    "item": (150, 132, 238, 236),
}

SHEETS = {
    "body": {
        "file": "avatar-body-sheet.png",
        "cols": 3,
        "ids": ["base-m", "base-f", "warm", "cool", "tan", "porcelain"],
    },
    "face": {
        "file": "avatar-body-sheet.png",
        "cols": 3,
        "ids": ["base-m", "base-f", "warm", "cool", "tan", "porcelain"],
    },
    "hair": {
        "file": "avatar-hair-sheet.png",
        "cols": 4,
        "ids": [
            "wolf-black",
            "short",
            "comma-brown",
            "wine-wave",
            "center-part",
            "spike-brown",
            "silver",
            "mint-twin",
            "two-tone",
            "gold-tail",
            "violet",
            "ash-blue",
            "hime-black",
            "bob-coral",
            "long-ash",
            "pink-bang",
        ],
    },
    "top": {
        "file": "avatar-top-sheet.png",
        "cols": 4,
        "ids": [
            "stage-black",
            "v01d-red",
            "white-vocal",
            "yellow-plaid",
            "stripe-bass",
            "school",
            "street",
            "varsity",
            "royal",
            "denim",
            "techwear",
            "holo-stage",
        ],
    },
    "pants": {
        "file": "avatar-lower-sheet.png",
        "cols": 4,
        "ids": [
            "underwear",
            "black-skinny",
            "ripped-black",
            "denim-blue",
            "cargo",
            "stage-leather",
            "pleats",
            "holo",
        ],
    },
    "shoes": {
        "file": "avatar-lower-sheet.png",
        "cols": 4,
        "offset": 8,
        "ids": ["bare", "black-boots", "white-sneakers", "red-boots", "platform", "holo"],
    },
    "accessory": {
        "file": "avatar-accessory-item-sheet.png",
        "cols": 4,
        "ids": [
            "silver-ear",
            "cross-ear",
            "round-glasses",
            "black-mask",
            "heart-glasses",
            "stage-mic",
        ],
    },
    "beauty": {
        "file": "avatar-accessory-item-sheet.png",
        "cols": 4,
        "offset": 6,
        "ids": ["star", "blush"],
    },
    "eyes": {
        "manual": True,
        "ids": ["soft-brown", "cat-black", "ruby", "aqua", "violet", "sleepy"],
    },
    "lips": {
        "manual": True,
        "ids": ["natural", "coral", "rose", "gloss", "dark"],
    },
    "item": {
        "file": "avatar-accessory-item-sheet.png",
        "cols": 4,
        "offset": 8,
        "ids": ["lightstick", "mic", "photocard", "drumstick", "keytar", "guitar-pick", "bass-pick", "camera"],
    },
}

PRESETS = [
    "wolf-guitar",
    "red-drummer",
    "ash-keyboard",
    "blond-bass",
    "pink-vocal",
    "stripe-bass",
    "silver-mic",
    "hime-stage",
    "mint-fan",
    "purple-guitar",
    "gold-vocal",
    "techwear",
]


def remove_green(image):
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, a = pixels[x, y]
            if g > 130 and r < 120 and b < 120:
                pixels[x, y] = (r, g, b, 0)
    return rgba


def keep_head_only(image):
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            if y > 122:
                r, g, b, a = pixels[x, y]
                pixels[x, y] = (r, g, b, 0)
    return rgba


def make_face_base(image):
    rgba = keep_head_only(image)
    pixels = rgba.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            is_skin = (
                r > 130
                and 58 < g < 222
                and 32 < b < 190
                and r > g + 8
                and g > b
                and (r - b) > 36
            )
            if not is_skin:
                pixels[x, y] = (r, g, b, 0)
    return rgba


def unify_pants_shape(image):
    rgba = image.convert("RGBA")
    bbox = rgba.getchannel("A").getbbox()
    if bbox is None:
        return rgba

    pixels = rgba.load()
    colors = []
    for y in range(max(0, bbox[1]), min(rgba.height, bbox[3])):
        for x in range(max(0, bbox[0]), min(rgba.width, bbox[2])):
            r, g, b, a = pixels[x, y]
            if a > 120:
                colors.append((r, g, b, a))
    if not colors:
        return rgba

    colors.sort(key=lambda c: c[3], reverse=True)
    fill = colors[len(colors) // 3]
    shade = tuple(max(0, int(v * 0.72)) for v in fill[:3]) + (fill[3],)
    draw = ImageDraw.Draw(rgba)
    waist_y = max(136, bbox[1])
    hip_y = min(178, bbox[3])
    left = max(72, bbox[0] - 10)
    right = min(184, bbox[2] + 10)
    draw.rounded_rectangle((left, waist_y, right, waist_y + 18), radius=6, fill=fill)
    draw.rectangle((left + 8, waist_y + 14, right - 8, hip_y), fill=fill)
    draw.line((left + 10, waist_y + 8, right - 10, waist_y + 8), fill=shade, width=2)
    return rgba


def fit_to_target(image, target):
    bbox = image.getchannel("A").getbbox()
    canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    if bbox is None:
        return canvas

    part = image.crop(bbox)
    target_w = target[2] - target[0]
    target_h = target[3] - target[1]
    scale = min(target_w / part.width, target_h / part.height)
    resized = part.resize((round(part.width * scale), round(part.height * scale)), Image.Resampling.LANCZOS)
    x = target[0] + (target_w - resized.width) // 2
    y = target[1] + (target_h - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas


def make_thumb(image):
    bbox = image.getchannel("A").getbbox()
    canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    if bbox is None:
        return canvas
    part = image.crop(bbox)
    scale = min(220 / part.width, 220 / part.height)
    resized = part.resize((round(part.width * scale), round(part.height * scale)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(resized, ((CANVAS - resized.width) // 2, (CANVAS - resized.height) // 2))
    return canvas


def draw_rect(draw, box, color):
    draw.rectangle(box, fill=color)


def manual_face_layer(kind, item_id):
    image = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    if kind == "eyes":
        colors = {
            "soft-brown": ("#2b1a14", "#8a5b3d", "#fff1dc"),
            "cat-black": ("#08090c", "#2f3440", "#f7f3ea"),
            "ruby": ("#3c0710", "#b51d2a", "#ffd1dc"),
            "aqua": ("#073a36", "#20bfae", "#d6fff6"),
            "violet": ("#24124f", "#8166dc", "#efe9ff"),
            "sleepy": ("#121212", "#343842", "#f7f3ea"),
        }
        dark, mid, shine = colors[item_id]
        if item_id == "sleepy":
            draw_rect(draw, (94, 84, 116, 88), dark)
            draw_rect(draw, (140, 84, 162, 88), dark)
            draw_rect(draw, (97, 88, 114, 90), mid)
            draw_rect(draw, (143, 88, 160, 90), mid)
        else:
            for x in (103, 143):
                draw_rect(draw, (x, 79, x + 11, 92), "#1b0f0b")
                draw_rect(draw, (x + 2, 81, x + 9, 91), dark)
                draw_rect(draw, (x + 4, 85, x + 8, 91), mid)
                draw_rect(draw, (x + 3, 81, x + 5, 83), shine)
            draw_rect(draw, (99, 75, 116, 77), "#1b0f0b")
            draw_rect(draw, (140, 75, 157, 77), "#1b0f0b")
    if kind == "lips":
        colors = {
            "natural": ("#d86a70", "#9f3c47"),
            "coral": ("#ff7a72", "#b64a43"),
            "rose": ("#bd4662", "#7a263a"),
            "gloss": ("#ff9ab0", "#bd4662"),
            "dark": ("#7c1d2d", "#3c0710"),
        }
        main, shade = colors[item_id]
        draw_rect(draw, (123, 101, 133, 103), main)
        draw_rect(draw, (125, 104, 131, 105), shade)
        if item_id == "gloss":
            draw_rect(draw, (124, 101, 127, 101), "#ffe3ed")
    return image


def save_layer(kind, item_id, image, assets):
    path = AVATAR_DIR / f"{kind}-{item_id}.png"
    thumb_path = THUMB_DIR / f"{kind}-{item_id}.png"
    image.save(path)
    make_thumb(image).save(thumb_path)
    assets[f"{kind}:{item_id}"] = {
        "asset": f"./assets/avatar/{kind}-{item_id}.png",
        "thumb": f"./assets/avatar/thumbs/{kind}-{item_id}.png",
    }


def extract_sheet(kind, config, assets):
    if config.get("manual"):
        for item_id in config["ids"]:
            save_layer(kind, item_id, manual_face_layer(kind, item_id), assets)
        return
    sheet = Image.open(SOURCE_DIR / config["file"])
    cols = config["cols"]
    rows = (len(config["ids"]) + config.get("offset", 0) + cols - 1) // cols
    cell_w = sheet.width / cols
    cell_h = sheet.height / rows
    for local_index, item_id in enumerate(config["ids"]):
        index = local_index + config.get("offset", 0)
        col = index % cols
        row = index // cols
        crop = sheet.crop((
            round(col * cell_w),
            round(row * cell_h),
            round((col + 1) * cell_w),
            round((row + 1) * cell_h),
        ))
        out = fit_to_target(remove_green(crop), TARGETS[kind])
        if kind == "face":
            out = keep_head_only(out)
        if kind == "pants":
            out = unify_pants_shape(out)
        save_layer(kind, item_id, out, assets)


def extract_presets():
    PRESET_DIR.mkdir(parents=True, exist_ok=True)
    sheet = Image.open(SOURCE_DIR / "v01d-avatar-preset-sheet.png")
    cell_w = sheet.width / 4
    cell_h = sheet.height / 3
    for index, preset in enumerate(PRESETS):
        col = index % 4
        row = index // 4
        crop = sheet.crop((
            round(col * cell_w),
            round(row * cell_h),
            round((col + 1) * cell_w),
            round((row + 1) * cell_h),
        ))
        out = remove_green(crop).resize((CANVAS, CANVAS), Image.Resampling.LANCZOS)
        out.save(PRESET_DIR / f"{preset}.png")


def update_data(assets):
    source = DATA_PATH.read_text()
    lines = []
    current = ""
    for line in source.splitlines():
        category = re.match(r"    ([a-z]+): \[$", line)
        if category:
            current = category.group(1)
        item = re.search(r'\{ id: "([^"]+)"', line)
        if item:
            item_assets = assets.get(f"{current}:{item.group(1)}")
            if item_assets:
                asset = item_assets["asset"]
                thumb = item_assets["thumb"]
                if "asset:" in line:
                    line = re.sub(r'asset: "\./assets/avatar/[^"]+"', f'asset: "{asset}"', line)
                else:
                    line = line.replace(" },", f', asset: "{asset}" }},')
                if "thumb:" in line:
                    line = re.sub(r'thumb: "\./assets/avatar/[^"]+"', f'thumb: "{thumb}"', line)
                else:
                    line = line.replace(" },", f', thumb: "{thumb}" }},')
        lines.append(line)
    DATA_PATH.write_text("\n".join(lines) + "\n")


def main():
    AVATAR_DIR.mkdir(parents=True, exist_ok=True)
    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    assets = {}
    extract_presets()
    for kind, config in SHEETS.items():
        extract_sheet(kind, config, assets)
    update_data(assets)
    print(f"Built {len(assets)} layered avatar assets and {len(PRESETS)} presets")


if __name__ == "__main__":
    main()
