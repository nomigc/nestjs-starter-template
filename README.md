# 🚀 NestJS Starter Template with MongoDB, Repository Pattern & Authentication

A clean and extensible NestJS starter template powered by MongoDB. Built with the Repository Pattern for maintainable code and Passport-based JWT authentication for secure access control.

---

## 📦 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Passport](https://docs.nestjs.com/security/authentication) + JWT
- **Architecture Pattern**: Repository Pattern

---

## ✅ Features

- ✅ NestJS with modular architecture
- ✅ MongoDB integration with Mongoose
- ✅ Repository Pattern for abstraction & clean code
- ✅ Passport + JWT Authentication
- ✅ Role-based access ready (can be extended)
- ✅ Environment-based config with `.env`
- ✅ Organized and scalable folder structure


## Folder Structure

├── .editorconfig
├── .gitignore
├── .nvmrc
├── .prettierrc
├── README.md
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
    ├── app.controller.ts
    ├── app.imports.ts
    ├── app.module.ts
    ├── app.service.ts
    ├── app.ts
    ├── common
    │   ├── filters
    │   │   ├── exception.filter.ts
    │   │   └── index.ts
    │   ├── guards
    │   │   ├── index.ts
    │   │   ├── is-admin.guard.ts
    │   │   └── jwt-auth.guard.ts
    │   ├── helper
    │   │   ├── common
    │   │   │   ├── index.ts
    │   │   │   └── mongoose-schema.helper.ts
    │   │   └── repositories
    │   │   │   ├── create.repository.helper.ts
    │   │   │   ├── delete.repository.helper.ts
    │   │   │   ├── exists.repository.helper.ts
    │   │   │   └── index.ts
    │   ├── interfaces
    │   │   ├── global.interface.ts
    │   │   ├── index.ts
    │   │   └── response.interface.ts
    │   ├── middlewares
    │   │   ├── index.ts
    │   │   └── storage.middleware.ts
    │   ├── pipes
    │   │   ├── file.pipe.ts
    │   │   └── index.ts
    │   └── types
    │   │   ├── access-token.types.ts
    │   │   └── index.ts
    ├── config
    │   ├── config.module.ts
    │   └── config.service.ts
    ├── controllers
    │   ├── auth
    │   │   ├── auth.controller.ts
    │   │   ├── auth.module.ts
    │   │   ├── auth.service.ts
    │   │   └── dto
    │   │   │   ├── create-auth.dto.ts
    │   │   │   ├── index.ts
    │   │   │   └── login.dto.ts
    │   └── user
    │   │   ├── user.module.ts
    │   │   └── user.repository.ts
    ├── infrastructure
    │   └── mongoose
    │   │   ├── mongoose-config.service.ts
    │   │   └── mongoose.module.ts
    ├── lib
    │   ├── cors.lib.ts
    │   └── index.ts
    ├── main.ts
    ├── schemas
    │   ├── common
    │   │   ├── index.ts
    │   │   └── user.schema.ts
    │   └── enums
    │   │   ├── index.ts
    │   │   └── role.enum.ts
    ├── shared
    │   ├── hash
    │   │   ├── hash.module.ts
    │   │   └── hash.service.ts
    │   └── repositories
    │   │   ├── repositories.module.ts
    │   │   └── repositories.service.ts
    ├── strategy
    │   └── jwt.strategy.ts
    ├── utils
    │   ├── common-function.utils.ts
    │   ├── exception.utils.ts
    │   ├── index.ts
    │   └── response.utils.ts
    └── validation
    │   ├── exception-factory.validation.ts
    │   └── index.ts
├── test
    ├── app.e2e-spec.ts
    └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json