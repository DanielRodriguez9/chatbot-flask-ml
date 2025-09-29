import nltk
import os

nltk.data.path.append(os.path.join(os.path.dirname(__file__), "nltk_data"))


nltk.download("punkt", download_dir="./nltk_data")
nltk.download("punkt_tab", download_dir="./nltk_data")

print("Descarga completa ")