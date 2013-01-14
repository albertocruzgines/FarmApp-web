
CREATE DATABASE FarmApp;

create table usuarios
(
	id_usuario int not null auto_increment primary key,
	email varchar(255) not null,
	password varchar(255) not null,
	nombre varchar(255),
	apellidos varchar(255),
	direccion varchar (255),
	ciudad varchar (255),
	telefono varchar (20),
	id_tipo int not null,
	foreign key (id_tipo) references tipo_usuario(id_tipo)
);

create table tipo_usuario
(
	id_tipo int not null auto_increment primary key,
	rol varchar (255) not null
);

create table pedidos
(
	id_pedido int not null auto_increment primary key,
	id_usuario int not null,
	fecha timestamp not null,
	foreign key (id_usuario) references usuarios(id_usuario)
);

create table pedidos_farm_prod
(
	id_pedido int not null,
	id_farmprod int not null,
	cantidad int not null,
	foreign key (id_pedido) references pedidos (id_pedido),
	foreign key (id_farmprod) references farm_prod (id_farmprod)
);


create table farm_prod
(
	id_farmprod int not null auto_increment primary key,
	id_farmacia int not null,
	id_producto int not null,
	precio float not null,
	stock int not null,
	foreign key (id_farmacia) references farmacias(id_farmacia),
	foreign key (id_producto) references productos(id_producto)
);

create table farmacias
(
	id_farmacia int not null auto_increment primary key,
	nombre varchar (255) not null,
	direccion varchar (255) not null,
	horario varchar (255) not null,
	id_admin int not null,
	foreign key (id_admin) references usuarios(id_usuario)
);

create table productos
(
	id_producto int not null auto_increment primary key,
	nombre varchar (255) not null,
	tipo varchar (255) not null,
	cantidad varchar (255) not null,
	descripcion text not null,
	receta boolean
);