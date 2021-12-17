from types import FunctionType
from flask import Flask, request, jsonify, json, Response
from flask_restful import Resource, Api
from flask_cors import CORS
from resources.order import Order

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
        
        # minic successful search, replace with sql queries

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
        
        #Should check if password + username valid here...

        # minic successful login for now
        user = User(username = username, password=password)

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

@app.route('/register', methods=['POST'])
def register():
    """
    register() :
        userId : string id used to update database
        password : password entered by user
        
    """
    try:
        print("In register")
        req_json= request.get_json()
        req_json= request.json
        username = req_json.get('username')
        password = req_json.get('password')
        firstName = req_json.get('firstName')
        lastName = req_json.get('lastName')
        email = req_json.get('email')
        accountType = req_json.get('accountType')

        
        responseData={}
        responseData['user']= {}
        responseData['type']= "failure"
        responseData['msg']=""

        user = User(username, firstName, lastName, password, email, accountType)

        #Add to DB and check if its valid here...

        # minic successful register
        responseData['user']= user.toDict()
        responseData['type']="success"
        responseData['msg']="login successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')

    except Exception as e:
        return responseError(e, "Unable to read JSON data" ).response

@app.route('/checkout', methods=['POST'])
def checkout():
    """
    checkout() :

        
    """
    try:
        print("In checkout")
        req_json= request.get_json()
        req_json= request.json
        cartList = req_json.get('cartList')
        userStreetNumber = req_json.get('userStreetNumber')
        userStreetName = req_json.get('userStreetName')
        userPostalCode = req_json.get('userPostalCode')
        userCity = req_json.get('userCity')
        userProvience = req_json.get('userProvience')
        userCountry = req_json.get('userCountry')

        
        responseData={}
        responseData['orderID']= {}
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful lcheckout
        responseData['orderID']= "AX01"
        responseData['type']="success"
        responseData['msg']="checkout successful"


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

def serialize(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, FunctionType):
        return ""

    return obj.__dict__

@app.route('/getOrderList', methods=['POST'])
def getOrderList():
    """
    getOrderList() :

        
    """
    try:
        print("In getOrderList")
        req_json= request.get_json()
        req_json= request.json
        userID = req_json.get('userID')

        
        responseData={}
        responseData['orderList']= []
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful checkout
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  ["Fantasy", "Adventure", "Fiction"], "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  ["Sci-fi", "Action", "Fiction"], "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")

        bookJSONData = json.dumps(book1.toJson(), indent=4)
        print(bookJSONData)

        print ("\n\n")
        order1 = Order("AX01", [book1, book2], "BOOKID1", "BILLING_INFO", "SHIPPING_INFO", "LOCATION")
        order2 = Order("AX01", [book2, book2], "BOOKID1", "BILLING_INFO", "SHIPPING_INFO", "LOCATION")
        orderList = [order1, order2]
        orderListJSONData = json.dumps(orderList, default = serialize, indent=4)
        
        responseData['orderList']= orderListJSONData
        responseData['type']="success"
        responseData['msg']="getOrderList successful"


        return Response(json.dumps(responseData), status=201, mimetype='application/json')
    except Exception as e:
        return responseError(e, "Error: " + str(e)).response


if __name__ == '__main__':
    #ip = '192.168.1.9'  # change ip to individual ip. found using ipconfig. #used for talking between web and server
    #app.run(host=ip, port=5000, use_reloader=True, debug=False) #use for talking between web and server

    app.run(debug=True) #used for local server side dev


    #app.run() #use for heroku
