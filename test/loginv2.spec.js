const assert = require("assert");
const main = require("./js/loginv2");

describe("main", ()=>{
    it("Debería ser un formato de correo", ()=>{
        assert.equal(main("string" + "@"), ".com");
    });
})
