const assert = require("assert");
const main = require("../js/main");

describe("main", ()=>{
    it("No debe dejar campos vacios", ()=>{
        assert.equal(main(campo1, campo2), nodejarCamposVacios);
    });
})

