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

ALTER TABLE Restaurante.Bauturi
DROP COLUMN Cantitatea;
ALTER TABLE Restaurante.Bauturi
ADD Cantitatea real;
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

INSERT INTO Restaurante.Restaurant(ID, Nume, Adresa, Email, Telefon, Data_reg_SRL)
VALUES (1, 'PizzaCorso', 'str.Alecu Russo','pizza@gmail.com','062139285','2005-07-11'),
       (2, 'PizzaCoripsa','str.Studentilor','pizzaCoripsa@gmail.com','069456398','2007-09-28');

Select * from Restaurante.Restaurant;


INSERT INTO Restaurante.Meniu(ID_Restaurant, Descriere)
VALUES (1, 'Meniu foarte gustos, cu multe feluri de ancare is bauturi'),
       (2, 'Meniu super!');

Select * from Restaurante.Meniu

INSERT INTO Restaurante.Bauturi(ID, Nume, Cantitatea, Procente_alcool, Pretul, Terment_EXP,id_Meniu)
VALUES (1, 'Cola',0.5, 0, 30,'2090-07-11',1),
       (2, 'Fanta',0.5, 0, 25,'2090-06-05',2),
	   (3, 'Bere Chisinau Ultra',0.5, 7, 45,'2024-05-20',2),
	   (4, 'Bere Chisinau Blonda',0.5, 9, 30,'2024-05-15',1),
	   (5, 'Wiskey',0.5, 45, 70,'2050-04-12',1),
	   (6, 'Suc de Mere',0.5, 0, 20,'2022-01-01',1),
	   (7, 'Vin',1.0, 0, 150,'2060-02-26',2);

Select * from Restaurante.Bauturi

INSERT INTO Restaurante.Mancare(ID, Denumire_mancare, Cantitatea, Pretul, Termen_EXP, id_Meniu)
VALUES (1, 'Pizza Diablo',300, 90,'2090-07-11',1),
       (2, 'Pizza Rancho',450, 120, '2090-06-05',2),
	   (3, 'Pizza Chesse',580, 80, '2024-05-20',2),
	   (4, 'Pizza cu Ardei',290, 70,'2024-05-15',1),
	   (5, 'Pizza cu Cascaval si Mezeluri',380, 85,'2050-04-12',1);

Select * from Restaurante.Mancare


INSERT INTO Restaurante.Domeniu_Activitate(ID, Domeniu)
VALUES (2, 'Administrator' ),
       (1, 'Chelner' ),
	   (3, 'Director' );

Select * from Restaurante.Domeniu_Activitate

INSERT INTO Restaurante.Angajat(ID, Nume, Prenume, Email, Anul_Nasterii, Telefon, Salariu, idDomeniu_Activitate,Restaurant_ID)
VALUES (1, 'Damean','Alexandra','s.damean@mail.ru', '1999-07-11','062182921','3000',1,2),
       (2, 'Muntean','Nicolae','nickmm@mail.ru', '1999-03-17','069635921','4000',1,1),
	   (3, 'Rechiu','Viorica','viorica@gmail.com', '2001-03-24','068862921','2500',1,2),
	   (4, 'Carpov','Daniel','carpovdenik@gmail.com', '1999-09-14','069123561','7000',1,2),
	   (5, 'Rusu','Alexandru','rusu0758@mail.ru', '2003-01-01','079653202','5000',2,1),
	   (6, 'Coada','Marina','maria_coada@mail.ru', '1997-04-03','069040203','3500',3,2),
	   (7, 'Moraru','Andrei','andrei.moraru@gmail.com', '1998-03-19','068253536','4000',1,1),
	   (8, 'Dorinu','Vasile','dorinu_vasile@mail.ru', '1996-09-12','079253632','2500',2,2),
	   (9, 'Melnic','Vladimir','melnic06@mail.ru', '1995-08-13','079253635','8000',3,1);

Select * from Restaurante.Angajat

INSERT INTO Restaurante.Card_Reducere(ID, Denumire, Reducere_Procent, Tipul_Promotiei)
VALUES (1, 'Gold','45%','Mancare' ),
       (2, 'Platium', '20%', 'Bautura' );

Select * from Restaurante.Card_Reducere

