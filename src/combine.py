import os
import sys
from PIL import Image

def main():
    if len(sys.argv) != 2:
        print("Uso: python script.py <directorio>")
        sys.exit(1)

    # Obtener el directorio desde los argumentos de la línea de comandos
    directory_name = sys.argv[1]

    # Definir las rutas de los directorios
    base_dir = os.getcwd()
    tienda_dir = os.path.join(base_dir, 'public', 'images', directory_name)
    print(tienda_dir)
    combined_dir = os.path.join(tienda_dir, 'combined')

    # Crear el directorio 'combined' si no existe
    if not os.path.exists(combined_dir):
        os.makedirs(combined_dir)

    # Leer los archivos en el directorio especificado
    file_list = [f for f in os.listdir(tienda_dir) if os.path.isfile(os.path.join(tienda_dir, f))]

    # Filtrar solo archivos de imagen
    image_extensions = ('.png', '.jpg', '.jpeg')
    file_list = [f for f in file_list if f.lower().endswith(image_extensions)]

    # Ordenar los archivos (opcional: puedes ajustar el criterio de ordenación según tus necesidades)
    file_list.sort()

    # Lista para almacenar las imágenes
    images = []

    # Leer y almacenar las imágenes
    for file_name in file_list:
        # log file_name
        print(file_name)
        file_path = os.path.join(tienda_dir, file_name)
        try:
            img = Image.open(file_path)
            images.append(img)
        except Exception as e:
            print(f"Error al abrir la imagen {file_path}: {e}")

    # Concatenar las imágenes verticalmente
    widths, heights = zip(*(i.size for i in images))

    total_width = max(widths)
    total_height = sum(heights)

    combined_image = Image.new('RGB', (total_width, total_height))

    y_offset = 0
    for img in images:
        combined_image.paste(img, (0, y_offset))
        y_offset += img.size[1]

    # Guardar la imagen combinada en el directorio 'combined'
    output_path = os.path.join(combined_dir, 'combined_image.png')
    combined_image.save(output_path)

    print(f'Imagen combinada guardada en: {output_path}')

if __name__ == "__main__":
    main()
