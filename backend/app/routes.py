from flask import request, jsonify, send_from_directory
from app import app
from app.services import text_to_speech
import os

@app.route('/api/generate_audio', methods=['POST'])
def generate_audio():
    data = request.get_json()
    text = data.get('text')
    lang = data.get('lang', 'es')
    slow = data.get('slow', False)

    if not text:
        return jsonify({'error': 'no text provided'}), 400
    
    try:
        filename = text_to_speech(text, lang, slow)
        return jsonify ({
            'message': 'Audio generated successfully',
            'filename': filename
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/audio/<filename>', methods=['GET'])
def get_audio(filename):
    return send_from_directory('static/audio', filename)   