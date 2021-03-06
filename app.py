from types import FunctionType
from flask import Flask, request, jsonify, json, Response
from flask_restful import Resource, Api
from flask_cors import CORS
from resources.address import Address
from resources.order import Order
from resources.publisher import Publisher
import psycopg2
from resources.user import User
from datetime import datetime


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
        bookSearchInfo = req_json.get('bookSearchInfo').lower()
        searchType = req_json.get('searchType').lower()

        # connect to the PostgreSQL server
    
        conn = psycopg2.connect(
            host="localhost",
            database="COMP3005",
            user="postgres",
            password="james")
        # do stuff

        # create a cursor
        cur = conn.cursor()

	    # execute a statement
        if searchType == "all":
            cur.execute("select * from book where lower(name) like '%%%s%%' or lower(isbn) like '%%%s%%' or lower(genre) like '%%%s%%' or lower(author) like '%%%s%%'" % (bookSearchInfo, bookSearchInfo, bookSearchInfo, bookSearchInfo))
        else:
            cur.execute("select * from book where lower(%s) like '%%%s%%'" % (searchType, bookSearchInfo))
        result = cur.fetchall()
       
	    # close the communication with the PostgreSQL
        cur.close()

        
        books = []
        for book in result:
            if (book[9] > 0 and book[9] == book[10]):
                available = "All copies reserved"
            elif book[9] == 0:
                available == "No copies available"
            else:
                available = "Available"
            tmpBook = Book(book[0], book[1], available, book[2], book[3], book[11], float(book[4]), float(book[5]), float(book[6]), book[7])
            books.append(tmpBook.toDict())

        responseData={}
        responseData['booksFound']= {}
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful search, replace with sql queries
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  "Fantasy, Adventure, Fiction", "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  "Sci-fi, Action, Fiction", "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")

        responseData['booksFound']= books
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
       
       
        # connect to the PostgreSQL server
    
        conn = psycopg2.connect(
            host="localhost",
            database="COMP3005",
            user="postgres",
            password="james")
        # do stuff

        # create a cursor
        cur = conn.cursor()

	    # execute a statement
        cur.execute("select * from book")
        result = cur.fetchall()
       
	    # close the communication with the PostgreSQL
        cur.close()

        
        books = []
        for book in result:
            if (book[9] > 0 and book[9] == book[10]):
                available = "All copies reserved"
            elif book[9] == 0:
                available == "No copies available"
            else:
                available = "Available"
            tmpBook = Book(book[0], book[1], available, book[2], book[3], book[11], float(book[4]), float(book[5]), float(book[6]), book[7])
            books.append(tmpBook.toDict())
        
        responseData={}
        responseData['bookList']= {}
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful getAllBooks, replace with sql queries
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  "Fantasy, Adventure, Fiction", "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  "Sci-fi, Action, Fiction", "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")

        responseData['bookList']= books
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
        




        #TODO Change responseData['msg'] if not found

        #If a special type of user then we can ignore this:
        if(username == "jamesUsername-UserAccount"):
            user = User(username, "James", "Va-Chao", password, "james@email.com", "user")
        if(username == "jamesUsername-OwnerAccount"):
            user = User(username, "James", "Va-Chao", password, "james@email.com", "owner")
        else:
        # connect to the PostgreSQL server
            conn = psycopg2.connect(
                host="localhost",
                database="COMP3005",
                user="postgres",
                password="james")
            # do stuff

            # create a cursor
            cur = conn.cursor()

            # execute a statement
            cur.execute("select * from b_user where b_user_id = '%s' and password = '%s' fetch first 1 row only" % (username, password))
            result = cur.fetchall()[0]
        
            # close the communication with the PostgreSQL
            cur.close()

            if result:
                user = User(username, result[2], "", password, result[1], result[4])
            else:
                # minic successful login regardless of input for now
                user = User(username, "James", "Va-Chao", password, "james@email.com", "user")

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
        name = firstName + " " + lastName

        
        responseData={}
        responseData['user']= {}
        responseData['type']= "failure"
        responseData['msg']=""

        user = User(username, name, "", password, email, accountType)

        # connect to the PostgreSQL server
    
        conn = psycopg2.connect(
            host="localhost",
            database="COMP3005",
            user="postgres",
            password="james")
        # do stuff

        # create a cursor
        cur = conn.cursor()

	    # execute a statement
        cur.execute("insert into b_user values ('%s', '%s', '%s', '%s', '%s')" % (username, email, name, password, accountType))
        conn.commit()
       
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
        username = req_json.get('username')

        bill = Address.fromDict(billingAddress)
        ship = Address.fromDict(shippingAddress)


        #TODO sql insert shipping address

        #TODO sql insert billin address

        #TODO sql create order

        #TODO sql update sale table

        #TODO sql transfer percetage of sales of book to publisher

        #TODO set orderID to that created

        cost = 0
        for book in cartList:
            cost += book["price"]
        status = "warehouse"
        date = datetime.today().strftime('%Y%m%d')


        # connect to the PostgreSQL server
    
        conn = psycopg2.connect(
            host="localhost",
            database="COMP3005",
            user="postgres",
            password="james")
        # do stuff

        # create a cursor
        cur = conn.cursor()

        cur.execute("insert into address values (default, '%s', '%s', '%s', '%s', '%s', '%s') returning address_id" % \
            (ship.streetNumber, ship.streetName, ship.postalCode.replace(" ", ""), ship.city, ship.provience, ship.country))
        ship_address_id = cur.fetchone()[0]
        
            
        cur.execute("insert into address values (default, '%s', '%s', '%s', '%s', '%s', '%s') returning address_id" % \
            (bill.streetNumber, bill.streetName, bill.postalCode, bill.city, bill.provience, bill.country))
        bill_address_id = cur.fetchone()[0]

	    # execute a statement
        cur.execute("insert into b_order values (default, '%s', '%s', '%s', '%s', '%s') returning b_order_number" % \
            (cost, status, date, username, ship_address_id))
        b_order_number = cur.fetchone()[0]
        numlist = {}
        newCartList = []
        for book in cartList:
            if book["book_id"] in numlist.keys():
                numlist[book["book_id"]] += 1
            else:
                numlist[book["book_id"]] = 1
                newCartList.append(book)
        for book in newCartList:
            cur.execute("insert into in_b_order values ('%s', '%s', '%s')" % (b_order_number, book["book_id"], numlist[book["book_id"]]))
            
        cur.execute("insert into bill_to values (%s, '%s', '%s')" % (b_order_number, creditCardNumber.replace("-", ""), bill_address_id))
        conn.commit()
       
	    # close the communication with the PostgreSQL
        cur.close()

        responseData={}
        responseData['orderID']= {}
        responseData['type']= "failure"
        responseData['msg']=""
        
        # minic successful lcheckout
        responseData['orderID']= b_order_number
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

        conn = psycopg2.connect(
            host="localhost",
            database="COMP3005",
            user="postgres",
            password="james")

        cur = conn.cursor()

        cur.execute("select * from b_order")
        orders = cur.fetchall()

        cur.execute("select * from b_order natural join in_b_order")
        
        orderList = []
        for order in orders:
            cur.execute("select * from book where isbn in (select isbn from b_order natural join in_b_order where b_order_number = " + str(order[0]) + ")")
            result_books = cur.fetchall()
            books = []
            for book in result_books:
                if (book[9] > 0 and book[9] == book[10]):
                    available = "All copies reserved"
                elif book[9] == 0:
                    available == "No copies available"
                else:
                    available = "Available"
                tmpBook = Book(book[0], book[1], available, book[2], book[3], book[11], float(book[4]), float(book[5]), float(book[6]), book[7])
                books.append(tmpBook.toDict())
            cur.execute("select * from (select * from bill_to natural join address) as bills join b_order on b_order.b_order_number = bills.b_order_number where b_order.b_order_number = " + str(order[0]))
            bill = cur.fetchall()[0]
            billing_info = ""
            for thing in bill:
                billing_info += str(thing) + " "
            cur.execute("select * from address where address_id = " + str(order[5]))
            shipping_info = cur.fetchall()[0]
            location = order[2]
            tmpOrder = Order(order[0], books, "", billing_info, shipping_info, location)
            orderList.append(tmpOrder)
        
        cur.close()
        
        responseData={}
        responseData['orderList']= []
        responseData['type']= "failure"
        responseData['msg']=""


        #bookJSONData = json.dumps(book1.toJson(), indent=4)
        #print(bookJSONData)

        #print ("\n\n")
        #order1 = Order("AX01", [book1, book2], "BOOKID1", "BILLING_INFO", "SHIPPING_INFO", "LOCATION")
        #order2 = Order("AX01", [book2, book2], "BOOKID1", "BILLING_INFO", "SHIPPING_INFO", "LOCATION")
        #orderList = [order1, order2]
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

