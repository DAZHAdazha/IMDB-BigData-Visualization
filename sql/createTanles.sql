create table allMovies
(
	ID    int auto_increment,
    name text null,
    time text null,
    type text null,
	unique (ID)
);

create table reviews
(
	ID    int auto_increment,
	name  text   null,
	title  text   null,
    content text null,
	
	unique (ID)
	
);

create table top250
(
    ID    int auto_increment,
    name  text   not null,
    grade double null,
    gross bigint null,
    constraint top250_ID_uindex
        unique (ID)
);
alter table allMovies
    add primary key (ID);
alter table top250
    add primary key (ID);
alter table reviews
    add primary key (ID);

