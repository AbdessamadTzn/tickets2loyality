from fastapi import FastAPI, UploadFile, File
from paddleocr import PaddleOCR
import cv2
import numpy as np

app = FastAPI()
ocr_model = PaddleOCR(use_angle_cls=True, lang='fr')

@app.post("/ocr")
async def perform_ocr(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    result = ocr_model.ocr(img, cls=True)

    extracted_text = "\n".join([line[1][0] for line in result[0]])

    return {"text": extracted_text}
