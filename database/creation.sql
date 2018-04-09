create database if not exists publications_synapse;
use publications_synapse;

create table publication(
    id varchar(10),
    title varchar(50),
    content text,
    active boolean,
    date date,
    time time,
    user int,
    CONSTRAINT pk_publication PRIMARY KEY(id)
) engine=innodb;

CREATE TABLE comment(
    id int auto_increment,
    content text,
    date date,
    time time,
    user int,
    publication VARCHAR(10),
    CONSTRAINT pk_comment PRIMARY KEY(id,publication),
    CONSTRAINT fk_com_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine = innodb;

CREATE TABLE vote(
    user int,
    publication VARCHAR(10),
    CONSTRAINT pk_vote PRIMARY KEY(user,publication),
    CONSTRAINT fk_vote_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine=innodb;

CREATE TABLE report(
    user int,
    publication VARCHAR(10),
    description text,
    CONSTRAINT pk_signal PRIMARY KEY(user,publication),
    CONSTRAINT fk_signal_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine=innodb;

create TABLE deletion_note(
    user int,
    publication VARCHAR(10),
    description text,
    CONSTRAINT fk_note_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine = innodb;

CREATE TABLE observation(
    user int,
    publication VARCHAR(10),
    content text,
    CONSTRAINT fk_rem_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine=innodb;

CREATE TABLE theme(
    id int auto_increment,
    title VARCHAR(50),
    description text,
    CONSTRAINT pk_theme PRIMARY KEY(id) 
)engine=innodb;

CREATE TABLE theme_publication(
    theme int,
    publication VARCHAR(10),
    CONSTRAINT fk_them_pub FOREIGN KEY
        (theme) REFERENCES theme(id),
    CONSTRAINT fk_pub_them FOREIGN KEY
        (publication) REFERENCES publication(id),
    CONSTRAINT pk_thm_pub PRIMARY KEY(theme, publication)
)engine=innodb;
