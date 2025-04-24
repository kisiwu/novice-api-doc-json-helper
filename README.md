# @novice1/api-doc-json-helper

JSON schemas helpers for `@novice1/api-doc-generator` enabling compatibility with `@novice1/validator-json`.

## Installation

```bash
npm install @novice1/api-doc-json-helper
```

## OpenAPI Specification

```ts
import { 
  OpenAPI 
} from '@novice1/api-doc-generator';
import { 
    OpenAPIJsonHelper 
} from '@novice1/api-doc-json-helper';
import routing from '@novice1/routing';

const openapi = new OpenAPI(OpenAPIJsonHelper);

const router = routing()
  .get({
    name: 'Main app',
    path: '/app',
    auth: true,
    tags: ['default'],
    parameters: {
        query: {
            '$schema': 'http://json-schema.org/draft-07/schema#',
            type: 'object',
            properties: {
                version: {
                    type: 'string',
                    description: 'version number',
                    enum: ['1','2','3'],
                    default: '2'
                }
            }
        }
    }
}, function (req, res) {
    res.json(req.query.version)
});

// ...
```

### Recommended

Defining the property containing your schemas is [recommended](https://github.com/kisiwu/novice-validator-json?tab=readme-ov-file#good-practices).

```ts
import { 
  OpenAPI 
} from '@novice1/api-doc-generator';
import { 
    OpenAPIJsonHelper 
} from '@novice1/api-doc-json-helper';
import routing from '@novice1/routing';

OpenAPIJsonHelper.schemaProperty = 'jsonSchemas' // recommended

const openapi = new OpenAPI(OpenAPIJsonHelper);

const router = routing()
  .get({
    name: 'Main app',
    path: '/app',
    auth: true,
    tags: ['default'],
    parameters: {
        // recommended
        jsonSchemas: {
            query: {
                '$schema': 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                properties: {
                    version: {
                        type: 'string',
                        description: 'version number',
                        enum: ['1','2','3'],
                        default: '2'
                    }
                }
            }
        }
    }
}, function (req, res) {
    res.json(req.query.version)
});

//...
```

## Postman Specification

```ts
import { 
  Postman 
} from '@novice1/api-doc-generator';
import { 
    PostmanJsonHelper 
} from '@novice1/api-doc-json-helper';
import routing from '@novice1/routing';

PostmanJsonHelper.schemaProperty = 'jsonSchemas'

const postman = new Postman(PostmanJsonHelper);

const router = routing()
  .get({
    name: 'Main app',
    path: '/app',
    auth: true,
    tags: ['default'],
    parameters: {
        
        jsonSchemas: {
            query: {
                '$schema': 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                properties: {
                    version: {
                        type: 'string',
                        description: 'version number',
                        enum: ['1','2','3'],
                        default: '2'
                    }
                }
            }
        }

    }
}, function (req, res) {
    res.json(req.query.version)
});

//...
```

## References

- [@novice1/api-doc-generator](https://kisiwu.github.io/novice-api-doc-generator/latest/)
- [@novice1/validator-json](https://kisiwu.github.io/novice-validator-json/latest/)