'''
This file is used to perform operations on user information as stored in the DB 
'''
import hashlib

class Address:
    #Used when creating a blank user
    def __init__(self , streetNumber = "", streetName="", postalCode="", city="", provience="", country=""):
        self.streetNumber = streetNumber
        self.streetName = streetName
        self.postalCode = postalCode
        self.city = city
        self.provience = provience
        self.country = country

    # Used when a user dictionary is passed in as a parameter. For instance, when creating the user
    @classmethod
    def fromDict(cls, data):
        address = Address()
        address.streetNumber=data["streetNumber"]
        address.streetName=data["streetName"]
        address.postalCode=data["postalCode"]
        address.city=data["city"]
        address.provience=data["provience"]
        address.country=data["country"]
        return address

    def toDict(self):
        return self.__dict__

