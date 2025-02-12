# Environment Setup Guide

## 1. Download Node.js
- Download from [Node.js v20.18.1](https://nodejs.org/dist/v20.18.1/node-v20.18.1-win-x64.zip)

## 2. Extract and Rename
- Extract the downloaded folder.
- Rename the extracted folder to `node`.

## 3. Copy to User Directory
- Copy the `node` folder to `C:/Users/<NTID>`.v

## 4. Setting up Environment Variables

### In VSCode

#### If using Git Bash:
```bash
export PATH="$HOME/node:$PATH"
````
#### If using PowerShell:
```powershell
$env:Path = "$env:Path;$env:USERPROFILE\node"
```

# ppwa-frontend

## 1. Installation
```
cd ppwa-frontend/
npm install
//After installation complete, run: 
ng version
//If not found, run: 
npm install -g @angular/cli@19.0.6
//Verify again:
ng version
```
>A message should pop up and show your Angular version: 
- Angular CLI: 19.0.6
- Node: 20.18.1
- Package Manager: npm 10.8.2
- OS: win32 x64
- ...
>REMEMBER: Make sure your Angular CLI version is 19.0.6

## 2. Run Project
>After install ng is finished, execute this command to run the code 
```
//In the ppwa-frontend folder
ng serve
```
>The output of a successful run will be like
```

Initial chunk files | Names         |  Raw size
polyfills.js        | polyfills     |  90.20 kB | 
main.js             | main          |  18.18 kB | 
styles.css          | styles        |  96 bytes | 

                    | Initial total | 108.48 kB

Application bundle generation complete. [2.232 seconds]

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
```
>Ctrl + Click the local link, the browser should pop up the example website
# ppwa-backend


## 1. Download sqlite3 binary
- Download from [sqlite3](https://bosch-my.sharepoint.com/:u:/r/personal/nod7hc_bosch_com/Documents/Microsoft%20Teams%20Chat%20Files/sqlite3.zip?csf=1&web=1&e=H6kYNu)
- Extract the downloaded folder.
- Rename the extracted folder to `ppwa-backend\node_modules`.

## 2. Installation
```
cd ppwa-backend/
npm install
//Verify if nest is install by execute the below command: 
nest --version
```

## 3.Run project
>To run your code, execute this command: 
```
npm run start
//If you want to see changes during run process:
npm run start:dev
```
>A success command will pop-up a message like: 
```
> ppwa-backend@0.0.1 start
> nest start

[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [NestFactory] Starting Nest application...
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [InstanceLoader] AppModule dependencies initialized +6ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [InstanceLoader] ProductModule dependencies initialized +1ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [RoutesResolver] AppController {/}: +7ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [RouterExplorer] Mapped {/, GET} route +3ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [RoutesResolver] ProductController {/product}: +0ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [RouterExplorer] Mapped {/product, POST} route +0ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [RouterExplorer] Mapped {/product, GET} route +1ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [RouterExplorer] Mapped {/product/:id, GET} route +0ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [RouterExplorer] Mapped {/product/:id, PATCH} route +1ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [RouterExplorer] Mapped {/product/:id, DELETE} route +1ms
[Nest] 30544  - 01/13/2025, 3:28:36 PM     LOG [NestApplication] Nest application successfully started +1ms

```
> Visit your localhost:3000 or use Postman to test the Route 
- Example, send a GET request to localhost:3000/ will response a 200 status OK with the body "Hello World" 

