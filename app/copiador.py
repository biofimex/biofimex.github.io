import os
import shutil

ruta_archivo_origen = r'C:\Users\proto\Desktop\Biófimex Hackathon\biofimex.github.io\app\experimentos\biologia\estudio de la presencia de clorofila en las hojas\styles.css'

carpeta_principal = r'C:\Users\proto\Desktop\Biófimex Hackathon\biofimex.github.io\app\experimentos\biologia'

for ruta_directorio_raiz, directorios, archivos in os.walk(carpeta_principal):
    for directorio in directorios:
        ruta_destino = os.path.join(ruta_directorio_raiz, directorio, os.path.basename(ruta_archivo_origen))
        if not os.path.exists(ruta_destino):
            try:
                shutil.copy2(ruta_archivo_origen, ruta_destino)
                print(f"Archivo copiado en {ruta_destino}")
            except shutil.SameFileError:
                print(f"Error: {ruta_archivo_origen} y {ruta_destino} son el mismo archivo.")
        else:
            print(f"Error: {ruta_destino} ya existe.")
