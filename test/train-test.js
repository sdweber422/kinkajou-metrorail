const { knex, chai, expect, Train } = require('./setup')

describe('Train', () => {
  let train
  before( () => knex.truncateAllTables() )
  // beforeEach ( () => train = new Train( 50, 'museum isle' ) )//NOTE: Create train with unique number apart from PK
  // afterEach( ()=> {
  //   return knex.truncateAllTables()
  // })

  describe( '.create()', () => {
    it('should create a new train in the database.', () => {
      const train = new Train()
      train.getCurrentLocation()
      // train.create({ capacity: 50, location: 'annex' }).then( train => {
      //   expect( train ).to.not.be.undefined
      //   //NOTE: Expect train id to exist and be a number
      //   expect( train.location ).to.eql('annex')
      //   expect( train.capacity ).to.eql( 50 )
      //   //NOTE: Add test for successful query
      // })
    })
  })

  describe('.getById()', ()=> {
    it('should return a train with the ID of 1.', ()=> {
      return Promise.resolve( train.getById( 1 ) )
      .then( train => {
        expect( train.id ).to.eql( 1 )
        expect( train.location ).to.eql('museum isle')
        expect( train.id ).to.not.be.undefined
        expect( train ).to.not.eql( 1 )
        //NOTE: Test instead that train is instance of Train class. Also, change id test as in above description. Test for new field unique identifier
      })
    })
  })
//NOTE: Change to instance method. Before all tests run, grab train to test instances
  describe('#getCurrentLocation()', () => {
    it('should return museum isle for the location of the train.', ()=> {
      return Promise.resolve( Train.getCurrentLocation( 1 ) )
      .then( location => {
        expect( location ).to.eql( 'museum isle' )
      })
    })
  })

  describe('#getNextLocation()', () => {
    it('should return downtown street.', () => {
      return Promise.resolve( Train.getNextLocation( 1 ) )
      .then( nextLocation => {
        // console.log( nextLocation)
        expect( nextLocation ).to.eql( 'downtown' )
      })
    })
  })

  describe('#updateWithNextLocation()', () => {
    it('should change train location to downtown.', ()=> {
      return Train.updateWithNextLocation( 1 )
      .then( location => {
        expect( location ).to.eql( 'downtown')
      })
    })
  })

  describe('#isAtMaxCapacity()', () => {
    it( 'should return true if train is at 50 passengers, otherwise false.', () => {
      return Train.isAtMaxCapacity( 1 )
      .then( result => {
        expect( result ).to.eql( false )
      })
    })
  })

  describe('#getMaxCapacity', () => {
    it( 'should return 50 for maximum capacity value.', () => {
      return Train.getMaxCapacity( 1 )
      .then( result => {
      expect( result ).to.eql( 50 )
      })
    })
  })

   describe('#getPassengers', () => {
     it( 'should return an array of passengers', () => {
       return Train.getPassengers( 1 )
       .then( result => {
         expect( result ).to.eql( ['Sam Shade', 'Penelope Smith'])//NOTE: Alter test
       })
     })
   })

   describe('#deleteTrain', () => {
     it( 'should delete a train from the database.', () => {
       return Train.delete( 1 )
       .then( Train.getById( 1 ))
       .then( result => {
         expect( result ).to.eql( 1 )
         expect( result ).to.not.be.undefined
       })
     })
   })


})
