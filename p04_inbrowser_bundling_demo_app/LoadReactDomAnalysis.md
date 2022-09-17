# Loading `react-dom`

- onResolve

```json
{
    "path": "index.js",
    "importer": "",
    "namespace": "",
    "resolveDir": "/",
    "kind": "entry-point"
}
```

- onLoad

```json
{
    "path": "react-dom",
    "importer": "index.js",
    "namespace": "a",
    "resolveDir": "",
    "kind": "require-call"
}
```

- onResolve 

```json
{
    "path": "react-dom",
    "importer": "index.js",
    "namespace": "a",
    "resolveDir": "",
    "kind": "require-call"
}
```

- onLoad 

```json
{
    "path": "https://unpkg.com/react-dom",
    "namespace": "a",
    "suffix": ""
}
```

- fetch: request

```json
{
    "responseUrl": "https://unpkg.com/react-dom@18.2.0/index.js"
}
```

- onResolve

```json
{
    "path": "./cjs/react-dom.production.min.js",
    "importer": "https://unpkg.com/react-dom",
    "namespace": "a",
    "resolveDir": "/react-dom@18.2.0",
    "kind": "require-call"
}
```

- onLoad

```json
{
    "path": "https://unpkg.com/react-dom@18.2.0/cjs/react-dom.production.min.js",
    "namespace": "a",
    "suffix": ""
}
```

- fetch: request
```json
{
    "responseURL": "https://unpkg.com/react-dom@18.2.0/cjs/react-dom.production.min.js"
}
```

- onResolve
```json
{
    "path": "react",
    "importer": "https://unpkg.com/react-dom@18.2.0/cjs/react-dom.production.min.js",
    "namespace": "a",
    "resolveDir": "/react-dom@18.2.0/cjs",
    "kind": "require-call"
}
```

- onResolve
```json
{
    "path": "scheduler",
    "importer": "https://unpkg.com/react-dom@18.2.0/cjs/react-dom.production.min.js",
    "namespace": "a",
    "resolveDir": "/react-dom@18.2.0/cjs",
    "kind": "require-call"
}
```

- onLoad
```json
{
    "path": "https://unpkg.com/scheduler",
    "namespace": "a",
    "suffix": ""
}
```

- onLoad 
```json
{
    "path": "https://unpkg.com/react",
    "namespace": "a",
    "suffix": ""
}
```

- request 
```json
{
    "responseURL": "https://unpkg.com/react@18.2.0/index.js"
}
```

- request 
```json
{
    "responseURL": "https://unpkg.com/scheduler@0.23.0/index.js"
}
```

- onResolve 
```json
{
    "path": "./cjs/react.production.min.js",
    "importer": "https://unpkg.com/react",
    "namespace": "a",
    "resolveDir": "/react@18.2.0",
    "kind": "require-call"
}
```
- onLoad 
```json
{
    "path": "https://unpkg.com/react@18.2.0/cjs/react.production.min.js",
    "namespace": "a",
    "suffix": ""
}
```

- onResolve 
```json
{
    "path": "./cjs/scheduler.production.min.js",
    "importer": "https://unpkg.com/scheduler",
    "namespace": "a",
    "resolveDir": "/scheduler@0.23.0",
    "kind": "require-call"
}
```

- onLoad 

```json
{
    "path": "https://unpkg.com/scheduler@0.23.0/cjs/scheduler.production.min.js",
    "namespace": "a",
    "suffix": ""
}
```

- request

```json
{
    "responseURL": "https://unpkg.com/scheduler@0.23.0/cjs/scheduler.production.min.js"
}
```

- request 

```json
{
    "responseURL": "https://unpkg.com/react@18.2.0/cjs/react.production.min.js"
}
```

