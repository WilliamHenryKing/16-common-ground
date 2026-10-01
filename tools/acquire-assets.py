from pathlib import Path
import urllib.request
import hashlib
import json
import re

root = Path(__file__).resolve().parent.parent
records = []
def save(url, path, **meta):
    req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=45).read()
    dest=root/path
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    records.append({"output":path,"download":url,"retrieved":"2026-10-01","bytes":len(data),"sha256":hashlib.sha256(data).hexdigest(),**meta})
    print(path, len(data))

save("https://images.unsplash.com/photo-1758833600766-d639b70e5f46?fit=crop&w=1100&q=78&fm=webp", "public/images/london.webp", author="Maik Winnecke", source="https://unsplash.com/photos/the-houses-of-parliament-and-big-ben-in-london-v3nbIVKiETU", license="Unsplash License", licenseUrl="https://unsplash.com/license", processing="CDN resize 1100px, WebP quality 78; monochrome CSS crop")
save("https://images.unsplash.com/photo-1773829020694-413e879d2957?fit=crop&w=1000&q=76&fm=webp", "public/images/forum.webp", author="Marwen Larafa", source="https://unsplash.com/photos/speaker-presenting-to-a-large-audience-in-an-auditorium-qzO9a6oQ8AM", license="Unsplash License", licenseUrl="https://unsplash.com/license", processing="CDN resize 1000px, WebP quality 76")
css=urllib.request.urlopen(urllib.request.Request("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"}),timeout=30).read().decode()
font=re.findall(r"url\((https://[^)]+\.woff2)\)",css)[-1]
save(font,"public/fonts/manrope-latin.woff2",author="The Manrope Project Authors",source="https://github.com/google/fonts/tree/main/ofl/manrope",license="SIL OFL 1.1",processing="Unmodified Google Fonts Latin webfont")
save("https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt","public/fonts/OFL-Manrope.txt",license="SIL OFL 1.1")
(root/"assets.manifest.json").write_text(json.dumps({"assets":records},indent=2)+"\n",encoding="utf-8")
