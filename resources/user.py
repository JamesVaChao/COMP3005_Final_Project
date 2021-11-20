'''
This file is used to perform operations on user infomration as stored in the DB 
'''
import hashlib

class User:
    """
    fireName
            # string of first name
    lastName
            # string of last name
    userID
            #string identifier used as id in Firebase. As of 2020-12-01 its their email     
    """
    #Used when creating a blank user
    def __init__(self):
        self.firstName = ""
        self.lastName = ""
        self.userID= ""

    def toDict(self):
        return self.__dict__