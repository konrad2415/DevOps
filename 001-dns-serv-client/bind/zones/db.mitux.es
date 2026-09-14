$TTL 86400
@ IN SOA ns1.mitux.es. admin.mitux.es. (
     2026091201  ; serial
     3600        ; refresh
     600         ; retry
     86400       ; expire
     86400)      ; negative Cache TTL
; AUTHORITATIVE DOMAIN RECORD
@ IN A 172.18.0.2
; NS Servers
@     IN NS ns1.mitux.es.
@     IN NS ns2.mitux.es.

; NS SERVERS A REGISTERS (glue records)
ns1   IN A  172.18.0.2
ns2   IN A  172.18.0.3

; OTHER HOSTS
www   IN A  172.18.0.4
mail    IN A  172.18.0.5
mx      IN CNAME mail.mitux.es. 

; MX REGISTER
@     IN MX 10 mail.mitux.es. 
