drop table game;
drop table player;

create table player (
	name varchar not null, 
	password varchar not null,
	Is_Deleted boolean default false, 
	id serial,
	primary key (id),
	UNIQUE (name),
	UNIQUE (id)
);

create table game (
	Winner integer not null,
	Loser integer not null,
	Amount integer not null,
	id serial,
	foreign key (Winner)
		references player(id)
		on delete cascade,
	foreign key (Loser)
		references player(id)
		on delete cascade,
	primary key (id),
	UNIQUE (id)
);

insert into player values (
	'anthager',
	'asdfahgjfuy865'
);
insert into player values (
	'simkarr',
	'asdfahgjfuy865'
);
insert into player values (
	'erjakob',
	'asdfahgjfuy865'
);
insert into game values (
	1,
	2,
	10
);
insert into game values (
	1,
	2,
	19
);
insert into game values (
	1,
	2,
	10
);
insert into game values (
	1,
	2,
	13
);
insert into game values (
	1,
	2,
	40
);
insert into game values (
	2,
	3,
	9
);
insert into game values (
	2,
	1,
	20
);
insert into game values (
	2,
	1,
	9
);
insert into game values (
	3,
	1,
	4
);
insert into game values (
	3,
	2,
	12
);