INSERT INTO Restaurante.Client(ID, Nume, Prenume, Email, Anul_Nasterii, Telefon, id_Card_Reducere) 
VALUES (1, 'Plamadeala','Cristian','plamadeala.02@mail.ru', '1999-07-11','062182921',1),
       (2, 'Polschii','Veaceslav','v.polschi@gmail.com', '2001-06-30','069856232',2),
	   (3, 'Vechiu','Anastasia','nasea_vechiu@mail.ru', '2000-01-01','078562100',1),
	   (4, 'Pulisca','Corina','pulisca033@gmail.com', '1998-07-03','086253214',2),
	   (5, 'Chirilita','Ivan','chirilita_02@mail.ru', '1990-04-23','069253414',1),
	   (6, 'Popov','Roman','roman_popov@mail.ru', '2000-09-26','069856532',2),
	   (7, 'Istrati','Sergiu','istrati_sergiu@gmail.com', '2003-09-02','079523265',1),
	   (8, 'George','Ilie','georgeIlie@mail.ru', '2003-07-12','062182977',2),
	   

INSERT INTO Restaurante.Client(ID, Nume, Prenume, Email, Anul_Nasterii, Telefon, id_Card_Reducere) 
Values (9, 'Vasiliuc','Angela','angela.@gmail.com','2000-06-12','076524139',NULL),
(10,'Bumajnii','Lena','lika_bum@mail.ru','1998-03-05','069585441',NULL);

Select * from Restaurante.Client

INSERT INTO Restaurante.Comanda(ID, achitat, idAngajat, idClient)
VALUES (1,'Da',1,1 ),
       (2,'Nu',1,8 ),
	   (3,'Nu',1,7 ),
	   (4,'Da',1,6 ),
	   (5,'Da',1,5 ),
	   (6,'Da',1,3 ),
	   (7,'Da',1,4 ),
	   (8,'Da',1,2 );

Select * from Restaurante.Comanda

INSERT INTO Restaurante.Bautura_Comandata(idBautura, idComanda)
VALUES (1,7),
       (2,3),
	   (3,5),
	   (4,7),
	   (5,6);

Select * from Restaurante.Bautura_Comandata
	 
  INSERT INTO Restaurante.Mancare_Comandata(idMancare, idComanda)
VALUES (1,7),
       (2,3),
	   (3,5),
	   (4,7),
	   (5,6);

Select * from Restaurante.Mancare_Comandata
/*----------------------------------------------------------*/
/*Indexsii*/
/*----------------------------------------------------------*/
CREATE INDEX idx_Mancare_Denumire
ON Restaurante.Mancare (Denumire_mancare);

/*----------------------------------------------------------*/
CREATE INDEX idx_Nume_Client
ON Restaurante.Client (Nume, Prenume);

