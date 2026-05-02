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


def remove_skin_from_clothing(image):
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            is_skin = (
                r > 145
                and 72 < g < 220
                and 35 < b < 185
                and r > g + 18
                and g > b + 10
                and (r - b) > 48
            )
            if is_skin:
                pixels[x, y] = (r, g, b, 0)
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
            draw_rect(draw, (94, 90, 116, 94), dark)
            draw_rect(draw, (140, 90, 162, 94), dark)
            draw_rect(draw, (97, 94, 114, 96), mid)
            draw_rect(draw, (143, 94, 160, 96), mid)
        else:
            for x in (96, 140):
                draw_rect(draw, (x, 82, x + 19, 103), "#1b0f0b")
                draw_rect(draw, (x + 3, 84, x + 16, 101), dark)
                draw_rect(draw, (x + 6, 89, x + 14, 101), mid)
                draw_rect(draw, (x + 5, 85, x + 9, 89), shine)
            draw_rect(draw, (92, 78, 118, 81), "#1b0f0b")
            draw_rect(draw, (138, 78, 164, 81), "#1b0f0b")
    if kind == "lips":
        colors = {
            "natural": ("#d86a70", "#9f3c47"),
            "coral": ("#ff7a72", "#b64a43"),
            "rose": ("#bd4662", "#7a263a"),
            "gloss": ("#ff9ab0", "#bd4662"),
            "dark": ("#7c1d2d", "#3c0710"),
        }
        main, shade = colors[item_id]
        draw_rect(draw, (119, 112, 137, 115), main)
        draw_rect(draw, (123, 116, 133, 118), shade)
        if item_id == "gloss":
            draw_rect(draw, (122, 112, 127, 113), "#ffe3ed")
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
        if kind == "top":
            out = remove_skin_from_clothing(out)
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
