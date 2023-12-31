import formatsPlugin from "ajv-formats";
import { Router } from "express";
import { Validator } from "express-json-validator-middleware";
import { randomInt } from "node:crypto";

interface RouterDefinition {
    path: string;
    router: Router;
}

interface CodeOptions {
    code?: number | string;
    type?: "numeric" | "alphanumeric" | "alphabetic" | "custom";
    length?: number;
    alphabet?: string;
} 

const validator = new Validator({strict: true});
formatsPlugin(validator.ajv);
const validate = validator.validate;

function generateCode(codeOptions?: CodeOptions): string {
    const options: CodeOptions = {
        type: "numeric",
        length: 5,
        ...codeOptions
    }

    switch (options.type) {
        case "alphabetic":
            return generateFromAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", options.length!);
        case "alphanumeric":
            return generateFromAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", options.length!);
        case "custom":
            if(!options.alphabet) throw new Error("when using custom an alphabet is required");
            return generateFromAlphabet(options.alphabet!, options.length!);
        default:
            return generateNumeric(options.length!);
    }
}

function generateNumeric(length: number) {
    return randomInt(0, Math.pow(10, length) - 1)
        .toString()
        .padStart(length, '0')
}

function generateFromAlphabet(alphabet: string, length: number): string {
    return Array(length)
        .fill('')
        .map(() => alphabet[randomInt(0, alphabet.length - 1)])
        .join('')
}

function createRouter(path:string, router: Router): RouterDefinition {
    return {
        path, 
        router
    }
}

export { createRouter, generateCode, validate };
export type { CodeOptions, RouterDefinition };