/*----------------------------------------------------------*/
CREATE INDEX idx_Nume_Bautura
ON Restaurante.Bauturi (Nume);
/*----------------------------------------------------------*/
ALTER SCHEMA dbo TRANSFER Restaurante.Client
ALTER SCHEMA Restaurante TRANSFER dbo.Client
/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
CREATE SYNONYM clienti FOR Reastaurante.Clienti
CREATE SYNONYM activitati FOR Restaurante.Domeniu_Activitate
CREATE SYNONYM bautura_com FOR Restaurante.Bautura_Comandata
CREATE SYNONYM crd FOR Restaurante.Card_Reducere
/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
SELECT c.Nume, c.Prenume, cr.Reducere_Procent FROM Restaurante.Client as c 
LEFT OUTER JOIN Restaurante.Card_Reducere as cr ON c.id_Card_Reducere=cr.ID; 
/*----------------------------------------------------------*/
/*---------------Cientii care nu au achitat-------------------------------------------*/
SELECT b.Nume, b.Prenume FROM Restaurante.Client as b INNER JOIN Restaurante.Comanda as cm 
ON cm.idClient=b.ID 
WHERE cm.achitat='Nu';
/*----------------------------------------------------------*/
/*--Afisam toti anagajatii care au salarii mai mare de mediu-----------*/
SELECT * FROM Restaurante.Angajat as a WHERE ((SELECT avg(CAST(a1.Salariu as int))
FROM Restaurante.Angajat as a1)<a.Salariu);
/*--------------------------Persoanele care au achitat pe mancare mai mult de o 100--------------------------------*/
SELECT c.ID, c.Nume, c.Prenume, sum(m.Pretul) as Cheltuieli_Totale_Mancare 
FROM Restaurante.Client as c
INNER JOIN Restaurante.Comanda as cm ON c.ID=cm.idClient
INNER JOIN Restaurante.Mancare_Comandata as mc ON mc.idComanda=cm.ID
INNER JOIN Restaurante.Mancare as m ON m.ID=mc.idMancare
GROUP BY c.ID, c.Nume, c.Prenume
HAVING sum(m.Pretul)>100;
/*----------------------------------------------------------*/
/*-----------PRIMA-----------------------------------------------*/
GO
CREATE VIEW [Persoane_care_au_achitat_mai_mult_de_100] as 
SELECT c.ID, c.Nume, c.Prenume, sum(m.Pretul) as Cheltuieli_Totale_Mancare 
FROM Restaurante.Client as c
INNER JOIN Restaurante.Comanda as cm ON c.ID=cm.idClient
INNER JOIN Restaurante.Mancare_Comandata as mc ON mc.idComanda=cm.ID
INNER JOIN Restaurante.Mancare as m ON m.ID=mc.idMancare
GROUP BY c.ID, c.Nume, c.Prenume
HAVING sum(m.Pretul)>100;
GO
/*-------------A doua---------------------------------------------*/
GO
CREATE VIEW [Angajat_cu_Salariu_mai_mare_de_mediu] as
SELECT * FROM Restaurante.Angajat as a WHERE ((SELECT avg(CAST(a1.Salariu as int))
FROM Restaurante.Angajat as a1)<a.Salariu);
GO
/*----------------------------------------------------------*/

CREATE VIEW [Clientii_Restaurantului] as
Select * from Restaurante.Client;
/*----------------------------------------------------------*/
INSERT INTO [Clientii_Restaurantului] VALUES  (20, 'George','Ilie','georgeIlie@mail.ru', '2003-07-12','062182977',1);
/*----------------------------------------------------------*/
UPDATE [Clientii_Restaurantului] SET id_Card_Reducere=NULL WHERE Prenume='Ilie';
/*----------------------------------------------------------*/
DELETE FROM [Clientii_Restaurantului] WHERE id_Card_Reducere = NULL;
/*----------------------------------------------------------*/
/*----------------Numele prenumele chelnerului care a deservit clientul cu id pus de mine------------------------------------------*/
GO
CREATE PROCEDURE deservire_client
	@idClient int
	
AS

SELECT a.Nume, a.Prenume FROM Restaurante.Comanda as c 
INNER JOIN Restaurante.Angajat as a ON c.idAngajat=a.ID
WHERE c.idClient=@idClient;

EXECUTE deservire_client 1

/*-----------------------angajatii mai mici de 2000-----------------------------------*/
GO
CREATE PROCEDURE angajatii_virsta

AS

SELECT * FROM Restaurante.Angajat as b WHERE YEAR(b.Anul_Nasterii)>2000;

EXECUTE angajatii_virsta;
/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
GO
CREATE FUNCTION nume_angajati (@idRestik int)
RETURNS TABLE
AS

RETURN(
SELECT Nume,Prenume  FROM Restaurante.Angajat as a 
WHERE a.Restaurant_ID=@idRestik
)
GO

Select * from nume_angajati(1);
/*-----------Afiseaza numeleprenumele clientilor care ua comandat bautura de 0.5-----------------------------------------------*/
GO
CREATE FUNCTION bautura_comandata ()
RETURNS TABLE
AS

RETURN(
Select c.Nume, c.Prenume from Restaurante.Client as c 
INNER JOIN Restaurante.Comanda as cm ON cm.idClient=c.ID
INNER JOIN Restaurante.Bautura_Comandata as b ON b.idComanda=cm.ID
INNER JOIN Restaurante.Bauturi as ba ON ba.ID=b.idBautura
WHERE ba.Cantitatea=0.5
)
GO
SELECT * FROM bautura_comandata();

