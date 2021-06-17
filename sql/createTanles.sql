create table `all`
(
    name varchar(100) charset utf8 not null
        primary key,
    time text                      null,
    type text                      null
);

create table reviews
(
    mID     int  not null,
    content text null
);

create table top250
(
    ID    int auto_increment,
    name  text   not null,
    grade double null,
    gross bigint null,
    url   text   null,
    constraint top250_ID_uindex
        unique (ID)
);

alter table top250
    add primary key (ID);

