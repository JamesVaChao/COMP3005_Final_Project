from types import FunctionType
from flask import Flask, request, jsonify, json, Response
from flask_restful import Resource, Api
from flask_cors import CORS
from resources.address import Address
from resources.order import Order
from resources.publisher import Publisher
import psycopg2
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
        searchType = req_json.get('searchType')

        #TODO search based on given query

        responseData={}
        responseData['booksFound']= {}
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful search, replace with sql queries
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  "Fantasy, Adventure, Fiction", "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  "Sci-fi, Action, Fiction", "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")

        responseData['booksFound']= [book1.toDict(), book2.toDict()]
        responseData['type']="success"
        responseData['msg']="search completed"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')



    except Exception as e:
        return responseError(e, "Unable to read JSON data" ).response

 
@app.route('/getAllBooks', methods=['POST'])
def getAllBooks():
    try:
        print("In getAllBooks for books")
        req_json= request.get_json()
        req_json= request.json
       
       

        
        responseData={}
        responseData['bookList']= {}
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful getAllBooks, replace with sql queries
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  "Fantasy, Adventure, Fiction", "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  "Sci-fi, Action, Fiction", "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")

        responseData['bookList']= [book1.toDict(), book2.toDict()]
        responseData['type']="success"
        responseData['msg']="getAllBooks completed"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')



    except Exception as e:
        return responseError(e, "Unable to read JSON data" ).response

