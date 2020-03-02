# project_school

## Inicializa Banco (Json-Server)
Na pasta API, executar o comando
```
json-server --watch banco.json
```

## Inicializa o projeto Vue
Na pasta project_school, executar o comando
```
npm run serve
```

## Comandos Bash de apoio
Em caso de problemas no serviço rodando na porta 3000 (json-server), procure as informações sobre o processo que está rodando na porta para encerra-lo.
```
netstat –ano | grep 3000 
ps -aux | grep 3508 
kill –9 | 3508 
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
