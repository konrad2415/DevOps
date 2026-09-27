> ** Configurar docker para que use proxy: **
>/etc/docker/daemon.json 
>{
>"registry-mirrors": [
>    "https://dockerproxy.net"
>    ]
>}
>
> ** Luego hacer : **
> $sudo systemctl daemon-reload
> $sudo systemctl restart docker.service
