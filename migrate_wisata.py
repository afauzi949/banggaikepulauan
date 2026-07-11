import os
import re
import json
import shutil
import glob

# Paths
REF_ROOT = "/home/ubuntu/project_kkn/banggai_kepualauan"
TARGET_ROOT = "/home/ubuntu/project_kkn/website/website"

INDEX_TS = os.path.join(REF_ROOT, "src", "constant", "index.ts")
WISATA_JSON_DIR = os.path.join(TARGET_ROOT, "data", "wisata")
TARGET_IMAGE_DIR = os.path.join(TARGET_ROOT, "public", "images", "wisata")

if not os.path.exists(TARGET_IMAGE_DIR):
    os.makedirs(TARGET_IMAGE_DIR)

# 1. Parse all image index.ts to build variable -> file path map
image_var_to_path = {}
for root, dirs, files in os.walk(os.path.join(REF_ROOT, "public", "image")):
    if "index.ts" in files:
        with open(os.path.join(root, "index.ts"), "r", encoding="utf-8") as f:
            content = f.read()
            # find imports like: import bubung_babasal from "./DJI_20250622155204_0154_D 1.png";
            matches = re.findall(r'import\s+([A-Za-z0-9_]+)\s+from\s+[\'"]\.\/([^\'"]+)[\'"]', content)
            for var_name, filename in matches:
                # Store the absolute path to the reference image
                rel_dir = os.path.relpath(root, os.path.join(REF_ROOT, "public", "image"))
                image_var_to_path[var_name] = {
                    "source": os.path.join(root, filename),
                    "filename": filename
                }

# 2. Parse wisataDanBudaya from index.ts
with open(INDEX_TS, "r", encoding="utf-8") as f:
    index_content = f.read()

# Extract the wisataDanBudaya array content
match = re.search(r'export const wisataDanBudaya: WisataDanBudaya\[\] = \[(.*?)\];\n', index_content, re.DOTALL)
if not match:
    print("Could not find wisataDanBudaya array")
    exit(1)

array_content = match.group(1)

# Split into individual objects. A crude regex since the structure is fairly flat
items_raw = re.findall(r'\{(.*?)\}', array_content, re.DOTALL)
wisata_data = []

for item_raw in items_raw:
    # extract title
    title_match = re.search(r'title:\s*["\'](.*?)["\']', item_raw)
    title = title_match.group(1) if title_match else None
    
    # extract description
    desc_match = re.search(r'description:\s*[`"\'](.*)[`"\']', item_raw, re.DOTALL)
    # The regex for description is tricky because of backticks and newlines. 
    # Let's use a better approach: split by keys.
    pass

