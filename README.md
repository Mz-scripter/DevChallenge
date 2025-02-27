# DevChallenge
DevChallenge is a fast paced programming quiz game where players identify DevIcons from their logos. Compete against other devs and climb the leaderboard.

## Features
    - 1-Minute Gameplay - Identify as many DevIcons as possible within a minute.
    - Leaderboard System - Compete for the highest score.
    - Smooth UX - Built with Django, HTMX and CSS animations for an engaging experirence.
    - Social Sharing - Share your game stats directly to X and Whatsapp.

## 🛠️ Installation & Setup
    1. Clone the Repository
    ```
    git clone https://github.com/Mz-scripter/DevChallenge.git
    cd DevChallenge
    ```
    2. Create a Virtual Environment & Install Dependencies
    ```
    python -m venv venv
    source venv/Scripts/activate
    pip install -r requirements.txt
    ```
    3. Run Database Migrations
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
    4. Run the Development Server
    ```
    python manage.py runserver
    ```

## 🚀 Deployment
DevChallenge can be deployed on Koyeb, Render, or Railway.
    1. Set Environment Variables
    ```
    DEBUG=False
    SECRET_KEY=your-secret-key
    DATABASE_URL=your-postgres-url
    ```
    2. Build & Deploy (Example: Render)
    ```
    git push render main
    ```

## 🤝 Contributing
I welcome contributions! To contribute:
    1. Fork the repo
    2. Create a feature branch (`git checkout -b feature-name`)
    3. Commit your changes (`git commit -m "Added new feature"`)
    4. Push to your fork (`git push origin feature-name`)
    5. Create a Pull Request

