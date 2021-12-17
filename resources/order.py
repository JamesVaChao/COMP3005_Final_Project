'''
This file is used to perform operations on user information as stored in the DB 
'''
import hashlib
import json
class Order:

    def __init__(self, order_number = "No Order Num", book_list = [], book_id = "No book_id", billing_information = "No billing_information", shipping_infomation = "No shipping_infomation", location= "No location"):
        self.order_number = order_number
        self.book_list = book_list
        self.book_id = book_id
        self.billing_information = billing_information
        self.shipping_infomation = shipping_infomation
        self.location = location

    def toDict(self):
        return self.__dict__

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

