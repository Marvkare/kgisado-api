/* eliminar una base de datos*/
DROP DATABASE IF NOT EXISTS kgisadodb
/*Crear un bse de datos*/
CREATE DATABASE IF NOT EXISTS kgisadodb 
/*Ver las bases de datos que tenemos*/
SHOW DATABASES
/*Usar las bases de datos*/
USE  kgisadodb

/*Crear una tabla si no existe*/
CREATE TABLE IF NOT EXISTS `kgisadodb`.`Compradores` (
  `idCompradores` INT NOT NULL,
  `PrimerNombre` VARCHAR(45) NOT NULL,
  `SegundoNombre` VARCHAR(45) NOT NULL,
  `PrimerApellido` VARCHAR(45) NOT NULL,
  `SegundoApellido` VARCHAR(45) NOT NULL,
  `Direccion` VARCHAR(45) NOT NULL,
  `Num.Telefono` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCompradores`))
ENGINE = InnoDB

/*Ver las tablas que tenemos*/
SHOW TABLES
/*Renombrar una tabla*/
RENAME TABLE 
/*Renombrar una columna*/
ALTER TABLE nombretabla CHANGE npmbreactualcolumn nombrenuevo tipo de dato 
/* visualizar la estructura de cualquier tabla de nuestra base de datos*/
DESCRIBE Compradores
/* Compradores*/

/*Eliminar tabla*/
DROP TABLE Compradores
