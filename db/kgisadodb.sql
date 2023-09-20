CREATE DATABASE IF NOT EXISTS kgisadodb 
SHOW DATABASES
USE  kgisadodb

CREATE TABLE IF NOT EXISTS `kgisadodb`.`Usuario_has_Platillos` (
  `Usuario_idUsuario` INT NOT NULL,
  `Platillos_idPlatillos` INT NOT NULL,
  PRIMARY KEY (`Usuario_idUsuario`, `Platillos_idPlatillos`),
  INDEX `fk_Usuario_has_Platillos_Platillos1_idx` (`Platillos_idPlatillos` ASC) VISIBLE,
  INDEX `fk_Usuario_has_Platillos_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_has_Platillos_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `kgisadodb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_has_Platillos_Platillos1`
    FOREIGN KEY (`Platillos_idPlatillos`)
    REFERENCES `kgisadodb`.`Platillos` (`idPlatillos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

INSERT INTO rol (idRol, Nombre) VALUES(0, "Administrador"), (1, "Comprador"),(2, "Proveedor"),(3, "Repartidor");
INSERT INTO tipo_de_pago (idTipo_de_pago,Nombre) VALUES (0,"efectivo");
INSERT INTO pedido_status (idPedidoStatus,NombrePedidosStatus) VALUES (0,"Pedido echo"), (1,"Pedido aceptado por provedor"),
(2,"Pedido listo para envio"), (3,"Pedido En camino"), (4,"Pedido llego a su destino"), (5,"Pedido pagado y haceptado");

CREATE TABLE IF NOT EXISTS `kgisadodb`.`Usuario_has_Platillos`(

);

CREATE TABLE IF NOT EXISTS `kgisadodb`.`Rol` (
  `idRol` INT NOT NULL,
  `Nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idRol`),
  UNIQUE INDEX `idRol_UNIQUE` (`idRol` ASC) VISIBLE,
  UNIQUE INDEX `Name_UNIQUE` (`Nombre` ASC) VISIBLE)
ENGINE = InnoDB




insert into alumno (Numerocontrol, Nombre, Apellido, Fecha, Telefono, Direccion) 
values(211150148,"Miguel","Reyes","28/02/1998","7731756740", "Federico engels");