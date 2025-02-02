import os
import random

ICONS_FOLDER = './icons'

def get_random_icon():
    """Fetch a random programming language icon."""
    icons = [f for f in os.listdir(ICONS_FOLDER) if f.endswith(".svg")]
    if icons:
        return random.choice(icons)
    return None

logo = get_random_icon()
logo_name = logo.split("-")[0]

print(logo)
print(logo_name)
