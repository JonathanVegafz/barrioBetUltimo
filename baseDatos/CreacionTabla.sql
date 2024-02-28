create table Equipos(
	id serial primary key,
	nombreEquipo varchar(200),
	liga varchar(200)
);



alter table Equipos
add column logo bytea;

create table Partidos(
	id varchar(200) primary key,
	idEquipoLocal int,
	idEquipoVisitante int,
	foreign key (idEquipoLocal)
	references Equipos(id),
	foreign key (idEquipoVisitante)
	references Equipos(id),
	fechaPartido varchar(200),
	horaPartido varchar(200),
	estadoPartido varchar(200),
	division varchar(200)
);

alter table Partidos
add column factorLocal float;

alter table Partidos
add column factorEmpate float;

alter table Partidos
add column factorVisita float;

create table Apuestas(
	id serial,
	idPartido varchar(200),
	primary key (id, idPartido),
	foreign key (idPartido)
	references Partidos(id),
	nombreApostador varchar(200),
	emailApostador varchar(200), 
	fechaApuesta varchar(200),
	apuesta varchar(200),
	factorApuesta varchar(200),
	cantidadApostada varchar(200)
);

create table traspasoEquipos(
	nombreEquipo varchar(200),
	liga varchar(200)
);

drop table Equipos;
drop table Partidos;
drop table Apuestas;

select * from Equipos
order by id;
where nombreEquipo = 'Cóndor';

select * from Partidos;

alter table Partidos
add column factorLocal float;

alter table Partidos
add column factorVisita float;

alter table Partidos
add column factorEmpate float;

copy traspasoEquipos
-- windows
-- from 'C:\Rendimiento\Rendimiento por estudiante 2002.csv' delimiter ';' csv header;
-- MAC
from '/Users/Shared/EquiposTraspaso.csv' delimiter ';' csv header;

insert into Equipos(nombreEquipo, liga, logo)
select rtrim(t.nombreEquipo), rtrim(t.division), null from traspasoEquipos t;




