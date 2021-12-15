'''
This file is used to perform operations on user information as stored in the DB 
'''
import hashlib

class Book:

    def __init__(self, book_id = -1, name = "No Name", book_status = "No Status", author = "No Author", genre=[], publisher= "No Publisher", number_of_pages= -1, price=-1, sales_percent_to_publisher=-1, img_url = ""):
        self.book_id = book_id
        self.name = name
        self.book_status = book_status
        self.author = author
        self.genre = genre
        self.publisher = publisher
        self.number_of_pages = number_of_pages
        self.price = price
        self.sales_percent_to_publisher = sales_percent_to_publisher
        self.img_url = img_url

    def toDict(self):
        return self.__dict__
