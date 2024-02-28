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

select * from apuestas;

select Logo from Equipos 
where id = 1;
order by id;
where nombreEquipo = 'Cóndor';

select * from Partidos;

alter table Partidos
add column factorLocal float;

alter table Partidos
add column factorVisita float;

alter table Partidos
add column factorEmpate float;

create table traspasoPartidos(
	nombreEquipoLocal varchar(200),
	nombreEquipoVisitante varchar(200),
	fechaPartido varchar(200),
	horaPartido varchar(200),
	factorLocal varchar(200),
	factorVisitante varchar(200),
	factorEmpate varchar(200),
	division varchar(200)
);

copy traspasoEquipos
-- windows
-- from 'C:\Rendimiento\Rendimiento por estudiante 2002.csv' delimiter ';' csv header;
-- MAC
from '/Users/Shared/EquiposTraspaso.csv' delimiter ';' csv header;

insert into Equipos(nombreEquipo, liga, logo)
select rtrim(t.nombreEquipo), rtrim(t.division), null from traspasoEquipos t;

drop table traspasoEquipos;

copy traspasoPartidos
-- windows
-- from 'C:\Rendimiento\Rendimiento por estudiante 2002.csv' delimiter ';' csv header;
-- MAC
from '/Users/Shared/PartidosTaspaso.csv' delimiter ';' csv header;

select * from traspasoPartidos;
INSERT INTO Partidos(
	id, idequipolocal, idequipovisitante, 
	fechapartido, horapartido, estadopartido, 
	division, factorlocal, factorvisita, factorempate)
select generar_id_partidos(), eLocal.id, eVisita.id,
rtrim(t.fechaPartido), rtrim(t.horaPartido), 'Activo',
rtrim(t.division), replace(rtrim(t.factorLocal), ',', '.')::float, 
replace(rtrim(t.factorVisitante), ',', '.')::float, 
replace(rtrim(t.factorEmpate), ',', '.')::float
from traspasoPartidos t
join Equipos eLocal on eLocal.nombreEquipo = t.nombreEquipoLocal
join Equipos eVisita on eVisita.nombreEquipo = t.nombreEquipoVisitante

CREATE OR REPLACE FUNCTION generar_id_partidos(
	)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
    nuevo_id VARCHAR;
begin
    nuevo_id := substr(md5(random()::text), 1, 12);
	while exists (select 1 from Partidos where id = nuevo_id) loop
        nuevo_id := substr(md5(random()::text), 1, 12);
    end loop;
    return nuevo_id;
end;
$BODY$;

select generar_id_partidos();

select * from Partidos;


