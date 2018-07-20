const assert = require("assert");
const loginv2 = require("../js/loginv2");

describe("loginv2", ()=>{
    it("No debe dejar campos vacios", ()=>{
        assert.equal(loginv2(campo1, campo2), nodejarCamposVacios);
    });
})
