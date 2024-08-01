npm install

Abra o arquivo .env e localize a linha:

DATABASE_URL="mysql://root:jogador2011sql@localhost:3306/db_usuarios"

Substitua pelo formato:
DATABASE_URL="mysql://usuario:senha@localhost:porta/db_usuarios"

Onde você deve substituir:
- `usuario` pelo seu nome de usuário do MySQL.
- `senha` pela sua senha do MySQL.
- `porta` pela porta do MySQL (geralmente 3306).
- O nome do banco (`db_usuarios`) não precisa ser alterado.

Da um CREATE DATABASE db_usuarios;

Gere o cliente Prisma:
- npx prisma generate

Verifique se a tabela foi criada no seu banco de dados. Caso não tenha sido, execute:
- npx prisma db push

Compile e inicie o projeto:
Se tudo estiver configurado corretamente, execute:
- npm run build
- npm run start

Esse processo é mais rápido do que usar `npm run dev`, pois `build/start` simula um ambiente de produção.
