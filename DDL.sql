create table address
    (address_id         varchar(5),
    street_number       varchar(6),
    street_name         varchar(20),
    postal_code         varchar(6),
    city                varchar(20),
    province            varchar(2),
    country             varchar(2),
    primary key (address_id)
    );

create table publisher
    (publisher_name     varchar(50),
    email_address       varchar(255),
    phone_number        varchar(15),
    bank_account_number varchar(12),
    sales_amount        numeric(14, 2) check (sales_amount >= 0),
    address_id          varchar(5),
    primary key (publisher_name),
    foreign key (address_id) references address
    );

create table user
    (user_id            varchar(5),
    email_address       varchar(255),
    name                varchar(50) not null,
    password            varchar(20) not null,
    account_type        varchar(5) check (account_type in ('admin', 'user')),
    primary key(user_id)
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
    quantity_stocked            numeric(4, 0) check (quanitity_stock >= 0),
    quantity_reserved           numeric(4, 0) check (quanitty_reserved >= 0),
    publisher_name              varchar(50),
    primary key (ISBN),
    foreign key (publisher_name) references publisher
    );

create table order
    (order_number   varchar(8)
    cost            numeric(10, 2) check (cost > 0),
    status          varchar(10) check (status) in ('in_transit', 'warehouse', 'delivered'),
    date            varchar(8),
    user_id         varchar(5),
    address_id      varchar(5),
    primary key (order_number),
    foreign key (user_id) references user,
    foreign key (address_id) references address
    );

create table in_order
    (order_number   varchar(8),
    ISBN            varchar(13),
    number          varchar(3, 0) check (number > 0),
    primary key (order_number, ISBN),
    foreign key (order_number) references order,
    foreign key (ISBN) references book
    );

create table bill_to
    (order_number       varchar(8),
    credit_card_number  varchar(16),
    address_id          varchar(5),
    primary key (order_number),
    foreign key (order_number) references order,
    foreign key (address_id) references address
    );