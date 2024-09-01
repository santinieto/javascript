import json
from faker import Faker

# Crear una instancia de Faker
fake = Faker()

def generate_users(num_users):
    users = []
    for _ in range(num_users):
        user = {
            "name": fake.first_name(),
            "surname": fake.last_name(),
            "age": fake.random_int(min=12, max=99),
            "tel": fake.phone_number(),
            "password": fake.password(length=8)
        }
        users.append(user)
    return users

def save_to_json(users, filename="test_users.json"):
    with open(filename, "w") as json_file:
        json.dump(users, json_file, indent=4)
    print(f"Archivo JSON generado correctamente: {filename}")

if __name__ == "__main__":
    # Lista basica de usuarios de prueba
    test_users = [
        {"name": "Admin",    "surname": "Admin",     "age": 99, "tel": 9999999999, "password": "admin"},
        {"name": "Santiago", "surname": "Nieto",     "age": 29, "tel": 3512647957, "password": "12345678"},
        {"name": "Juan",     "surname": "Perez",     "age": 22, "tel": 1234567089, "password": "12345678"},
        {"name": "Pedro",    "surname": "Rodriguez", "age": 12, "tel": 2345067890, "password": "12345678"},
        {"name": "Lara",     "surname": "Suarez",    "age": 15, "tel": 3405678901, "password": "12345678"},
        {"name": "Ana",      "surname": "Lopez",     "age": 25, "tel": 4567891203, "password": "12345678"},
    ]
    
    # Define la cantidad de usuarios que quieres generar
    num_users = 10
    users = generate_users(num_users - len(test_users))
    save_to_json(test_users + users)