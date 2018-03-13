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

create TABLE note_suppression(
    user VARCHAR(20),
    publication VARCHAR(10),
    note text,
    CONSTRAINT fk_note_pub FOREIGN KEY
        publication REFERENCES publication(id)
)engine = innodb;

CREATE TABLE commentaire(
    id int auto_increment,
    contenu text,
    datepub date,
    heure time,
    auteur VARCHAR(20),
    publication VARCHAR(10),
    CONSTRAINT pk_comment PRIMARY KEY(id),
    CONSTRAINT fk_com_pub FOREIGN KEY
        publication REFERENCES publication(id)
)