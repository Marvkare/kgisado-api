CREATE DATABASE IF NOT EXISTS kgisadodb 
SHOW DATABASES
USE  kgisadodb

CREATE TABLE IF NOT EXISTS `kgisadodb`.`Proveedores_has_Platillos` (
  `Proveedores_idProveedores` INT NOT NULL,
  `Platillos_idPlatillos` INT NOT NULL,
  PRIMARY KEY (`Proveedores_idProveedores`, `Platillos_idPlatillos`),
  INDEX `fk_Proveedores_has_Platillos_Platillos1_idx` (`Platillos_idPlatillos` ASC) VISIBLE,
  INDEX `fk_Proveedores_has_Platillos_Proveedores1_idx` (`Proveedores_idProveedores` ASC) VISIBLE,
  CONSTRAINT `fk_Proveedores_has_Platillos_Proveedores1`
    FOREIGN KEY (`Proveedores_idProveedores`)
    REFERENCES `kgisadodb`.`Proveedores` (`idProveedores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Proveedores_has_Platillos_Platillos1`
    FOREIGN KEY (`Platillos_idPlatillos`)
    REFERENCES `kgisadodb`.`Platillos` (`idPlatillos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB