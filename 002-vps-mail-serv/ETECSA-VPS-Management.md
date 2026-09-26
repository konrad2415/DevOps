

---

## Escenarios

Para el manejo de los servicios de nombre existen 2 escenarios posibles, ambos le brindan al servicio VPS la flexibilidad necesaria para el uso de casi cualquier aplicación:

1. **Servicio DNS "Administrado por un Tercero"**  
   Este caso incluye el servicio administrado por ETECSA u otro proveedor.

2. **Servicio DNS "Auto administrado"**  
   Donde el cliente administra su DNS delegando con su proveedor de Dominio la zona contratada hacia la IP asignada a su VPS u otro recurso que posea.

Tanto en el caso de que el cliente desee que su zona de dominio esté alojada en un servicio de terceros o desee alojarla en sus propios servicios, deberá tener en cuenta que:

- Para reconocer cualquier tipo de registro DNS se debe crear primeramente la **zona DNS** correspondiente al dominio contratado.
- Para referirse a su VPS por otro nombre distinto al asignado automáticamente, deberá crear (o solicitar al servicio de terceros) un registro tipo **CNAME** (alias) haciendo la referencia explícita al nombre generado automáticamente durante el proceso de creación de su MV (`srv4to3er-2do1er.vps.etecsa.cu`).

**Ejemplo:**  
Para referirse con otro nombre (ejemplo `www`) al host `srv5177-206152.vps.etecsa.cu`, bajo el dominio `MI.DOMINIO.CU`:

```dns
www IN CNAME srv5177-206152.vps.etecsa.cu.
```

---

## Aplicación

Comúnmente usado para aplicaciones y sitios web, donde el cliente hace referencia a su VPS con un nombre de dominio contratado. Cuando se desee obtener el nombre del host a partir de su IP, como resultado se obtendrá el nombre generado automáticamente.

**Ejemplo:**  
Si se deseara obtener el nombre correspondiente a la IP `152.206.177.5`, se obtendrá como respuesta:

```dns
5.177.206.152.addr.arpa. IN PTR srv5177-206152.vps.etecsa.cu.
```

> **Si desea alojar un servicio de correos**, deberá crear los registros tipo **TXT** (SPF, DKIM, DMARC) y **MX** correspondientes a los dominios a aceptar en entrada y/o salida, indicando los nombres automáticamente generados durante la creación de la MV.

**Ejemplo: Registro SPF para el dominio `MI.DOMINIO.CU`:**

```dns
mi.dominio.cu. 3600 IN TXT "v=spf MX a a:srv5177-206152.vps.etecsa.cu -all"
```

**Ejemplo: Registro DKIM para el dominio `MI.DOMINIO.CU`:**

- **Selector:** `KEY2048`
- **Key:** `p=*`

```dns
KEY2048._domainkey.mi.dominio.cu. IN TXT "v=DKIM1; k=rsa;
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYFzuCksBxMyqnc+Y4grmNIjyBnK2JcKg
HuZrn4m5Cfm2yy1Es0y3P0y2R4iHuWwqhP7UOo/vMcDzf4cQ+aa/V1jBYB5sM/nB6olBBcBXnm1pdjt
mkpBH7Hc4y/yBBNBF/f6vEN+iZN9zEE9PkEXHomm0DRfEZgn563CUUK9o8+QIDAQAB"
```

**Ejemplo: Registro MX para el dominio `MI.DOMINIO.CU`:**

```dns
@ IN MX 10 srv5177-206152.vps.etecsa.cu.
```

Adicionalmente, el servidor emisor de correos deberá anunciarse al servidor destino con el nombre generado automáticamente durante la creación de la MV. Según el ejemplo anterior: `srv5177-206152.vps.etecsa.cu`.

---

## Descripción de los registros DNS más comúnmente usados

### Registro tipo NS

Un registro NS hace referencia al servidor de nombres de un archivo de zona y determina dónde recae la responsabilidad de una zona concreta. Es, por ello, un registro obligatorio en todo archivo de zona. Este registro de recurso indica al servidor DNS si es responsable de una solicitud o no, es decir, si tiene que organizar la zona en cuestión, o bien a quién tiene que reenviar la solicitud.

### Registro tipo A

