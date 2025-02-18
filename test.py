import requests

def fetch_random_username():
    try:
        response = requests.get("https://usernameapiv1.vercel.app/api/random-usernames")
        if response.status_code == 200:
            return response.json().get("usernames")[0]
    except Exception as e:
        print(f"API error: {e}")
    
    return None


username = fetch_random_username()
print(username)