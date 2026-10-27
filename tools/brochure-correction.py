import fitz, json, base64
from pathlib import Path
from PIL import Image
from io import BytesIO
out=Path('correction-review')
out.mkdir(exist_ok=True)
doc=fitz.open('promo/dl/brochure/bookie-teacher-proposal-4p.pdf')
report=[]
for i,p in enumerate(doc):
    report.append({'page':i+1,'rect':list(p.rect),'text':p.get_text('dict'),'images':p.get_images()})
    pix=p.get_pixmap(matrix=fitz.Matrix(1.5,1.5), alpha=False)
    im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
    bio=BytesIO(); im.save(bio,format='JPEG',quality=85)
    (out/f'page-{i+1}.b64.txt').write_text(base64.b64encode(bio.getvalue()).decode())
(out/'report.json').write_text(json.dumps(report,ensure_ascii=False,default=str),encoding='utf8')
