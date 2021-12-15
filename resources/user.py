'''
This file is used to perform operations on user information as stored in the DB 
'''
import hashlib

class User:
    """
    username 
            # string of username
    firstName
            # string of first name
    lastName
            # string of last name
    password
            # string password
    """
    #Used when creating a blank user
    def __init__(self):
        self.username = ''
        self.firstName = ""
        self.lastName = ""
        self.password = ""
        self.loginMethod = "email"

    # Used when a user dictionary is passed in as a parameter. For instance, when creating the user
    @classmethod
    def fromDict(cls, data):
        user = User()
        user.firstName=data["firstName"]
        user.lastName=data["lastName"]
        #user.passwordHash=data["passwordHash"]
        user.password=data["password"]

        #user.loginMethod = data["loginMethod"]
        return user


    def setHashPassword(self, password):
        hashlib.sha512(password.encode('utf-8')).hexdigest()
        self.passwordHash
        self.updateSelf()

    #returns user or None if user already exits in db 
    @classmethod
    def registerUser(cls, userID, password, firstName, lastName):
        try:
            if userID:
                #user = FirebaseDBSingleton.getInstance().usersCollection.document(userID).get()
                pass
                #if(user.exists):
                #    return None
        except Exception as e:
            print(f"An Error Occured retrieving user in registerUser")
            return None

        user = User()
        user.firstName=firstName
        user.lastName=lastName
        user.userID=userID
        user.passwordHash=hashlib.sha512(password.encode('utf-8')).hexdigest()
        user.loginMethod = "email"
        user.updateSelf()
        return user

    # Used when instantiating user from database.
    #   userID : string
    @classmethod
    def fromDatabase(cls, userID):
        try:
            if userID:
                #user = FirebaseDBSingleton.getInstance().usersCollection.document(userID).get()
                pass
                #if(user.exists):
                #    return cls.fromDict(user._data)
            print(f"User does not exists")
            return None
        except Exception as e:
            print(e)
            print(f"An Error Occured retrieving user")
            return None

    def checkPasword(self, password):
        return self.passwordHash == hashlib.sha512(password.encode('utf-8')).hexdigest()

    def toDict(self):
        return self.__dict__

