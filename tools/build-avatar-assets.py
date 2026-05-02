from pathlib import Path
import re

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
AVATAR_DIR = ROOT / "assets" / "avatar"
PRESET_DIR = AVATAR_DIR / "presets"
THUMB_DIR = AVATAR_DIR / "thumbs"
DATA_PATH = ROOT / "game-data.js"
CANVAS = 256
VERSION = "20260502-030"

SKINS = {
    "base-m": {"label": "남자 기본", "skin": "#f0ad7d", "shade": "#c97752"},
    "base-f": {"label": "여자 기본", "skin": "#f2b287", "shade": "#c97856"},
    "warm": {"label": "웜톤", "skin": "#dc8f62", "shade": "#a95e42"},
    "cool": {"label": "쿨톤", "skin": "#f6c0a0", "shade": "#cf8768"},
    "tan": {"label": "태닝", "skin": "#b96f4c", "shade": "#804431"},
    "porcelain": {"label": "포슬린", "skin": "#ffd0b1", "shade": "#d98f71"},
}

HAIR = {
    "short": {"main": "#1c315f", "shade": "#0e172b", "hi": "#4e82d8", "style": "short"},
    "wolf-black": {"main": "#171820", "shade": "#07080c", "hi": "#4a4d5c", "style": "wolf"},
    "comma-brown": {"main": "#513223", "shade": "#24140e", "hi": "#9a6747", "style": "comma"},
    "wine-wave": {"main": "#9d1f45", "shade": "#4b0d20", "hi": "#e34d6e", "style": "wave"},
    "center-part": {"main": "#15171c", "shade": "#06070a", "hi": "#565b68", "style": "center"},
    "spike-brown": {"main": "#93562b", "shade": "#3d1f10", "hi": "#db8a42", "style": "spike"},
    "silver": {"main": "#d8e5ff", "shade": "#6f7f9b", "hi": "#ffffff", "style": "center"},
    "mint-twin": {"main": "#4de0bd", "shade": "#177b6b", "hi": "#b5fff0", "style": "twin"},
    "pink-bang": {"main": "#ff8fb3", "shade": "#9c3a63", "hi": "#ffd1df", "style": "bang"},
    "gold-tail": {"main": "#ffd166", "shade": "#9a6422", "hi": "#fff0a8", "style": "tail"},
    "violet": {"main": "#9b7bff", "shade": "#493390", "hi": "#dccfff", "style": "wolf"},
    "ash-blue": {"main": "#6aa7ff", "shade": "#284b82", "hi": "#c8e0ff", "style": "center"},
    "hime-black": {"main": "#111318", "shade": "#050609", "hi": "#555866", "style": "hime"},
    "bob-coral": {"main": "#ff6f7f", "shade": "#913341", "hi": "#ffc1ca", "style": "bob"},
    "long-ash": {"main": "#c9d6e8", "shade": "#637386", "hi": "#ffffff", "style": "long"},
    "two-tone": {"main": "#1a1d23", "shade": "#07080b", "hi": "#ff4d6d", "style": "two"},
}

TOPS = {
    "stage-black": {"main": "#20232b", "shade": "#090a0d", "trim": "#ff4d6d", "inner": "#111318"},
    "v01d-red": {"main": "#15171c", "shade": "#07080b", "trim": "#b51d2a", "inner": "#9d1f28"},
    "white-vocal": {"main": "#f0f2f6", "shade": "#a8b0c2", "trim": "#20232b", "inner": "#111318"},
    "yellow-plaid": {"main": "#ffd166", "shade": "#9a6422", "trim": "#20232b", "inner": "#161820"},
    "stripe-bass": {"main": "#111318", "shade": "#06070a", "trim": "#ff4d6d", "inner": "#ff4d6d"},
    "school": {"main": "#e8eef8", "shade": "#8da1c2", "trim": "#6aa7ff", "inner": "#ffffff"},
    "street": {"main": "#b8f35f", "shade": "#5e8b28", "trim": "#20232b", "inner": "#162016"},
    "varsity": {"main": "#4de0bd", "shade": "#16826e", "trim": "#f7f3ea", "inner": "#111318"},
    "royal": {"main": "#ffd166", "shade": "#9a6422", "trim": "#7c1d2d", "inner": "#171015"},
    "denim": {"main": "#4f7fbf", "shade": "#243b60", "trim": "#f7f3ea", "inner": "#111318"},
    "techwear": {"main": "#28243d", "shade": "#0c0b16", "trim": "#9b7bff", "inner": "#111318"},
    "holo-stage": {"main": "#4de0bd", "shade": "#1b5f70", "trim": "#9b7bff", "inner": "#12151f"},
}

