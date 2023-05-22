-- Database: pdv

-- DROP DATABASE IF EXISTS pdv;

CREATE DATABASE pdv
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE pdv
    IS 'Banco de dados para o Sistema Ponto de Venda (PDV)';

create table usuarios (
	id serial primary key,
  email varchar(100) not null unique,
  senha text not null,
  nome text not null
);

create table categorias (
	id serial primary key,
  descricao text not null
);

insert into categorias (descricao) values 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

create table produtos (
  id serial primary key,
  descricao text,
  quantidade_estoque integer,
  valor integer not null,
  categoria_id integer not null,
  foreign key (categoria_id) references categorias (id)
);

create table clientes (
  id serial primary key,
  nome text not null,
  email varchar(100) not null unique,
  cpf varchar(11) not null unique,
  cep varchar(8),
  rua text,
  numero integer,
  bairro text,
  cidade text,
  estado varchar(2)
);

create table pedidos (
  id serial primary key,
  cliente_id integer not null,
  observacao text,
  valor_total integer,
  foreign key (cliente_id) references clientes (id)
);

create table pedido_produtos (
  id serial primary key,
  pedido_id integer not null,
  produto_id integer not null,
  quantidade_produto integer not null,
  valor_produto integer not null,
  foreign key (pedido_id) references pedidos (id),
  foreign key (produto_id) references produtos (id)
);

ALTER TABLE produtos ADD COLUMN produto_imagem text default null;

ALTER TABLE produtos ADD COLUMN nome_imagem text default null;