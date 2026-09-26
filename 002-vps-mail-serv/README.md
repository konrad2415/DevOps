# Mail SERVER POC deploying Debian Based

## VPS Provider - ETECSA Service 
  * ETECSA VPS genera automaticamente registros A/PTR con hostname e IP del pool publico disponible.
    Estos punteros DNS no son transferibles ni modificables bajo las reglas del service provider.
    Consultar la documentacion provista en el anexo especificado. en el archivo: ETECSA-VPS-Management.md 
## FREE DNS Srvice provider : DNSHE.
## Install
.
## Config Files and folders
.
###   Protect DNS from becoming Open Resolver on recurssion 
* allow-recursion {} directive
* allow-query {} directive
* Builtin and custom ACL's
* Disable/enable Recurse
## Bind Management 

### RNDC tool

### systemctl toolset

### Verifying Config and Zones
 * named-checkconf
 * named-checkzone

### Practica de Bind Management 

## Gestion de Zonas 
### Zona directa para main/slave
   * Registers kindof A/AAAA/CNAME/MX/TXT/SRV/NS/PTR
   * Exercise mitux.es Direct Zone

### Zona inversa main/slave
   * 
# DevOps -DNS POC deploying Debian Based
## Install
.
## Config Files and folders
.
## Recursive DNS
###   Protect DNS from becoming Open Resolver on recurssion 
* allow-recursion {} directive
* allow-query {} directive
* Builtin and custom ACL's
* Disable/enable Recurse
## Bind Management 
### RNDC tool
### systemctl toolset
### Verifying Config and Zones
 * named-checkconf
 * named-checkzone

### Practica de Bind Management 
