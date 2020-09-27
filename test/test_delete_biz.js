const should = require("should");
const bodyPadelete_funrser = require("../controllers/app.controller/deletecheck");


describe('delete biz', () =>{
    it('should be return AGENT_X exist true', done=>{
        let result = delete_fun('AGENT_1')
        result.should.be.true
        done()
    })

    it('should be return AGENT_X was not exist false', done=>{
        let result = delete_fun('')
        result.should.be.false
        done()
    })
})