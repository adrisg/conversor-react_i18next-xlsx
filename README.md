# Antes de usar la herramienta
- Ejecutar el siguiente comando
```hs
    npm i
```

# Convertir JSONS to XLSX

- Insertar los archivos jsons en la carpeta **./input/jsons** con la siguiente extructura 
```bash
    .
    └── input
        └── jsons
            ├── es //name languaje
            │   ├── document.json
            │   ├── document1.json
            │   ├── document2.json
            │   └── document3.json
            └── en
                ├── document.json
                ├── document1.json
                ├── document2.json 
                └── document3.json
```
- Ejecutamos el siguiente comando

    ```hs
        npm run toXlsx
    ```
- Esto exportara en la carpeta **./output/xlsx** un archivo llamado **languages.xlsx** donde se encontraran todos los documentos deparados por paginas para poder realizar sus correspondientes traducciones

# Convertir XLSX to JSONS

- Una vez hechas todas las traducciones solo tendremos que insertar el archivo **languages.xlsx** en la carpeta **./input/xlsx**
- Ejecutaremos el siguiente comando
```bash
    npm run toJson
```
- Esto nos exportara los activos jsons en la carpeta **./output/jsons** listos para poder consumirse en nuestra aplicacion :)

