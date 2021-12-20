DROP TABLE IF EXISTS b_order CASCADE;
DROP TABLE IF EXISTS b_user CASCADE;
DROP TABLE IF EXISTS bill_to CASCADE;
DROP TABLE IF EXISTS book CASCADE;
DROP TABLE IF EXISTS in_b_order CASCADE;
DROP TABLE IF EXISTS publisher CASCADE;
DROP TABLE IF EXISTS address CASCADE;

create table address
    (address_id         serial,
    street_number       varchar(6),
    street_name         varchar(20),
    postal_code         varchar(6),
    city                varchar(20),
    province            varchar(25),
    country             varchar(25),
    primary key (address_id)
    );

create table publisher
    (publisher_name     varchar(50),
    email_address       varchar(255),
    phone_number        varchar(15),
    bank_account_number varchar(12),
    sales_amount        numeric(14, 2) check (sales_amount >= 0),
    address_id          serial,
    primary key (publisher_name),
    foreign key (address_id) references address
    );

create table b_user
    (b_user_id            varchar(25),
    email_address       varchar(255),
    name                varchar(50) not null,
    password            varchar(20) not null,
    account_type        varchar(5) check (account_type in ('admin', 'user')),
    primary key(b_user_id)
    );

create table book
    (ISBN                       varchar(13),
    name                        varchar(50),
    author                      varchar(50),
    genre                       varchar(20),
    number_of_pages             numeric(6, 0) check (number_of_pages > 0),
    price                       numeric(8, 2) check (price >= 0),
    sales_percent_to_publisher  numeric(3, 2) check (sales_percent_to_publisher >= 0 and sales_percent_to_publisher <= 1),
    img_url                     varchar(255),
    restock_threshold           numeric(3, 0) check (restock_threshold >= 0),
    quantity_stocked            numeric(4, 0) check (quantity_stocked >= 0),
    quantity_reserved           numeric(4, 0) check (quantity_reserved >= 0),
    publisher_name              varchar(50),
    primary key (ISBN),
    foreign key (publisher_name) references publisher
    );

create table b_order
    (b_order_number   serial,
    cost            numeric(10, 2) check (cost > 0),
    status          varchar(10) check (status in ('in_transit', 'warehouse', 'delivered')),
    date            varchar(8),
    b_user_id         varchar(25),
    address_id      serial,
    primary key (b_order_number),
    foreign key (b_user_id) references b_user,
    foreign key (address_id) references address
    );

create table in_b_order
    (b_order_number   serial,
    ISBN            varchar(13),
    number          numeric(3, 0) check (number > 0),
    primary key (b_order_number, ISBN),
    foreign key (b_order_number) references b_order,
    foreign key (ISBN) references book
    );

create table bill_to
    (b_order_number       serial,
    credit_card_number  varchar(16),
    address_id          serial,
    primary key (b_order_number),
    foreign key (b_order_number) references b_order,
    foreign key (address_id) references address
    );
	
	
/* Adding default values for demo */
insert into b_user values ('1', 'test@test.com', 'first last', 'pass', 'user');
insert into address values (default, '50', 'Street Ave.', 'K1S7H2', 'Ottawa', 'Ontario', 'Canada');


insert into address values (default, '234', 'Minas St', 'H3K5P9', 'Kingston', 'Ontario', 'Canada');
insert into publisher values ('Minas Publishing', 'minas@gmail.com', '534-234-4324', '117463782983', 10, '1');
insert into publisher values ('Penguin', 'hi@penguin.com', '6135551234', '987463782983', 104987.87, '2');

insert into book values ('1008472647839', '1984', 'George Orwell', 'Fiction', '224', 12.99, 0.20, 'https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg', 10, 100, 0, 'Penguin');

SELECT * FROM address;
