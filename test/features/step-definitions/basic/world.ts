import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from "chai"

class CustomWorld{
    testid: String
    constructor()
    {
        this.testid=""
    }
}
setWorldConstructor(CustomWorld)