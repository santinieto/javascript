import json
import random
from faker import Faker

# Crear una instancia de Faker
fake = Faker()

# Lista de imágenes de ejemplo
images = [
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6",
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6",
    "https://images.unsplash.com/photo-1531973968078-9bb02785f30e",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
]

# Función para cargar usuarios desde un archivo JSON
def load_users(filename="test_users.json"):
    with open(filename, "r") as json_file:
        users = json.load(json_file)
    return users

# Función para generar posts para los usuarios
def generate_posts(users, min_posts=1, max_posts=5):
    posts = []
    post_id = 1000  # ID inicial para los posts

    for user in users:
        # Número aleatorio de posts por usuario
        num_posts = random.randint(min_posts, max_posts) 
        
        for _ in range(num_posts):  # Genera múltiples posts por usuario
            post = {
                "id": post_id,
                "username": user["name"][0].lower() + user["surname"].lower(),
                "email": fake.email(),
                "tel": user["tel"],
                "content": fake.sentence(),
                "img": random.choice(images) if random.choice([True, False]) else "",  # Asignar imagen aleatoriamente
                "date": fake.iso8601()
            }
            posts.append(post)
            post_id += 1

    return posts

# Función para guardar los posts generados en un archivo JSON
def save_posts_to_json(posts, filename="test_posts.json"):
    with open(filename, "w") as json_file:
        json.dump(posts, json_file, indent=4)
    print(f"Archivo JSON de posts generado correctamente: {filename}")

if __name__ == "__main__":
    # Cargar usuarios desde el archivo test_users.json
    users = load_users()

    # Generar posts para los usuarios con un número aleatorio en un rango definido
    posts = generate_posts(users, min_posts=0, max_posts=20)

    # Guardar los posts generados en un archivo JSON
    save_posts_to_json(posts)
