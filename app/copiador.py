import os
import shutil

# Ruta del archivo que quieres copiar
archivo_origen = r"C:\Users\proto\Desktop\Biófimex Hackathon\biofimex.github.io\app\experimentos\biologia\estudio de la presencia de clorofila en las hojas\styles.css"

# Ruta de la carpeta principal donde quieres pegar el archivo en sus subcarpetas
carpeta_principal = r"C:\Users\proto\Desktop\Biófimex Hackathon\biofimex.github.io\app\experimentos\biologia"

# Obtén la lista de todas las subcarpetas dentro de la carpeta principal
subcarpetas = [nombre for nombre in os.listdir(carpeta_principal) if os.path.isdir(os.path.join(carpeta_principal, nombre))]

# Itera sobre cada subcarpeta y pega el archivo
for subcarpeta in subcarpetas:
    ruta_destino = os.path.join(carpeta_principal, subcarpeta, os.path.basename(archivo_origen))
    shutil.copy(archivo_origen, ruta_destino)
    print(f"Archivo copiado a {ruta_destino}.")

print("Proceso completado.")
