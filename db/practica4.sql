


/* Datos de aerolinea*/
insert into aerolinea (idAerolinea, No_vuelo, Tipo_de_avion, No_viajes) values(123, 6, "Comercial", 26);
insert into aerolinea (idAerolinea, No_vuelo, Tipo_de_avion, No_viajes) values(456, 8, "Turista", 845);
insert into aerolinea (idAerolinea, No_vuelo, Tipo_de_avion, No_viajes) values(789, 8, "Turista", 45);
insert into aerolinea (idAerolinea, No_vuelo, Tipo_de_avion, No_viajes) values(-321, 6, "Comercial", 548);
/*Datos de vuelos*/
insert into Vuelos (idVuelos, Destino, No_de_vuelo, No_de_pasajeros,AEROLINEA_idAerolinea) values(1, "Mérida", 5478, 120, 123);
insert into Vuelos (idVuelos, Destino, No_de_vuelo, No_de_pasajeros,AEROLINEA_idAerolinea) values(2, "Cancún", 7854, 120, 456);
insert into Vuelos (idVuelos, Destino, No_de_vuelo, No_de_pasajeros,AEROLINEA_idAerolinea) values(3, "Tijuana", 4579, 110, 789);
insert into Vuelos (idVuelos, Destino, No_de_vuelo, No_de_pasajeros,AEROLINEA_idAerolinea) values(4, "Nueva York", 8744, 150, 321);
insert into Vuelos (idVuelos, Destino, No_de_vuelo, No_de_pasajeros,AEROLINEA_idAerolinea) values(5, "México", 8567, 120,321);
/*Datos de clientes */

insert into clientes (idClientes,Nombre,Apellido,Pasaporte) values(1, "Yared", "Ramírez", "ASDF7854");
insert into clientes (idClientes,Nombre,Apellido,Pasaporte) values(2, "Mauricio", "Pérez", "QWERF752");
insert into clientes (idClientes,Nombre,Apellido,Pasaporte) values(3, "Perla", "Jiménez", "TREWW74");
insert into clientes (idClientes,Nombre,Apellido,Pasaporte) values(4, "Mariana", "Ordoñez", "ASDJF7445");
insert into clientes (idClientes,Nombre,Apellido,Pasaporte) values(5, "Juan", "López", "WQERIO7852");
insert into clientes (idClientes,Nombre,Apellido,Pasaporte) values(7, "Pedro", "Benítez", "QWEXX4252");
insert into clientes (idClientes,Nombre,Apellido,Pasaporte) values(8, "Sofía", "Reyes", "KAIIE7413");
insert into clientes (idClientes,Nombre,Apellido,Pasaporte) values(9, "María", "Ramírez", "WERT7852");