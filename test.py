import os
import random
from DevChallenge.settings import BASE_DIR

ICONS_FOLDER = os.path.join(BASE_DIR, "static/icons")

def get_random_icon():
    icons = [f for f in os.listdir(ICONS_FOLDER) if f.endswith(".svg")]
    if icons:
        return random.choice(icons)
    return None

print(get_random_icon()) # Output: None
