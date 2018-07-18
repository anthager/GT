drop table game;
drop table player;

create table player (
	Username varchar, 
	Is_Deleted boolean default false, 
	id serial,
	primary key (id)
);

create table game (
	id serial,
	Winner integer,
	Loser integer,
	foreign key (Winner)
		references player(id)
		on delete cascade,
	foreign key (Loser)
		references player(id)
		on delete cascade,
	primary key (id)
);

insert into player values (
	'anthager'
);