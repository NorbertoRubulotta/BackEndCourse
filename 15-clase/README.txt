ARGUMENTOS POR LINEA DE COMANDO 

PUERTO:
-p <puerto>

FORK O CLUSTER (FORK PREDEFINIDO)
-m <CLUSTER>

pm2 start main.js -- --port=8080
pm2 start main.js -- --port=8081 -m CLUSTER
