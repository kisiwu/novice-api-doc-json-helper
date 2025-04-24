import { OpenAPIHelperInterface } from '@novice1/api-doc-generator';
import {
    AdditionalProperties,
    DiscriminatorObject,
    XMLObject,
    ExampleObject,
    ReferenceObject,
    EncodingObject
} from '@novice1/api-doc-generator/lib/generators/openapi/definitions';

/**
 * JSON schema (draft-07) helper for \@novice1/api-doc-generator
 */
export class OpenAPIJsonHelper implements OpenAPIHelperInterface {
    protected _schema: object;
    protected _isRequired = false

    static schemaProperty: string = ''

    constructor(schema: object | unknown = {}, isRequired?: boolean) {
        this._schema = {}
        if (schema && typeof schema === 'object') {
            const s = schema as Record<string, unknown>
            this._schema = s
            if (OpenAPIJsonHelper.schemaProperty && OpenAPIJsonHelper.schemaProperty in s) {
                const s2 = s[OpenAPIJsonHelper.schemaProperty]
                if (s2 && typeof s2 === 'object') {
                    this._schema = s2
                }
            }
            if (!('type' in this._schema)) {
                this._schema = {
                    type: 'object',
                    properties: this._schema
                }
            }
        }
        if (isRequired) {
            this._isRequired = isRequired
        }
        console.log(this._schema)
    }

    getFirstItem(): OpenAPIJsonHelper | undefined {

        const schema = this._schema

        if ('items' in schema && typeof schema.items === 'object') {
            return new OpenAPIJsonHelper(schema.items)
        }

        return
    }
    getChildren(): Record<string, OpenAPIJsonHelper> {
        const r: Record<string, OpenAPIJsonHelper> = {};
        const schema = this._schema
        if ('properties' in schema && typeof schema.properties === 'object' && schema.properties) {
            const properties: Record<string, unknown> = schema.properties as Record<string, unknown>
            for (const p in properties) {
                const isRequired: boolean = 'required' in schema && Array.isArray(schema.required) && schema.required.includes(p)
                r[p] = new OpenAPIJsonHelper(properties[p], isRequired)
            }
        }
        return r;
    }
    getAlternatives(): OpenAPIJsonHelper[] {
        const r: OpenAPIJsonHelper[] = []
        const schema = this._schema
        if ('oneOf' in schema && Array.isArray(schema.oneOf)) {
            for (const p of schema.oneOf) {
                r.push(new OpenAPIJsonHelper(p))
            }
        }
        return r
    }
    hasStyle?(): boolean {
        return false
    }
    getStyle?(): string | undefined {
        return
    }
    hasAdditionalProperties?(): boolean {
        const schema = this._schema
        return !!('additionalProperties' in schema && schema.additionalProperties)
    }
    getAdditionalProperties?(): AdditionalProperties | undefined {
        const schema = this._schema
        return 'additionalProperties' in schema && (schema.additionalProperties as AdditionalProperties)
    }
    hasRef?(): boolean {
        const schema = this._schema
        return !!('$ref' in schema && typeof schema.$ref === 'string')
    }
    getRef?(): string | undefined {
        const schema = this._schema
        return '$ref' in schema && typeof schema.$ref === 'string' ? schema.$ref : undefined
    }
    hasDiscriminator?(): boolean {
        return false
    }
    getDiscriminator?(): DiscriminatorObject | undefined {
        return
    }
    hasXml?(): boolean {
        return false
    }
    getXml?(): XMLObject | undefined {
        return
    }
    hasExamples?(): boolean {
        const schema = this._schema
        return !!('examples' in schema && Array.isArray(schema.examples))
    }
    getExamples?(): Record<string, ExampleObject | ReferenceObject> | undefined {
        const schema = this._schema
        if ('examples' in schema && Array.isArray(schema.examples)) {
            const r: Record<string, ExampleObject | ReferenceObject> = {};
            let i = 1
            for (const value of schema.examples) {
                r[`${i}`] = {
                    value
                }
                i++
            }
            return r
        }
        return
    }
    hasEncoding?(): boolean {
        return false
    }
    getEncoding?(): Record<string, EncodingObject> | undefined {
        return
    }
    isValid(): boolean {
        return !!(this._schema && typeof this._schema === 'object')
    }
    getType(): string {
        let r = ''

        if ('type' in this._schema && typeof this._schema.type === 'string') {
            r = this._schema.type
        }

        if ('format' in this._schema && typeof this._schema.format === 'string') {
            r = this._schema.format
        }

        return r;
    }
    getDescription(): string {
        let r = ''

        if ('description' in this._schema && typeof this._schema.description === 'string') {
            r = this._schema.description
        }

        return r;
    }
    isRequired(): boolean {
        return this._isRequired
    }
    isUnique(): boolean {
        return !!('uniqueItems' in this._schema && this._schema.uniqueItems)
    }
    hasDefaultValue(): boolean {
        return !!('default' in this._schema && typeof this._schema.default != 'undefined')
    }
    getDefaultValue(): unknown {
        return 'default' in this._schema ? this._schema.default : undefined
    }
    hasExampleValue(): boolean {
        const schema = this._schema
        return !!('examples' in schema && Array.isArray(schema.examples) && schema.examples.length)
    }
    getExampleValue(): unknown {
        const schema = this._schema
        if ('examples' in schema && Array.isArray(schema.examples) && schema.examples.length) {
            return schema.examples[0]
        }
        return
    }
    isDeprecated(): boolean {
        return !!('deprecated' in this._schema && this._schema.deprecated)
    }
    allowsEmptyValue(): boolean {
        let r = false;
        if ('enum' in this._schema && Array.isArray(this._schema.enum)) {
            const enume = this._schema.enum
            r = ['', null].some(v => enume.includes(v))
        }
        return r;
    }
    getEnum(): unknown[] {
        let r: unknown[] = []
        if ('enum' in this._schema && Array.isArray(this._schema.enum)) {
            r = this._schema.enum
        }
        return r;
    }
    hasMin(): boolean {
        return 'minProperties' in this._schema || 'minItems' in this._schema || 'minimum' in this._schema || 'minLength' in this._schema
    }
    hasMax(): boolean {
        return 'maxProperties' in this._schema || 'maxItems' in this._schema || 'maximum' in this._schema || 'maxLength' in this._schema
    }
    getMin(): number | undefined {
        if ('minProperties' in this._schema && typeof this._schema.minProperties === 'number') {
            return this._schema.minProperties
        }
        if ('minItems' in this._schema && typeof this._schema.minItems === 'number') {
            return this._schema.minItems
        }
        if ('minimum' in this._schema && typeof this._schema.minimum === 'number') {
            return this._schema.minimum
        }
        if ('minLength' in this._schema && typeof this._schema.minLength === 'number') {
            return this._schema.minLength
        }
        return
    }
    getMax(): number | undefined {
        if ('maxProperties' in this._schema && typeof this._schema.maxProperties === 'number') {
            return this._schema.maxProperties
        }
        if ('maxItems' in this._schema && typeof this._schema.maxItems === 'number') {
            return this._schema.maxItems
        }
        if ('maximum' in this._schema && typeof this._schema.maximum === 'number') {
            return this._schema.maximum
        }
        if ('maxLength' in this._schema && typeof this._schema.maxLength === 'number') {
            return this._schema.maxLength
        }
        return
    }
    getUnit(): string {
        return ''
    }

}