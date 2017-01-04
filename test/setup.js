process.env.NODE_ENV = 'test'
process.env.PORT = process.env.PORT || '3123'

const knex = require('../db/knex')

const chai = require('chai')
const expect = chai.expect
const Train = require('../db/commands/Train')
// const server = require('../bin/www')

describe('Train', () => {

  beforeEach( ()=> {
    return knex.truncateAllTables()
  })

  describe('#createTrain', ()=> {
    it('should create a new train in the train table.', ()=> {
      const trainAttributes = { capacity: 50, location: 'annex' }
      return Promise.resolve( Train.create( trainAttributes ) )
      .then( train => {
        expect( train.capacity ).to.eql( 50 )
        expect( train.location ).to.eql( 'annex' )

        describe('#getById', ()=> {
          it('should return a train with the ID of 1.', ()=> {
            return Promise.resolve( Train.getById( 1 ) )
            .then( train => {
              expect( train.id ).to.eql( 1 )
              expect( train.id ).to.not.be.undefined

              describe('#getCurrentLocation', () => {
                it('should return annex for the location of the train.', ()=> {
                  return Promise.resolve( Train.getCurrentLocation( 1 ) )
                  .then( location => {
                    expect( location ).to.eql( 'annex' )

                    describe('#getNextLocation', () => {
                      it('should return 10th street.', () => {
                        return Promise.resolve( Train.getNextLocation( 1 ) )
                        .then( nextLocation => {
                          // console.log( nextLocation)
                          expect( nextLocation ).to.eql( '10th' )
                        })
                      })
                    })
                    describe('#gotoNextLocation', () => {
                      it('should change train location to 10th.', ()=> {
                        return Train.gotoNextLocation( 1 ) 
                        .then( location => {
                          expect( location ).to.eql( '10th')


                        })
                      })
                    })

                  })
                })
              })

              describe('#isAtMaxCapacity', () => {
                it( 'should return true if train is at 50 passengers, otherwise false.', () => {
                  //TODO: Add functions for checking amount of passengers on train.
                })
              })
            })
          })
        })


      })
    })
  })


})
