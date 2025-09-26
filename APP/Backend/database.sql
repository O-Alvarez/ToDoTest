drop database ToDoDB;
create database if not exists ToDoDB;
use ToDoDB;

create table users(
  id_user int not null auto_increment primary key,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  mail varchar(255) not null unique,
  password_hash varchar(255) not null,
  created_at timestamp not null default current_timestamp,
  update_at timestamp default current_timestamp on update current_timestamp
);

create table Projects(
	id_project int not null auto_increment primary key,
    id_user int not null,
    title varchar(255),
    description text,
    status enum('analisis','proceso','finalizado') not null default 'analisis',
    expiration_date timestamp,
    delay_time timestamp,
	created_at timestamp not null default current_timestamp,
	update_at timestamp default current_timestamp on update current_timestamp,
    constraint fk_projects_by_users
		foreign key (id_user) references users(id_user)
        on delete cascade
);

create table categories(
	id_category int not null auto_increment primary key,
    id_project int not null,
    description varchar(255) not null,
	color enum 	('verde', 'rojo', 'amarillo', 'azul') not null default 'verde',
    created_at timestamp not null default current_timestamp,
	update_at timestamp default current_timestamp on update current_timestamp,
    constraint fk_categories_by_projects
		foreign key (id_project) references Projects(id_project)
        on delete cascade
);

create table Tasks(
	id_task int not null auto_increment primary key,
    id_project int not null,
    id_category int not null,
    title varchar(255) not null,
    description text,
    priority enum ('alta','media', 'baja') not null default 'baja',
    expiration_date timestamp,
    created_at timestamp not null default current_timestamp,
	update_at timestamp default current_timestamp on update current_timestamp,
    constraint fk_tasks_by_projects
      foreign key (id_project) references Projects(id_project)
      on delete cascade,
	constraint fk_tasks_by_categories
	  foreign key (id_category) references categories(id_category)
      on delete cascade
);


create table sessions(
	id_session int not null auto_increment primary key,
    id_user int not null,
    token varchar(255) not null,
    user_agent text,
    ip_address varchar(45),
    created_at timestamp not null default current_timestamp,
    expiration_date timestamp,
    status boolean default true,
    constraint fk_sessions_by_users 
		foreign key (id_user) references users(id_user)
        on delete cascade
);