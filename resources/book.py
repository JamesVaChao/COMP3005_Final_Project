'''
This file is used to perform operations on user information as stored in the DB 
'''
import hashlib
import json

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

    @classmethod
    def fromDict(cls, data):
        book = Book()
        book.book_id=data["book_id"]
        book.name=data["name"]
        book.book_status=data["book_status"]
        book.author=data["author"]
        book.genre=data["genre"]
        book.publisher=data["publisher"]
        book.number_of_pages=data["number_of_pages"]
        book.price=data["price"]
        book.sales_percent_to_publisher=data["sales_percent_to_publisher"]
        book.img_url=data["img_url"]

        return book
    def toDict(self):
        return self.__dict__

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)
