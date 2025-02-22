#!/usr/bin/env bash
set -o errexit  # Stop execution on error

# Ensure Python is correctly set
export PYTHONUNBUFFERED=1
export PATH="/usr/local/bin:$PATH"

# Install dependencies
python3 -m ensurepip --default-pip
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt

# Collect static files
python3 manage.py collectstatic --noinput

# Apply database migrations
python3 manage.py migrate --noinput

# Create superuser (optional)
python3 create_superuser.py || echo "Superuser creation skipped."
