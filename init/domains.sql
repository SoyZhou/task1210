create table my_databases.domains
(
    id         int auto_increment
        primary key,
    domain     varchar(256) not null,
    addresses  json         not null,
    client_ip  varchar(64)  not null,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime     null
);

