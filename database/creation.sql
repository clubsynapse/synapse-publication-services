create database if not exists publications_synapse;
use publications_synapse;

create table publication(
    id varchar(10),
    titre varchar(50),
    contenu text,
    active boolean,
    datepub date,
    heure time,
    auteur varchar(20),
    CONSTRAINT pk_publication PRIMARY KEY(id)
) engine=innodb;

CREATE TABLE vote(
    userID VARCHAR(20),
    publication VARCHAR(10),
    CONSTRAINT pk_vote PRIMARY KEY(userID,publication),
    CONSTRAINT fk_vote_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine=innodb;

CREATE TABLE signalement(
    userID VARCHAR(20),
    publication VARCHAR(10),
    raison text,
    CONSTRAINT pk_signal PRIMARY KEY(userID,publication),
    CONSTRAINT fk_signal_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine=innodb;


create TABLE note_suppression(
    userID VARCHAR(20),
    publication VARCHAR(10),
    note text,
    CONSTRAINT fk_note_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine = innodb;

CREATE TABLE commentaire(
    id int,
    contenu text,
    datepub date,
    heure time,
    auteur VARCHAR(20),
    publication VARCHAR(10),
    CONSTRAINT pk_comment PRIMARY KEY(id,publication),
    CONSTRAINT fk_com_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine = innodb;

CREATE TABLE theme(
    id int,
    titre VARCHAR(50),
    description text,
    CONSTRAINT pk_theme PRIMARY KEY(id) 
)engine=innodb;

CREATE TABLE theme_publication(
    theme int,
    publication VARCHAR(20),
    CONSTRAINT fk_them_pub FOREIGN KEY
        (theme) REFERENCES theme(id),
    CONSTRAINT fk_pub_them FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine=innodb;

CREATE TABLE remarque(
    auteur VARCHAR(20),
    publication VARCHAR(10),
    contenu text,
    CONSTRAINT fk_rem_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine=innodb;

CREATE TABLE formulaire(
    id int,
    titre VARCHAR(50),
    url VARCHAR(100),
    publication VARCHAR(10),
    CONSTRAINT pk_form PRIMARY KEY(id,publication),
    CONSTRAINT fk_form_pub FOREIGN KEY
        (publication) REFERENCES publication(id)
)engine=innodb;

CREATE TABLE fichier_publication(
    id int,
    titre VARCHAR(50),
    url VARCHAR(100),
    typefichier VARCHAR(20),
    publication VARCHAR(10),
    CONSTRAINT fk_fic_pub FOREIGN KEY
        (publication) REFERENCES publication(id),
    CONSTRAINT pk_form PRIMARY KEY(id,publication)
)engine=innodb;

CREATE TABLE fichier_commentaire(
    id int,
    titre VARCHAR(50),
    url VARCHAR(100),
    typefichier VARCHAR(20),
    publication VARCHAR(10),
    commentaire int,
    CONSTRAINT fk_fic_com_pub FOREIGN KEY
        (publication) REFERENCES publication(id),
    CONSTRAINT pk_form PRIMARY KEY(id,publication, commentaire)
)engine=innodb;