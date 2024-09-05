from flask import Flask, jsonify
import json

app = Flask(__name__)

# Load JSON data from file
@app.route('/menu', methods=['GET'])
def get_menu():
    with open('15_days_menu_processed.json') as json_file:
        data = json.load(json_file)
    return jsonify(data)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
