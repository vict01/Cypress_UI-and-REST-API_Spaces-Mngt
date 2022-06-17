/// <reference types="cypress" />
import { build, fake } from "test-data-bot"

export const buildUser = build('user').fields({
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password())
})