

#Modulos que necesitaremos

express
nodemon
morgan
Endpoint o rutas 



## Cliente res
extencion vscode thunder cliente


rutas Compradores
get /compradores Nos muestra una lita de compradores
get /comprador/:id Nos muetra un comprador espesifico dando un id
post /compradores/id: Nos agrega un nuevo comprador a la base de datos
patch /compradores/id: Actualiza los datos del comprador que tenga el ide enviado
delete /compradore/id: elimina el usuario con su id
register/ :
login / : 
logout / 

rutas Platillos
Para poder agregar un platillo necesitamos tener un usuario y tener
un token de autenticacion, y este lo obtenemos en la ruta login una ves 
teniendo el token el toque lo enviamos a traves del objeto req.body