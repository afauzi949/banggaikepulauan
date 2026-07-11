import os
import re
import json
import shutil
import glob

# Paths
REF_ROOT = "/home/ubuntu/project_kkn/banggai_kepualauan"
TARGET_ROOT = "/home/ubuntu/project_kkn/website/website"

INDEX_TS = os.path.join(REF_ROOT, "src", "constant", "index.ts")
KEGIATAN_JSON_DIR = os.path.join(TARGET_ROOT, "data", "kegiatan")
TARGET_IMAGE_DIR = os.path.join(TARGET_ROOT, "public", "images", "kegiatan")

if not os.path.exists(TARGET_IMAGE_DIR):
    os.makedirs(TARGET_IMAGE_DIR)

# 1. Parse all image index.ts to build variable -> file path map
image_var_to_path = {}
for root, dirs, files in os.walk(os.path.join(REF_ROOT, "public", "image")):
    if "index.ts" in files:
        with open(os.path.join(root, "index.ts"), "r", encoding="utf-8") as f:
            content = f.read()
            matches = re.findall(r'import\s+([A-Za-z0-9_]+)\s+from\s+[\'"]\.\/([^\'"]+)[\'"]', content)
            for var_name, filename in matches:
                image_var_to_path[var_name] = {
                    "source": os.path.join(root, filename),
                    "filename": filename
                }

# 2. Parse berita from index.ts
with open(INDEX_TS, "r", encoding="utf-8") as f:
    index_content = f.read()

match = re.search(r'export const berita: Berita\[\] = \[(.*?)\];\n', index_content, re.DOTALL)
if not match:
    print("Could not find berita array")
    exit(1)

array_content = match.group(1)

# Split into individual objects
items_raw = re.findall(r'\{(.*?)\}', array_content, re.DOTALL)
berita_parsed = []

for item_raw in items_raw:
    if "title:" not in item_raw: continue
    
    title_match = re.search(r'title:\s*["\']([^"\']+)["\']', item_raw)
    title = title_match.group(1).strip() if title_match else ""
    
    # extract content array (which will become description)
    content_match = re.search(r'content:\s*\[(.*?)\]', item_raw, re.DOTALL)
    content = ""
    if content_match:
        # split by "," but be careful of quotes. better just to find all quotes.
        c_raw = content_match.group(1)
        paragraphs = re.findall(r'["\'](.*?)["\']', c_raw)
        content = "\n\n".join([p.strip() for p in paragraphs if p.strip()])
    
    # Extract excerpt
    excerpt_match = re.search(r'excerpt:\s*["\']([^"\']+)["\']', item_raw)
    excerpt = excerpt_match.group(1).strip() if excerpt_match else ""
    if not excerpt and content:
        excerpt = content[:250] + "..."
    
    # Extract images
    img_match = re.search(r'images:\s*\[([^\]]+)\]', item_raw)
    images = [img.strip() for img in img_match.group(1).split(',')] if img_match else []
    
    berita_parsed.append({
        "title": title,
        "content": content,
        "excerpt": excerpt,
        "images": [i for i in images if i],
    })

def normalize_title(t):
    return re.sub(r'[^a-z0-9]', '', t.lower())

# 3. Read JSON files and update them
json_files = glob.glob(os.path.join(KEGIATAN_JSON_DIR, "*.json"))

for json_file in json_files:
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    json_title = data.get("title", "")
    norm_json_title = normalize_title(json_title)
    
    match = next((w for w in berita_parsed if normalize_title(w["title"]) == norm_json_title or normalize_title(w["title"]) in norm_json_title or norm_json_title in normalize_title(w["title"])), None)
    
    if match:
        print(f"Updating {json_title} ...")
        data["description"] = match["content"]
        data["excerpt"] = match["excerpt"]
        
        data["images"] = []
        if match["images"]:
            # Copy first image to cover
            first_var = match["images"][0]
            if first_var in image_var_to_path:
                img_info = image_var_to_path[first_var]
                ext = os.path.splitext(img_info["filename"])[1]
                safe_filename = data["slug"] + ext
                dest_path = os.path.join(TARGET_IMAGE_DIR, safe_filename)
                shutil.copy2(img_info["source"], dest_path)
                data["cover"] = f"/images/kegiatan/{safe_filename}"
                print(f"  -> Copied cover image {safe_filename}")
            
            # Copy all images
            for i, var_name in enumerate(match["images"]):
                if var_name in image_var_to_path:
                    img_info = image_var_to_path[var_name]
                    ext = os.path.splitext(img_info["filename"])[1]
                    safe_filename = f"{data['slug']}-{i+1}{ext}"
                    dest_path = os.path.join(TARGET_IMAGE_DIR, safe_filename)
                    shutil.copy2(img_info["source"], dest_path)
                    data["images"].append(f"/images/kegiatan/{safe_filename}")
                    print(f"  -> Copied additional image {safe_filename}")
        
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")
    else:
        print(f"No match found for {json_title}")

print("Done!")
