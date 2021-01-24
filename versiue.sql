create database PizzaRetea;
use PizzaRetea;

GO
create schema Restaurante;
GO

CREATE TABLE Restaurante.Restaurant
(
	ID int NOT NULL PRIMARY KEY,
	Nume varchar(150) NOT NULL,
	Adresa varchar(150) NOT NULL,
	Email varchar(150) NOT NULL,
	Telefon varchar(150) NOT NULL,
	Data_reg_SRL date NOT NULL
);
CREATE TABLE Restaurante.Meniu
(
	ID_Restaurant int NOT NULL PRIMARY KEY,
	Descriere varchar(300) NOT NULL
);
CREATE TABLE Restaurante.Bauturi
(
	ID int NOT NULL PRIMARY KEY,
	Nume varchar(150) NOT NULL,
	Cantitatea int NOT NULL,
	Procente_alcool int,
	Pretul int NOT NULL,
	Terment_EXP date NOT NULL,

	id_Meniu int NOT NULL
);
CREATE TABLE Restaurante.Mancare
(
	ID int NOT NULL PRIMARY KEY,
	Denumire_mancare varchar(150) NOT NULL,
	Cantitatea int default(200),
	Pretul int NOT NULL,
	Termen_EXP date NOT NULL,

	id_Meniu int NOT NULL
);
CREATE TABLE Restaurante.Angajat
(
	ID int NOT NULL PRIMARY KEY,
	Nume varchar(150) NOT NULL,
	Prenume varchar(80) NOT NULL,
	Email varchar(150) NOT NULL,
	Anul_Nasterii date NOT NULL,
	Telefon varchar(80) NOT NULL,
	Salariu varchar(80) NOT NULL,

	idDomeniu_Activitate int NOT NULL,
	Restaurant_ID int NOT NULL
);
CREATE TABLE Restaurante.Domeniu_Activitate
(
	ID int NOT NULL PRIMARY KEY,
    Domeniu varchar(150) NOT NULL
);
CREATE TABLE Restaurante.Client
(
	ID int NOT NULL PRIMARY KEY,
	Nume varchar(150) NOT NULL,
	Prenume varchar(80) NOT NULL,
	Email varchar(150) NOT NULL,
	Anul_Nasterii date NOT NULL,
	Telefon varchar(80) NOT NULL,

	id_Card_Reducere int
);
CREATE TABLE Restaurante.Comanda
(
	ID int NOT NULL PRIMARY KEY,
	achitat varchar(20) NOT NULL Default 'Nu',

	idAngajat int NOT NULL,
	idClient int NOT NULL
);
CREATE TABLE Restaurante.Bautura_Comandata
(
	idBautura int NOT NULL,
	idComanda int NOT NULL,
	PRIMARY KEY(idBautura,idComanda)
);
CREATE TABLE Restaurante.Mancare_Comandata
(
	idMancare int NOT NULL,
	idComanda int NOT NULL,
	PRIMARY KEY(idMancare,idComanda)
);
CREATE TABLE Restaurante.Card_Reducere
(
	ID int NOT NULL PRIMARY KEY,
	Denumire varchar(150) NOT NULL,
	Reducere_Procent varchar(80) NOT NULL,
	Tipul_Promotiei varchar (180)NOT NULL /*bauturi, mancare, mixt*/

);

/**********************************************************************************/
ALTER TABLE Restaurante.Meniu ADD Constraint restaurant_meniu_FK
FOREIGN KEY (ID_Restaurant) REFERENCES Restaurante.Restaurant(ID);

ALTER TABLE Restaurante.Bauturi ADD Constraint Bauturi_Meniu_FK
FOREIGN KEY (id_Meniu) REFERENCES Restaurante.Meniu(ID_Restaurant);

ALTER TABLE Restaurante.Mancare ADD Constraint Mancare_Meniu_FK
FOREIGN KEY (id_Meniu) REFERENCES Restaurante.Meniu(ID_Restaurant);

ALTER TABLE Restaurante.Angajat ADD Constraint Restaurant_Angajati_FK
FOREIGN KEY (Restaurant_ID) REFERENCES Restaurante.Restaurant(ID);

ALTER TABLE Restaurante.Angajat ADD Constraint Domeniideactivitate_Angajati_FK
FOREIGN KEY (idDomeniu_Activitate) REFERENCES Restaurante.Domeniu_Activitate(ID);

ALTER TABLE Restaurante.Client ADD Constraint cardReducere_clienti_FK
FOREIGN KEY (id_Card_Reducere) REFERENCES Restaurante.Card_Reducere(ID);

ALTER TABLE Restaurante.Comanda ADD Constraint angajat_comenzi_FK
FOREIGN KEY (idAngajat) REFERENCES Restaurante.Angajat(ID);

ALTER TABLE Restaurante.Comanda ADD Constraint client_comenzi_FK
FOREIGN KEY (idClient) REFERENCES Restaurante.Client(ID);

ALTER TABLE Restaurante.Bautura_Comandata ADD Constraint bautura_din_meniu__bauturi_comandate_FK
FOREIGN KEY (idBautura) REFERENCES Restaurante.Bauturi(ID);

ALTER TABLE Restaurante.Bautura_Comandata ADD Constraint comanda__bauturi_comandate_FK
FOREIGN KEY (idComanda) REFERENCES Restaurante.Comanda(ID);

ALTER TABLE Restaurante.Mancare_Comandata ADD Constraint mancare_din_meniu__bauturi_comandate_FK
FOREIGN KEY (idMancare) REFERENCES Restaurante.Mancare(ID);

ALTER TABLE Restaurante.Mancare_Comandata ADD Constraint comanda__mancare_comandate_FK
FOREIGN KEY (idComanda) REFERENCES Restaurante.Comanda(ID);