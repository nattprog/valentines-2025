from flask import Flask, render_template, redirect, send_from_directory

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("./main.html")

@app.route('/sw.js')
def service_worker():
    return send_from_directory('static', 'sw.js', mimetype='application/javascript')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'images/favicon.ico', mimetype='image/png')

@app.route('/templates/main.html')
def main_html():
    return send_from_directory('templates', 'main.html', mimetype='text/html')

if __name__ == "__main__":
    app.run()