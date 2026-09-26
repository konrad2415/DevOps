# Mail SERVER POC deploying Docker over Debian Based

## VPS Provider -  
  * El VPS provider de ETECSA genera automaticamente registros A/PTR con hostname e IP del pool publico disponibles.
    Estos punteros DNS no son transferibles ni modificables bajo las reglas del service provider.
    
    [Consultar la documentacion](https://github.com/konrad2415/DevOps/blob/main/002-vps-mail-serv/ETECSA-VPS-Management.md)
  * FQDN - Fully qualify domain name
    Hostname de ETECSA
    DNS : *-206152.vps.etecsa.cu  
    IP  : 152.216.*.* 
    Etecsa controla el registro A y el PTR que resuelve el el DNS a partir de la IP asociado alhostname geerado automaticamente 
    tras la creacion de la VM.
    el A es generado automáticamente;
      * el PTR es generado automáticamente;
      * el cliente no puede modificarlo;
      * no se puede subdelegar esa autoridad;
      * para correo, el servidor debe anunciarse utilizando ese hostname.

> **Comprovaciones:**
>
> ```bash
> dig -x 152.206.201.17 +short
> srv***-206152.vps.etecsa.cu. 
> ```

     * Por este registro PTR inverso al hostname autogenerado aunque los records MX y A apunten correctamente a nuestro dominio publicado el servidor de correo no funcionara correctamente.
     * Se requiere que los punteros MX usen el hotname en forma de un CNAME 
     * Registro a realizar mail.ztech.us.ci CNAME → srv**-206152.vps.etecsa.cu.
     * En este caso de uso de VPS el nombre de nuestro DNS o zona creada debe ser referenciado como un alias amigable para que la identidad funcione apropiadamente.
     * Lo importante a notar es que el proveedor de VPS nos obliga en este caso a usar un CANONICAL NAME (identificados o hostname) diferente del CNAME o nombre amigable para usuarios y busones de correo.
TLS Policy
  Se hará uso de 2 certificados TLS uno para nuestro dominio: mail.ztech.us.ci y otro para el hostname EHLO -> srv**-206152.vps.etecsa.cu
  EL VPS Provider espera que hagamos 
  ztech.us.ci (Dominio) ---->DNSHE DNS Provider 
     DNSHE       -> VPS Pointer
     MX record   -> VPS Hostname 
     TXT records -> SPF/DKIM/DMARC (Aunque este VPS y cuenta con DKIM y DMARK)



## FREE DNS Srvice provider : DNSHE.
## Install

### DMARK: 
    Type:TXT
    Name:_dmarc
    Content:v=DMARC1; p=none; rua=mailto:dmarc@ztech.us.ci
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
