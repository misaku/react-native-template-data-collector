# HelloWorld Test Coverage Guide

## 🔧 Setup de Ambiente

Pré-requisitos:
- Node.js 14 (use `.nvmrc`)
- Java 11 (use `.java-version` ou `.sdkmanrc`)
- Gradle 6.9

### Setup rápido

```bash
   nvm use
   sdk env || jenv local 11
   yarn install
   cd android && ./gradlew clean
   cd ../
   yarn android
```
### Rodando testes
```bash
   yarn test
```
