from flask import Flask, request, jsonify, json, Response
from flask_restful import Resource, Api
from flask_cors import CORS

from resources.user import User


# Initialize Flask app
app = Flask(__name__)
api = Api(app)

# Enable CORS
CORS(app)

class responseError:
    def __init__(self, e, msg):
        print(f"An Error Occured: {e}")
        self.response = Response(json.dumps({"Error: ": e.args[0] ,'message': msg, 'type': "failure"}), status=400, mimetype='application/json')
   

jamesCounter = 0
@app.route('/JamesTest', methods=['POST'])
def JamesTest():
 
    global jamesCounter 
    
    book1 = {"name" : "harry potter"}
    book2 = {"name" : "star wars"}
    book3 = {"name" : "lord of the rings"}
    responses = [book1, book2, book3]
    response = responses[jamesCounter%3]
    jamesCounter += 1
    return Response(json.dumps(response), status=201, mimetype='application/json')

    
if __name__ == '__main__':
    #ip = '192.168.1.9'  # change ip to individual ip. found using ipconfig. #used for talking between web and server
    #app.run(host=ip, port=5000, use_reloader=True, debug=False) #use for talking between web and server

    app.run(debug=False) #used for pure server side dev


    #app.run() #use for heroku
