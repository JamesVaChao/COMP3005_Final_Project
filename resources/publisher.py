'''
This file is used to perform operations on user information as stored in the DB 
'''
import hashlib

class Publisher:
    #Used when creating a blank user
    def __init__(self ,ownerUsername = "", publisherName="", publisherAddress="", publisherEmail="", publisherPhoneNumber="", publisherBankAccountNumber=""):
        self.ownerUsername = ownerUsername
        self.publisherName = publisherName
        self.publisherAddress = publisherAddress
        self.publisherEmail = publisherEmail
        self.publisherPhoneNumber = publisherPhoneNumber
        self.publisherBankAccountNumber = publisherBankAccountNumber

  
    def toDict(self):
        return self.__dict__

