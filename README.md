## Simple Node Typescript Setup

- Install

```
npm install
```

- Run

```
npm run dev
```

- Build

```
npm run build
```

- Path alias

You can use `@/` as the path alias for example

```
import UserModel from "@/models/user"
```

This will be later transpiled to the actual path by `tsconfig-paths`
