from gtts import gTTS
import os
from datetime import datetime
import json

AUDIO_FOLDER = 'static/audio'

LANG_CONFIG_FILE = 'Language.json'

def text_to_speech(text, lang='es', slow=False):
    try:
        #crear nombre unico para el archivo
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"audio_{timestamp}.mp3"
        filepath = os.path.join(AUDIO_FOLDER, filename)

        #generar audio
        tts = gTTS(text=text, lang=lang, slow=slow)
        tts.save(filepath)

        return filename
    except Exception as e:
        print(f"Error generating speech: {e}")
        raise