process.env.NODE_ENV = 'test'
process.env.PORT = process.env.PORT || '3123'

const chai = require('chai')
const expect = chai.expect
const Train = require('../db/commands/Train')
// const server = require('../bin/www')

describe('train', () => {

  beforeEach( ()=> {
    return knex.truncateAllTables()
  })

  describe('#createTrain', ()=> {

    it('should create a new train in the train table.', ()=> {
      //NOTE: Add train attributes to test.
    })
  })
})
