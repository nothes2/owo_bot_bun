import {describe, it, expect} from "bun:test"
import register_commands from "@core/commands/cmd_register.ts";

describe(`Register commands`, () => {
    it(`should be able to register`, () => {
        register_commands()
    })
})