# Better approach for parsing the TS objects:
# Let's write a simple python parser for the JS object string
wisata_parsed = []
current_obj = {}
for item_raw in items_raw:
    if "title:" not in item_raw: continue
    
    title = re.search(r'title:\s*["\']([^"\']+)["\']', item_raw).group(1)
    
    # extract description
    desc_match = re.search(r'description:\s*([`"\'])(.*?)\1', item_raw, re.DOTALL)
    desc = desc_match.group(2).strip() if desc_match else ""
    
    loc_match = re.search(r'location:\s*["\']([^"\']+)["\']', item_raw)
    loc = loc_match.group(1) if loc_match else ""
    
    # Extract tiketMasuk
    tiket_match = re.search(r'tiketMasuk:\s*["\']([^"\']+)["\']', item_raw)
    tiket = tiket_match.group(1) if tiket_match else ""
    
    # Extract nilaiBudaya
    nilai_match = re.search(r'nilaiBudaya:\s*["\']([^"\']+)["\']', item_raw)
    nilai = nilai_match.group(1) if nilai_match else ""
    
    # Extract waktuKunjunganTerbaik
    waktu_match = re.search(r'waktuKunjunganTerbaik:\s*["\']([^"\']+)["\']', item_raw)
    waktu = waktu_match.group(1) if waktu_match else ""
    
    # Extract fasilitas
    fasilitas_match = re.search(r'fasilitas:\s*\[([^\]]+)\]', item_raw)
    fasilitas = []
    if fasilitas_match:
        f_raw = fasilitas_match.group(1).split(',')
        fasilitas = [f.strip(' \n\r"\'') for f in f_raw if f.strip(' \n\r"\'')]
        
    # Extract narahubung
    nara_match = re.search(r'narahubung:\s*\{\s*nama:\s*["\']([^"\']+)["\'],\s*kontak:\s*["\']([^"\']+)["\']\s*\}', item_raw)
    nara = {"nama": nara_match.group(1), "kontak": nara_match.group(2)} if nara_match else None
    
    # find images: [batu_ampa]
    img_match = re.search(r'images:\s*\[([^\]]+)\]', item_raw)
    images = [img.strip() for img in img_match.group(1).split(',')] if img_match else []
    
    coords_match = re.search(r'longitudeLatitude:\s*\[(.*?)\]', item_raw)
    coords = [float(c.strip()) for c in coords_match.group(1).split(',')] if coords_match else []
    
    wisata_parsed.append({
        "title": title,
        "description": desc,
        "location": loc,
        "images": [i for i in images if i],
        "coords": coords,
        "tiketMasuk": tiket,
        "nilaiBudaya": nilai,
        "waktuKunjunganTerbaik": waktu,
        "fasilitas": fasilitas,
        "narahubung": nara
    })

# normalize titles for matching
def normalize_title(t):
    return re.sub(r'[^a-z0-9]', '', t.lower())

# 3. Read JSON files and update them
json_files = glob.glob(os.path.join(WISATA_JSON_DIR, "*.json"))

for json_file in json_files:
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    json_title = data.get("title", "")
    norm_json_title = normalize_title(json_title)
    
    # Find match in parsed data
    match = next((w for w in wisata_parsed if normalize_title(w["title"]) == norm_json_title or normalize_title(w["title"]) in norm_json_title or norm_json_title in normalize_title(w["title"])), None)
    
    if match:
        print(f"Updating {json_title} ...")
        # Update fields
        data["description"] = match["description"]
        data["excerpt"] = match["description"][:150] + "..." if len(match["description"]) > 150 else match["description"]
        
        # Parse location string (e.g. "Desa Bungin, Kec. Tinangkung, Kab. Banggai Kepulauan")
        parts = [p.strip() for p in match["location"].split(',')]
        if len(parts) >= 1: data["location"]["village"] = parts[0]
        if len(parts) >= 2: data["location"]["subdistrict"] = parts[1].replace("Kec. ", "")
        
        if match["coords"] and len(match["coords"]) == 2:
            data["location"]["coordinates"] = [match["coords"][1], match["coords"][0]] # TS array is [long, lat], JSON is [lat, long]
            
        if match["tiketMasuk"]: data["tiketMasuk"] = match["tiketMasuk"]
        if match["nilaiBudaya"]: data["nilaiBudaya"] = match["nilaiBudaya"]
        if match["waktuKunjunganTerbaik"]: data["waktuKunjunganTerbaik"] = match["waktuKunjunganTerbaik"]
        if match["fasilitas"]: data["fasilitas"] = match["fasilitas"]
        if match["narahubung"]: data["narahubung"] = match["narahubung"]
        
        # Copy image and set cover
        if match["images"] and match["images"][0] in image_var_to_path:
            var_name = match["images"][0]
            img_info = image_var_to_path[var_name]
            # Copy file
            ext = os.path.splitext(img_info["filename"])[1]
            safe_filename = var_name + ext
            dest_path = os.path.join(TARGET_IMAGE_DIR, safe_filename)
            shutil.copy2(img_info["source"], dest_path)
            data["cover"] = f"/images/wisata/{safe_filename}"
            print(f"  -> Copied image {safe_filename}")
        
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")
    else:
        print(f"No match found for {json_title}")

print("Done!")
