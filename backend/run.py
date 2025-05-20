from app import app
import os

if __name__ == '__main__':
    #crear carpeta si no existe
    os.makedirs('static/audio', exist_ok=True)
    app.run(debug=True, port=5000)