@app.route('/login', methods=['POST'])
def login():
    """
    login() :
        username : string id used to update database
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
        
        #TODO Should check if password + username is in database here...

        #TODO Change responseData['msg'] if not found

        #If a special type of user then we can ignore this:
        if(username == "jamesUsername-UserAccount"):
            user = User(username, "James", "Va-Chao", password, "james@email.com", "user")
        if(username == "jamesUsername-OwnerAccount"):
            user = User(username, "James", "Va-Chao", password, "james@email.com", "owner")
        else:
            # minic successful login regardless of input for now
            user = User(username, "James", "Va-Chao", password, "james@email.com", "user")
            #user = User(username, "James", "Va-Chao", password, "james@email.com", "owner")

        responseData['user']= user.toDict()
        responseData['type']="success"
        responseData['msg']="login successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')

    except Exception as e:
        return responseError(e, "Login Failed" ).response

@app.route('/register', methods=['POST'])
def register():
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

        #TODO Add to DB and check if its valid here...

        # connect to the PostgreSQL server
        conn = psycopg2.connect("dbname=COMP3005 user=postgres password=james")

        # create a cursor
        cur = conn.cursor()

	    # execute a statement
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')

        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)

       
	    # close the communication with the PostgreSQL
        cur.close()
        
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
        billingAddress = req_json.get('billingAddress')
        shippingAddress = req_json.get('shippingAddress')
        creditCardNumber = req_json.get('creditCardNumber')

        billingAddressObj = Address.fromDict(billingAddress)
        shippingAddressObj = Address.fromDict(shippingAddress)


        #TODO sql insert shipping address

        #TODO sql insert billin address

        #TODO sql create order

        #TODO sql update sale table

        #TODO sql transfer percetage of sales of book to publisher

        #TODO set orderID to that created

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
        username = req_json.get('username')

        
        responseData={}
        responseData['orderList']= []
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful checkout
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  "Fantasy, Adventure, Fiction", "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  "Sci-fi, Action, Fiction", "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")

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


@app.route('/getOwnerBookCollection', methods=['POST'])
def getOwnerBookCollection():
    """
    getOwnerBookCollection() :

        
    """
    try:
        print("In getOwnerBookCollection")
        req_json= request.get_json()
        req_json= request.json
        username = req_json.get('username')

        #TODO: check user is of accounttype owner here via sql


        #setup return
        responseData={}
        responseData['ownerBookCollection']= []
        responseData['type']= "failure"
        responseData['msg']=""
        
        #TODO sql get collection and set it as return

        # minic successful addToOwnerBookCollection
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  "Fantasy, Adventure, Fiction", "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  "Sci-fi, Action, Fiction", "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")

        collectionBook = [book1, book2]
        collectionBookJSONData = json.dumps(collectionBook, default = serialize, indent=4)
        
        responseData['ownerBookCollection']= collectionBookJSONData
        responseData['type']="success"
        responseData['msg']="getOwnerBookCollection successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')
    except Exception as e:
        return responseError(e, "Error: " + str(e)).response

@app.route('/addToOwnerBookCollection', methods=['POST'])
def addToOwnerBookCollection():

    try:
        print("In addToOwnerBookCollection")
        req_json= request.get_json()
        req_json= request.json
        username = req_json.get('username')
        bookObj = Book.fromDict(req_json.get('book'))
        #check user is of accounttype owner here via sql

        #sql add to collection

        #TODO genre will be 

        #setup return
        responseData={}
        responseData['ownerBookCollection']= []
        responseData['type']= "failure"
        responseData['msg']=""
        
        #sql get collection
        # minic successful addToOwnerBookCollection
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  "Fantasy, Adventure, Fiction", "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  "Sci-fi, Action, Fiction", "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")


        collectionBook = [book1, book2, bookObj]
        collectionBookJSONData = json.dumps(collectionBook, default = serialize, indent=4)
        
        responseData['ownerBookCollection']= collectionBookJSONData
        responseData['type']="success"
        responseData['msg']="addToOwnerBookCollection successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')
    except Exception as e:
        return responseError(e, "Error: " + str(e)).response

@app.route('/removeFromOwnerBookCollection', methods=['POST'])
def removeFromOwnerBookCollection():
    """
    removeFromOwnerBookCollection() :
        username
        bookID
        
    """
    try:
        print("In removeFromOwnerBookCollection")
        req_json= request.get_json()
        req_json= request.json
        username = req_json.get('username')
        bookID = req_json.get('bookID')

        #TODO check user is of accounttype owner here via sql

        #TODO sql reomve book from collection

        #setup return
        responseData={}
        responseData['ownerBookCollection']= []
        responseData['type']= "failure"
        responseData['msg']=""
        
        #TODO sql get collection and set return

        # minic successful removeFromOwnerBookCollection
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  "Fantasy, Adventure, Fiction", "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  "Sci-fi, Action, Fiction", "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")

        collectionBook = [book1]
        collectionBookJSONData = json.dumps(collectionBook, default = serialize, indent=4)
        
        responseData['ownerBookCollection']= collectionBookJSONData
        responseData['type']="success"
        responseData['msg']="removeFromOwnerBookCollection successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')
    except Exception as e:
        return responseError(e, "Error: " + str(e)).response


@app.route('/getPublishers', methods=['POST'])
def getPublishers():
    """
    getPublishers() :

        
    """
    try:
        print("In getPublishers")
        req_json= request.get_json()
        req_json= request.json
        username = req_json.get('username')

        #TODO check user is of accounttype owner here via sql

        #setup return
        responseData={}
        responseData['publisherList']= []
        responseData['type']= "failure"
        responseData['msg']=""
        
        #TODO sql get publishers and set as return

        # minic successful addPublisher
        publisher1Address = Address("100", "Bloom St.", "K4P 0K3", "Toronto", "Ontario", "Canada")
        publisher2Address = Address("100", "Penguin St.", "P0E 8J7", "Montreal", "Ontario", "Canada")

        publisher1 = Publisher (username, "Bloomsbury Publishing",  publisher1Address, "Bloomsbury@gmail.com", "6130340000", "1111")
        publisher2 = Publisher (username, "Penguin Publishing",  publisher2Address, "Penguin@gmail.com", "613200000", "2222")

        publisherList = [publisher1, publisher2]
        publisherListJSONData = json.dumps(publisherList, default = serialize, indent=4)
        
        responseData['publisherList']= publisherListJSONData
        responseData['type']="success"
        responseData['msg']="getPublishers successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')
    except Exception as e:
        return responseError(e, "Error: " + str(e)).response


@app.route('/addPublisher', methods=['POST'])
def addPublisher():
    """
    addPublisher() :

        
    """
    try:
        print("In addPublisher")
        req_json= request.get_json()
        req_json= request.json
        username = req_json.get('username')
        publisherName = req_json.get('publisherName')
        publisherAddress = req_json.get('publisherAddress')
        publisherEmail = req_json.get('publisherEmail')
        publisherPhoneNumber = req_json.get('publisherPhoneNumber')
        publisherBankAccountNumber = req_json.get('publisherBankAccountNumber')

        publisherAddressObj = Address.fromDict(publisherAddress)


        #TODO check user is of accounttype owner here via sql

        #TODO sql add to publisher table

        #setup return
        responseData={}
        responseData['publisherList']= []
        responseData['type']= "failure"
        responseData['msg']=""
        
        #TODO sql get collection and set return

        # minic successful addPublisher
        publisher1Address = Address("100", "Bloom St.", "K4P 0K3", "Toronto", "Ontario", "Canada")
        publisher2Address = Address("100", "Penguin St.", "P0E 8J7", "Montreal", "Ontario", "Canada")

        newPublisher = Publisher (username, publisherName,  publisherAddressObj, publisherEmail, publisherPhoneNumber, publisherBankAccountNumber)
        publisher1 = Publisher (username, "Bloomsbury Publishing",  publisher1Address, "Bloomsbury@gmail.com", "6130340000", "1111")
        publisher2 = Publisher (username, "Penguin Publishing",  publisher2Address, "Penguin@gmail.com", "613200000", "2222")

        publisherList = [publisher1, publisher2, newPublisher]
        publisherListJSONData = json.dumps(publisherList, default = serialize, indent=4)
        
        responseData['publisherList']= publisherListJSONData
        responseData['type']="success"
        responseData['msg']="addToCollection successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')
    except Exception as e:
        return responseError(e, "Error: " + str(e)).response

@app.route('/removePublisher', methods=['POST'])
def removePublisher():
    """
    removePublisher() :

        
    """
    try:
        print("In removePublisher")
        req_json= request.get_json()
        req_json= request.json
        username = req_json.get('username')
        publisherID = req_json.get('publisherID')

        #TODO check user is of accounttype owner here via sql

        #TODO sql remove from publisher table

        #setup return
        responseData={}
        responseData['publisherList']= []
        responseData['type']= "failure"
        responseData['msg']=""
        
        #TODO sql get collection and set return

        # minic successful removePublisher
        publisher1Address = Address("100", "Bloom St.", "K4P 0K3", "Toronto", "Ontario", "Canada")
        publisher2Address = Address("100", "Penguin St.", "P0E 8J7", "Montreal", "Ontario", "Canada")

        publisher1 = Publisher (username, "Bloomsbury Publishing",  publisher1Address, "Bloomsbury@gmail.com", "6130340000", "1111")
        publisher2 = Publisher (username, "Penguin Publishing",  publisher2Address, "Penguin@gmail.com", "613200000", "2222")

        publisherList = [publisher1, publisher2]
        publisherListJSONData = json.dumps(publisherList, default = serialize, indent=4)
        
        responseData['publisherList']= publisherListJSONData
        responseData['type']="success"
        responseData['msg']="removePublisher successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')
    except Exception as e:
        return responseError(e, "Error: " + str(e)).response

@app.route('/getReport', methods=['POST'])
def getReport():
    try:
        print("In getReport")
        req_json= request.get_json()
        req_json= request.json
        username = req_json.get('reportType')
        startDate = req_json.get('startDate')
        endDate = req_json.get('endDate')

        #TODO based on report type run certain query with start and end dates
        #https://www.toolbox.com/tech/programming/question/selecting-between-two-dates-within-a-datetime-field-sql-server-120904/
        """
        Possible reportType:
            "Total_Sales"
            "Sales_per_Author"
            "Sales_per_Book"
            "Sales_per_Publisher" 
            "Sales_per_Genre"
                
        Date format:
            "YYYY-MM-DD"
            Ex default start date. "2020-01-01"
            Ex default end date. "2021-12-30"
        """

        #setup return
        responseData={}
        responseData['returnedReportInfo']= ""
        responseData['type']= "failure"
        responseData['msg']=""
        
        #TODO sql get info and set return

        # minic successful getReport
       
        returnedReportInfo = "Total Sales {}\nBetween {} and {}".format("$300",startDate, endDate)
        responseData['returnedReportInfo'] = returnedReportInfo
        responseData['type']="success"
        responseData['msg']="getReport successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')
    except Exception as e:
        return responseError(e, "Error: " + str(e)).response

if __name__ == '__main__':
    #ip = '192.168.1.9'  # change ip to individual ip. found using ipconfig. #used for talking between web and server
    #app.run(host=ip, port=5000, use_reloader=True, debug=False) #use for talking between web and server

    app.run(debug=True) #used for local server side dev


    #app.run() #use for heroku