La mayor parte de resoluciones de nombres de dominio en Internet se producen mediante registros tipo A, que contienen una dirección IPv4 en su campo de datos. Gracias a ellos, los usuarios de Internet pueden introducir un nombre de dominio en el navegador y hacer que el cliente envíe automáticamente una solicitud HTTP a la dirección IP correspondiente. Puesto que el tamaño de las direcciones IP siempre es de 4 bytes, el valor de `rdlength` también es siempre 4, si es que aparece.

### Registro tipo PTR

El registro PTR (*pointer*) es un registro DNS que permite una búsqueda inversa o *reverse lookup*. Con ella, el servidor DNS puede indicar qué nombres de host pertenecen a una dirección IP concreta. Para cada dirección IP usada en registros tipo A o AAAA existe, por consiguiente, un registro PTR. La dirección IP se forma en este caso en orden opuesto y se le añade, además, el nombre de una zona.

### Registro tipo CNAME

Un registro CNAME (*canonical name record*) contiene un alias, es decir, un nombre alternativo para un dominio, y remite a otro registro A o AAAA ya existente. El campo `rdata` en este tipo de registros lo ocupa, por lo tanto, un nombre de dominio previamente enlazado con una dirección IP. Así se pueden remitir varias direcciones diferentes al mismo servidor.

### Registro tipo TXT

Los registros TXT contienen texto, ya sea como fuente de información para usuarios humanos o para ser leído maquinalmente. En estos registros DNS, el administrador puede alojar texto no estructurado (a diferencia de los datos estructurados de otros registros DNS). Se pueden añadir también, por ejemplo, detalles sobre la empresa a la que pertenece el dominio. Dentro de este tipo de registro se encuentran DMARC, SPF y DKIM utilizados en servicios de mensajería.

### Registro tipo MX

El nombre del registro MX es una abreviación de *mail exchange*, intercambio que se produce mediante un servidor SMTP de correo electrónico. Aquí se definen uno o varios servidores de correo electrónico que pertenezcan al dominio en cuestión. Si se usan varios servidores de correo, por ejemplo, para compensar fallos, se establecen niveles de prioridad. De esta manera, el DNS reconoce en qué orden debe realizar las solicitudes de contacto.

---

## Cómo proceder si quiero que ETECSA administre mis Nombres de Dominio para el servicio VPS

### Detalles del proceder

I. Solicitar a la autoridad reguladora (CITMATEL) su dominio bajo `NAT.CU` y que delegue el mismo hacia los DNS públicos de ETECSA.

> Por lo que, cuando el cliente le solicite a CITMATEL (o la entidad reguladora) la creación del dominio deseado, adicionalmente deberá indicar los nombres de host (o las IPs) de los servidores de DNS.

II. Una vez creado el dominio y se verifique su correcto funcionamiento, el cliente procederá a solicitar los registros requeridos para poder alcanzar sus servicios.

Una manera de comprobar que este proceso ya fue hecho es mediante los siguientes comandos:

**Windows:**

```cmd
nslookup -type=NS
```

**Linux:**

```bash
dig
```

Esta solicitud de registros DNS se tramitará mediante el área Comercial y deberá el cliente proveer todos los datos necesarios para la creación de dichos registros.

### Casos y datos que el cliente debe proveer

| Caso | El cliente debe proveer |
| :--- | :--- |
| Creación de la zona DNS | Nombre de dominio contratado. Ej: `midominio.nat.cu` |
| Creación de registro CNAME | FQDN autogenerado del VPS desplegado donde reside el servicio a referenciar. Ej: `srv5177-206152.vps.etecsa.cu`<br>Alias dentro del dominio contratado. Ej: `www` |
| Creación de registro MX | FQDN autogenerado del VPS desplegado donde reside el servicio. Ej: `srv5177-206152.vps.etecsa.cu` |
| Creación de registro TXT (SPF) | En este caso, de no proveer los datos, se creará por defecto con los datos provistos para el Registro MX. |
| Creación de registro TXT (DKIM) | Selector<br>Llave (key) |
| Creación de registro TXT (DMARC) | Este es un registro opcional y se forma a partir de los registros SPF + DKIM, pero si es requerido por el cliente, este deberá proveer todos sus elementos. |

> **Importante**  
> Cualquiera sea el caso, es importante recalcar que las referencias a los hosts creados en nuestro servicio de VPS se realizarán únicamente por el nombre generado automáticamente durante la provisión del VPS.  
> Ej: `srv5177-206152.vps.etecsa.cu`
