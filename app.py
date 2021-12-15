from flask import Flask, request, jsonify, json, Response
from flask_restful import Resource, Api
from flask_cors import CORS

from resources.user import User

from resources.book import Book

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

       
@app.route('/searchForBooks', methods=['POST'])
def searchForBook():
    try:
        print("In search for books")
        req_json= request.get_json()
        req_json= request.json
        bookSearchInfo = req_json.get('bookSearchInfo')
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  ["Fantasy", "Adventure", "Fiction"], "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  ["Sci-fi", "Action", "Fiction"], "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")

        
        responseData={}
        responseData['booksFound']= {}
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful login

        responseData['booksFound']= [book1.toDict(), book2.toDict()]
        responseData['type']="success"
        responseData['msg']="search completed"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')



    except Exception as e:
        return responseError(e, "Unable to read JSON data" ).response

@app.route('/login', methods=['POST'])
def login():
    """
    login() :
        userId : string id used to update database
        password : password entered by user
        
    """
    try:
        print("In login")
        req_json= request.get_json()
        req_json= request.json
        username = req_json.get('username')
        password = req_json.get('password')
        
        
        responseData={}
        responseData['user']= {}
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful login
        user = User()
        user.firstName = "James"
        user.password = "password"
        user.fromDict
        responseData['user']= user.toDict()
        responseData['type']="success"
        responseData['msg']="login successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')


        if user == None:
            responseData['msg']="email does not exist in database, please register"
            return Response(json.dumps(responseData), status=201, mimetype='application/json')
        if(user.checkPasword(password) == False):
            responseData['msg']="password is wrong, if you logged in via google, please click the right button"
            return Response(json.dumps(responseData), status=201, mimetype='application/json')
     
        if user != None and user.checkPasword(password):
            responseData['user']=user.__dict__
            responseData['type']="success"
            responseData['msg']="sign in via email + password"
        return Response(json.dumps(responseData), status=201, mimetype='application/json')

    except Exception as e:
        return responseError(e, "Unable to read JSON data" ).response

if __name__ == '__main__':
    #ip = '192.168.1.9'  # change ip to individual ip. found using ipconfig. #used for talking between web and server
    #app.run(host=ip, port=5000, use_reloader=True, debug=False) #use for talking between web and server

    app.run(debug=True) #used for pure server side dev


    #app.run() #use for heroku
