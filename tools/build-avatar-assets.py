from pathlib import Path
import re

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "source"
AVATAR_DIR = ROOT / "assets" / "avatar"
PRESET_DIR = AVATAR_DIR / "presets"
THUMB_DIR = AVATAR_DIR / "thumbs"
DATA_PATH = ROOT / "game-data.js"
CANVAS = 256
TARGETS = {
    "body": (55, 18, 201, 238),
    "hair": (42, 8, 214, 118),
    "top": (40, 76, 216, 178),
    "pants": (50, 112, 206, 246),
    "shoes": (58, 198, 198, 254),
    "accessory": (64, 42, 192, 120),
    "beauty": (87, 79, 169, 118),
    "item": (148, 88, 238, 218),
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


def extract_sheet(kind, config, assets):
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
        path = AVATAR_DIR / f"{kind}-{item_id}.png"
        thumb_path = THUMB_DIR / f"{kind}-{item_id}.png"
        out.save(path)
        make_thumb(out).save(thumb_path)
        assets[f"{kind}:{item_id}"] = {
            "asset": f"./assets/avatar/{kind}-{item_id}.png",
            "thumb": f"./assets/avatar/thumbs/{kind}-{item_id}.png",
        }


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