PANTS = {
    "underwear": {"main": "#f7f3ea", "shade": "#b9b0a0", "kind": "short"},
    "black-skinny": {"main": "#17191f", "shade": "#06070a", "kind": "skinny"},
    "ripped-black": {"main": "#20232b", "shade": "#07080b", "kind": "ripped"},
    "denim-blue": {"main": "#315d93", "shade": "#132b4a", "kind": "denim"},
    "cargo": {"main": "#4a4a3e", "shade": "#24251f", "kind": "cargo"},
    "stage-leather": {"main": "#101114", "shade": "#030304", "kind": "leather"},
    "pleats": {"main": "#252a36", "shade": "#10131b", "kind": "skirt"},
    "holo": {"main": "#5966c9", "shade": "#28306f", "kind": "holo"},
}

SHOES = {
    "bare": {"main": "#f7f3ea", "shade": "#d3c5b2"},
    "black-boots": {"main": "#101114", "shade": "#030304"},
    "white-sneakers": {"main": "#f1f4f8", "shade": "#9ba5b8"},
    "red-boots": {"main": "#b51d2a", "shade": "#4b0b12"},
    "platform": {"main": "#252a36", "shade": "#08090d"},
    "holo": {"main": "#4de0bd", "shade": "#176b5c"},
}

ITEMS = ["lightstick", "mic", "photocard", "drumstick", "keytar", "guitar-pick", "bass-pick", "camera"]
PRESETS = [
    "wolf-guitar", "red-drummer", "ash-keyboard", "blond-bass", "pink-vocal", "stripe-bass",
    "silver-mic", "hime-stage", "mint-fan", "purple-guitar", "gold-vocal", "techwear",
]


def new():
    return Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))


def rect(draw, box, fill, outline="#2a1710", width=0):
    draw.rectangle(box, fill=fill, outline=outline if width else None, width=width)


def poly(draw, points, fill, outline="#2a1710"):
    draw.polygon(points, fill=fill, outline=outline)


def ellipse(draw, box, fill, outline="#2a1710", width=2):
    draw.ellipse(box, fill=fill, outline=outline, width=width)


def save(kind, item_id, image, assets):
    path = AVATAR_DIR / f"{kind}-{item_id}.png"
    thumb_path = THUMB_DIR / f"{kind}-{item_id}.png"
    image.save(path)
    make_thumb(image).save(thumb_path)
    assets[f"{kind}:{item_id}"] = {
        "asset": f"./assets/avatar/{kind}-{item_id}.png?v={VERSION}",
        "thumb": f"./assets/avatar/thumbs/{kind}-{item_id}.png?v={VERSION}",
    }


