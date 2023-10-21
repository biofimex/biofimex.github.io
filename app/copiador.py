import os
import shutil

# Ruta del archivo que quieres copiar
ruta_archivo_origen = r'C:\Users\proto\Desktop\Biófimex Hackathon\biofimex.github.io\app\experimentos\plantilla\styles.css'

# Ruta de la carpeta principal donde quieres copiar el archivo a todas las subcarpetas
carpeta_principal = r'C:\Users\proto\Desktop\Biófimex Hackathon\biofimex.github.io\app\experimentos\matemática'

# Recorriendo todas las subcarpetas de la carpeta principal y copiando el archivo en cada una
for ruta_directorio_raiz, directorios, archivos in os.walk(carpeta_principal):
    for directorio in directorios:
        ruta_destino = os.path.join(ruta_directorio_raiz, directorio, os.path.basename(ruta_archivo_origen))
        shutil.copy(ruta_archivo_origen, ruta_destino)
        print(f"Archivo copiado en {ruta_destino}")
