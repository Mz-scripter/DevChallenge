#!/usr/bin/env bash
# Exit on error
set -o errexit

pip install -r requirements.txt

# Convert static assets files
python manage.py collectstatic --noinput

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

python create_superuser.py