def make_thumb(image):
    bbox = image.getchannel("A").getbbox()
    out = new()
    if not bbox:
        return out
    part = image.crop(bbox)
    scale = min(208 / part.width, 208 / part.height)
    resized = part.resize((round(part.width * scale), round(part.height * scale)), Image.Resampling.NEAREST)
    out.alpha_composite(resized, ((CANVAS - resized.width) // 2, (CANVAS - resized.height) // 2))
    return out


def draw_body(skin="#f0ad7d", shade="#c97752"):
    img = new()
    d = ImageDraw.Draw(img)
    # neck and hidden torso anchor
    rect(d, (116, 101, 140, 132), skin, "#5a2d1f", 2)
    rect(d, (104, 125, 152, 176), skin, "#5a2d1f", 2)
    # legs as true bottom skin fallback
    rect(d, (106, 166, 124, 221), skin, "#5a2d1f", 2)
    rect(d, (132, 166, 150, 221), skin, "#5a2d1f", 2)
    rect(d, (109, 218, 125, 226), shade)
    rect(d, (132, 218, 148, 226), shade)
    return img


def draw_face(skin="#f0ad7d", shade="#c97752"):
    img = new()
    d = ImageDraw.Draw(img)
    ellipse(d, (80, 36, 176, 126), skin, "#3d2117", 3)
    rect(d, (101, 28, 155, 46), skin)
    # ears
    ellipse(d, (72, 72, 88, 98), skin, "#3d2117", 2)
    ellipse(d, (168, 72, 184, 98), skin, "#3d2117", 2)
    rect(d, (79, 96, 177, 121), shade)
    rect(d, (82, 91, 174, 118), skin)
    # eyes and mouth are baked into face until we have source-quality eye sheets.
    for x in (104, 142):
        rect(d, (x, 76, x + 13, 96), "#1e120f")
        rect(d, (x + 3, 78, x + 10, 94), "#6a3d22")
        rect(d, (x + 3, 78, x + 6, 82), "#fff2d4")
    rect(d, (100, 71, 120, 74), "#2c1812")
    rect(d, (138, 71, 158, 74), "#2c1812")
    rect(d, (122, 105, 134, 107), "#a8444f")
    rect(d, (125, 108, 131, 109), "#6d2730")
    return img


def hair_points(style):
    base = [(82, 56), (92, 34), (116, 24), (142, 25), (166, 42), (176, 68), (169, 102), (145, 118), (112, 116), (87, 100)]
    if style == "short":
        return base + [(99, 34), (105, 18), (118, 34), (135, 18), (142, 35), (158, 29), (151, 47)]
    if style == "wolf":
        return [(80, 55), (91, 30), (112, 26), (121, 13), (135, 30), (154, 20), (169, 44), (182, 65), (170, 117), (151, 102), (137, 127), (126, 108), (106, 128), (100, 106), (82, 116)]
    if style == "wave":
        return [(78, 58), (87, 36), (105, 21), (125, 29), (139, 18), (154, 33), (171, 38), (180, 65), (169, 110), (154, 119), (139, 106), (126, 122), (112, 107), (94, 116), (83, 91)]
    if style == "center":
        return [(81, 59), (93, 35), (113, 22), (127, 38), (143, 22), (164, 36), (176, 62), (168, 111), (143, 104), (128, 62), (111, 104), (88, 111)]
    if style == "spike":
        return [(78, 62), (89, 35), (103, 42), (111, 15), (124, 38), (137, 13), (145, 42), (163, 28), (180, 62), (168, 106), (146, 99), (132, 119), (120, 100), (99, 115), (91, 96)]
    if style == "twin":
        return base + [(70, 86), (60, 130), (92, 118), (186, 86), (196, 130), (164, 118)]
    if style == "hime":
        return [(78, 55), (88, 33), (113, 24), (128, 28), (143, 24), (168, 33), (178, 55), (178, 122), (154, 122), (154, 65), (128, 50), (102, 65), (102, 122), (78, 122)]
    if style == "bob":
        return [(80, 58), (94, 34), (116, 25), (140, 25), (164, 34), (178, 58), (176, 116), (80, 116)]
    if style == "long":
        return [(78, 56), (94, 30), (120, 22), (138, 22), (164, 31), (180, 58), (184, 146), (154, 132), (128, 152), (102, 132), (72, 146)]
    if style == "tail":
        return base + [(168, 72), (206, 82), (196, 129), (164, 116)]
    if style == "bang":
        return base + [(88, 52), (110, 42), (105, 90), (126, 44), (132, 92), (148, 42), (166, 54)]
    if style == "two":
        return base + [(122, 22), (126, 100), (146, 24), (160, 64)]
    if style == "comma":
        return base + [(100, 35), (128, 42), (112, 92), (144, 38), (164, 62)]
    return base


def draw_hair(spec):
    img = new()
    d = ImageDraw.Draw(img)
    pts = hair_points(spec["style"])
    poly(d, pts, spec["shade"], "#16100d")
    inner = [(x, y + 5) for x, y in pts if 70 < x < 186]
    if len(inner) > 2:
        poly(d, inner, spec["main"], "#16100d")
    for x, y in [(101, 43), (124, 35), (148, 44)]:
        rect(d, (x, y, x + 14, y + 4), spec["hi"])
    if spec["style"] == "two":
        poly(d, [(128, 28), (150, 36), (158, 93), (135, 84)], spec["hi"], "#16100d")
    # Keep the face readable: hair owns cap, bangs, and side locks only.
    d.rounded_rectangle((92, 58, 164, 117), radius=22, fill=(0, 0, 0, 0))
    bang_sets = {
        "short": [(92, 50, 116, 84), (114, 47, 132, 79), (135, 48, 162, 84)],
        "wolf": [(88, 48, 113, 90), (116, 42, 132, 82), (138, 47, 169, 91)],
        "wave": [(86, 48, 116, 89), (112, 43, 137, 81), (136, 47, 170, 86)],
        "center": [(91, 48, 119, 83), (137, 48, 165, 83)],
        "spike": [(87, 50, 112, 83), (118, 42, 132, 78), (141, 49, 170, 84)],
        "twin": [(90, 49, 119, 86), (135, 49, 166, 86)],
        "hime": [(86, 50, 111, 92), (145, 50, 170, 92)],
        "bob": [(88, 51, 118, 89), (137, 51, 168, 89)],
        "long": [(86, 50, 116, 92), (140, 50, 172, 92)],
        "tail": [(90, 50, 118, 85), (137, 50, 166, 85)],
        "bang": [(88, 49, 113, 91), (113, 43, 132, 91), (137, 49, 169, 91)],
        "two": [(90, 50, 118, 86), (137, 48, 168, 86)],
        "comma": [(90, 50, 127, 93), (139, 49, 167, 83)],
    }
    for points in bang_sets.get(spec["style"], bang_sets["short"]):
        x1, y1, x2, y2 = points
        poly(d, [(x1, y1), ((x1 + x2) // 2, y2), (x2, y1 + 4)], spec["main"], "#16100d")
        rect(d, (x1 + 6, y1 + 4, min(x2 - 5, x1 + 18), y1 + 7), spec["hi"])
    return img


def draw_top(spec, skin="#f0ad7d", shade="#c97752"):
    img = new()
    d = ImageDraw.Draw(img)
    # arms and hands belong to top so sleeve/hand silhouettes match the outfit.
    rect(d, (78, 124, 101, 178), spec["main"], "#15100e", 3)
    rect(d, (155, 124, 178, 178), spec["main"], "#15100e", 3)
    ellipse(d, (78, 174, 101, 197), skin, "#4a2418", 2)
    ellipse(d, (155, 174, 178, 197), skin, "#4a2418", 2)
    rect(d, (100, 111, 156, 184), spec["main"], "#15100e", 3)
    poly(d, [(105, 111), (128, 133), (151, 111), (146, 184), (110, 184)], spec["inner"], "#15100e")
    rect(d, (96, 116, 108, 180), spec["trim"])
    rect(d, (148, 116, 160, 180), spec["trim"])
    rect(d, (118, 135, 138, 139), spec["trim"])
    rect(d, (120, 158, 136, 162), spec["trim"])
    rect(d, (108, 184, 148, 193), spec["shade"])
    return img


def draw_pants(spec):
    img = new()
    d = ImageDraw.Draw(img)
    main, shade = spec["main"], spec["shade"]
    if spec["kind"] == "skirt":
        poly(d, [(101, 178), (155, 178), (170, 218), (86, 218)], main, "#111")
        rect(d, (104, 176, 152, 188), shade)
        for x in (104, 122, 140, 158):
            rect(d, (x, 188, x + 4, 218), shade)
        return img
    rect(d, (99, 174, 157, 193), main, "#111", 3)
    rect(d, (101, 188, 124, 228), main, "#111", 3)
    rect(d, (132, 188, 155, 228), main, "#111", 3)
    rect(d, (124, 188, 132, 204), "#101114")
    rect(d, (106, 194, 121, 198), shade)
    rect(d, (135, 194, 150, 198), shade)
    if spec["kind"] == "cargo":
        rect(d, (91, 199, 108, 216), shade, "#111", 2)
        rect(d, (148, 199, 165, 216), shade, "#111", 2)
    if spec["kind"] == "ripped":
        rect(d, (109, 206, 121, 212), "#f0ad7d")
        rect(d, (136, 199, 148, 205), "#f0ad7d")
    if spec["kind"] == "holo":
        rect(d, (111, 194, 121, 223), "#8fd7ff")
        rect(d, (137, 194, 147, 223), "#9b7bff")
    return img


def draw_shoes(spec):
    img = new()
    d = ImageDraw.Draw(img)
    main, shade = spec["main"], spec["shade"]
    rect(d, (96, 223, 126, 238), main, "#111", 3)
    rect(d, (130, 223, 160, 238), main, "#111", 3)
    rect(d, (90, 235, 126, 244), shade, "#111", 2)
    rect(d, (130, 235, 166, 244), shade, "#111", 2)
    rect(d, (103, 226, 118, 229), "#ffffff")
    rect(d, (138, 226, 153, 229), "#ffffff")
    return img


def draw_item(item_id):
    img = new()
    d = ImageDraw.Draw(img)
    if item_id == "none":
        return img
    if item_id in {"lightstick", "mic"}:
        rect(d, (170, 150, 180, 215), "#1b1d24", "#07080a", 2)
        ellipse(d, (154, 126, 196, 168), "#9b7bff" if item_id == "lightstick" else "#d7dde8", "#20232b", 3)
        rect(d, (164, 139, 186, 145), "#ffffff")
    elif item_id == "photocard":
        rect(d, (164, 138, 198, 188), "#f7f3ea", "#20232b", 3)
        rect(d, (170, 146, 192, 166), "#6aa7ff")
    elif item_id in {"drumstick", "guitar-pick", "bass-pick"}:
        poly(d, [(166, 146), (173, 144), (198, 214), (191, 216)], "#d8a35a", "#5e371f")
    elif item_id == "keytar":
        poly(d, [(150, 154), (204, 166), (194, 202), (142, 190)], "#4de0bd", "#111")
        rect(d, (160, 168, 190, 176), "#111")
    elif item_id == "camera":
        rect(d, (158, 148, 204, 186), "#20232b", "#050609", 3)
        ellipse(d, (174, 156, 194, 176), "#6aa7ff", "#050609", 2)
    return img


def build_assets():
    AVATAR_DIR.mkdir(parents=True, exist_ok=True)
    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    assets = {}
    for item_id, spec in SKINS.items():
        save("body", item_id, draw_body(spec["skin"], spec["shade"]), assets)
        save("face", item_id, draw_face(spec["skin"], spec["shade"]), assets)
    for item_id, spec in HAIR.items():
        save("hair", item_id, draw_hair(spec), assets)
    base_skin = SKINS["base-m"]
    for item_id, spec in TOPS.items():
        save("top", item_id, draw_top(spec, base_skin["skin"], base_skin["shade"]), assets)
    for item_id, spec in PANTS.items():
        save("pants", item_id, draw_pants(spec), assets)
    for item_id, spec in SHOES.items():
        save("shoes", item_id, draw_shoes(spec), assets)
    for item_id in ITEMS:
        save("item", item_id, draw_item(item_id), assets)
    save("item", "none", new(), assets)
    return assets


def build_presets():
    PRESET_DIR.mkdir(parents=True, exist_ok=True)
    combos = [
        ("wolf-black", "base-m", "stage-black", "black-skinny", "black-boots", "guitar-pick"),
        ("wine-wave", "base-m", "v01d-red", "black-skinny", "black-boots", "drumstick"),
        ("silver", "base-m", "white-vocal", "denim-blue", "white-sneakers", "keytar"),
        ("gold-tail", "base-f", "street", "cargo", "platform", "bass-pick"),
        ("two-tone", "base-m", "stripe-bass", "ripped-black", "red-boots", "mic"),
        ("spike-brown", "base-m", "yellow-plaid", "cargo", "black-boots", "bass-pick"),
        ("center-part", "base-m", "denim", "black-skinny", "white-sneakers", "mic"),
        ("hime-black", "base-f", "royal", "pleats", "platform", "lightstick"),
        ("mint-twin", "base-f", "varsity", "denim-blue", "white-sneakers", "photocard"),
        ("violet", "base-m", "techwear", "stage-leather", "holo", "camera"),
        ("ash-blue", "base-m", "holo-stage", "holo", "platform", "lightstick"),
        ("bob-coral", "base-f", "school", "pleats", "white-sneakers", "photocard"),
    ]
    for name, combo in zip(PRESETS, combos):
        hair, face, top, pants, shoes, item = combo
        skin = SKINS[face]
        layers = [
            draw_body(skin["skin"], skin["shade"]),
            draw_shoes(SHOES[shoes]),
            draw_pants(PANTS[pants]),
            draw_top(TOPS[top], skin["skin"], skin["shade"]),
            draw_face(skin["skin"], skin["shade"]),
            draw_hair(HAIR[hair]),
            draw_item(item),
        ]
        img = new()
        for layer in layers:
            img.alpha_composite(layer)
        img.save(PRESET_DIR / f"{name}.png")


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
    assets = build_assets()
    build_presets()
    update_data(assets)
    print(f"Built {len(assets)} new paper-doll avatar assets and {len(PRESETS)} presets")


if __name__ == "__main__":
    main()