# connect to the PostgreSQL server
    
        conn = psycopg2.connect(
            host="localhost",
            database="COMP3005",
            user="postgres",
            password="james")
        # do stuff

        # create a cursor
        cur = conn.cursor()

	    # execute a statement
        cur.execute("select * from book")
        result = cur.fetchall()
       
	    # close the communication with the PostgreSQL
        cur.close()

        
        books = []
        for book in result:
            if (book[9] > 0 and book[9] == book[10]):
                available = "All copies reserved"
            elif book[9] == 0:
                available == "No copies available"
            else:
                available = "Available"
            tmpBook = Book(book[0], book[1], available, book[2], book[3], book[11], float(book[4]), float(book[5]), float(book[6]), book[7])
            books.append(tmpBook.toDict())

        collectionBook = books
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

        #setup return
        responseData={}
        responseData['ownerBookCollection']= []
        responseData['type']= "failure"
        responseData['msg']=""
        

        conn = psycopg2.connect(
            host="localhost",
            database="COMP3005",
            user="postgres",
            password="james")
        # do stuff

        # create a cursor
        cur = conn.cursor()

	    # execute a statement
        print('PostgreSQL database version:')
        cur.execute("select * from book")
        collectionBook = cur.fetchall()

        cur.execute("insert into book values ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(bookObj.book_id, bookObj.name, bookObj.author,bookObj.genre,bookObj.number_of_pages,bookObj.price,bookObj.sales_percent_to_publisher,bookObj.img_url,bookObj.restock_threshold,bookObj.quantity_stocked,0,bookObj.publisher) )
        conn.commit()

        # display the PostgreSQL database server version

        cur.execute("select * from book")
        collectionBookSQL = cur.fetchall()

	    # close the communication with the PostgreSQL
        cur.close()

        # minic successful addToOwnerBookCollection
        """
        book1 = Book (1234, "Harry Potter and the Philosopher's Stone", "available" , "J. K. Rowling",  "Fantasy, Adventure, Fiction", "Bloomsbury Publishing",  350, 15.99, 0.10, "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        book2 = Book (66, "Star Wars: Thrawn", "available" , "Timothy Zahn",  "Sci-fi, Action, Fiction", "Penguin Publishing",  448, 20.99, 0.4, "https://upload.wikimedia.org/wikipedia/en/d/d0/Star_Wars_Thrawn-Timothy_Zahn.png")


        collectionBook = [book1, book2, bookObj]
        """
        collectionBook = []

        for i in range(len(collectionBookSQL)):
            book = Book(collectionBookSQL[i][0], collectionBookSQL[i][1], "AVAILABLE", collectionBookSQL[i][2], collectionBookSQL[i][3], collectionBookSQL[i][11], collectionBookSQL[i][4], collectionBookSQL[i][5],collectionBookSQL[i][6],collectionBookSQL[i][7],collectionBookSQL[i][8],collectionBookSQL[i][9])
            collectionBook.append(book)

        collectionBookJSONData = json.dumps(collectionBook, default = serialize, indent=4)
        responseData['ownerBookCollection']= collectionBookJSONData
        responseData['type']="success"
        responseData['msg']="addToOwnerBookCollection successful"

        return Response(json.dumps(responseData), status=201, mimetype='application/json')
    except Exception as e:
        return responseError(e, "Error: " + str(e)).response

def serialize(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, FunctionType):
        return ""
    print(type(obj))
    print (type(obj).__name__) 
    print (str(obj))    
   
    if (type(obj).__name__ == "Decimal"):
        return str(obj)
    return obj.__dict__

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

        conn = psycopg2.connect(
            host="localhost",
            database="COMP3005",
            user="postgres",
            password="james")
        # do stuff

        # create a cursor
        cur = conn.cursor()

	    # execute a statement
        print('PostgreSQL database version:')
        cur.execute("delete from book where isbn::bigint = " + str(bookID))
        conn.commit()

        # display the PostgreSQL database server version

        cur.execute("select * from book")
        collectionBookSQL = cur.fetchall()

	    # close the communication with the PostgreSQL
        cur.close()

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
