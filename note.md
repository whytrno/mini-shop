### Create model and migration
sequelize model:generate --name WorkingDay --attributes weekDay:STRING,workingDate:DATE,isWorking:BOOLEAN

### Create database
sequelize db:create

### Migrate
npx sequelize-cli db:migrate

### Rollback migration
npx sequelize-cli db:migrate:undo