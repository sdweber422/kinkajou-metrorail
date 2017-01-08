const { knex, chai, expect, Train } = require('./setup')

describe.only('Train', () => {
  let firstTrain
  before( () => knex.truncateTrainTable() )
  beforeEach ( () => {
    Promise.resolve(Train.create({ capacity: 50, location: 'elm', train_name: 'Union Pacific' }))
    .then( train => firstTrain = train )
  })
  // after( ()=> {
  //   return knex.truncateTrainTable()
  // })

  describe( '.create()', () => {
    it('should create a new train in the database.', () => {
      new Train()
      return Promise.resolve(Train.create({ capacity: 50, location: 'annex', train_name: 'Union Pacific' }))
      .then( train => {
        expect( train instanceof Train ).to.eql( true )
        expect( train.id ).to.not.be.undefined
        expect( typeof(train.id)).to.eql( 'number' )
        expect( train.location ).to.eql('annex')
        expect( train.capacity ).to.eql( 50 )
        //   //NOTE: Add test for successful query
        // })
      })
    })
  })

  describe('.getById()', ()=> {
    it('should return a train object related to specified id.', ()=> {
      return Promise.resolve( Train.getById( 1 ) )
      .then( train => {
        expect( train.id ).to.eql( 1 )
        expect( typeof(train.id) ).to.eql( 'number' )
        expect( train.id ).to.not.be.undefined
        expect( typeof(train.location) ).to.eql( 'string' )
        expect( typeof(train.capacity) ).to.eql( 'number' )
        expect( typeof(train.trainName) ).to.eql( 'string' )
        expect( train instanceof Train ).to.eql( true )
      })
    })
  })

  describe('.find()', ()=> {
    it('should return a train object related to specified name.', ()=> {
      return Promise.resolve( Train.find( {train_name: 'Union Pacific'} ) )
      .then( train => {
        expect( typeof(train.id) ).to.eql( 'number' )
        expect( train.id ).to.not.be.undefined
        expect( typeof(train.location) ).to.eql( 'string' )
        expect( typeof(train.capacity) ).to.eql( 'number' )
        expect( typeof(train.trainName) ).to.eql( 'string' )
        expect( train.trainName ).to.eql( 'Union Pacific' )
        expect( train instanceof Train ).to.eql( true )
      })
    })
  })

  describe('#getCurrentLocation()', () => {
    it('should return elm for the location of the train.', ()=> {
      let location = firstTrain.getCurrentLocation()
      expect( typeof( location ) ).to.eql( 'string' )
      expect( location ).to.eql( 'elm' )
    })
  })

  describe('#getNextStation()', () => {
    it('should return forest gardens.', () => {
      return Promise.resolve( firstTrain.getNextStation() )
      .then( nextLocation => {
        expect( typeof( nextLocation ) ).to.eql( 'string' )
        expect( nextLocation ).to.eql( 'forest gardens' )
      })
    })
  })

  describe('#moveToNextStation()', () => {
    it('should change train location to forest gardens.', ()=> {
      return Promise.resolve(firstTrain.moveToNextStation() )
      .then( location => {
        expect( location ).to.eql( 'forest gardens')
      })
    })
  })

  describe('#isAtMaxCapacity()', () => {
    it( 'should return true if train is at 50 passengers, otherwise false.', () => {
      let result = firstTrain.isAtMaxCapacity()
      expect( result ).to.eql( false )
    })
  })

  describe('#getMaxCapacity', () => {
    it( 'should return 50 for maximum capacity value.', () => {
      let result = firstTrain.getMaxCapacity()
      expect( result ).to.eql( 50 )
    })
  })

   describe('#getPassengers', () => {
     it( 'should return an array of passengers', () => {
       return firstTrain.getPassengers()
       .then( result => {
         expect( result ).to.eql( ['Sam Shade', 'Penelope Smith'])//NOTE: Alter test
       })
     })
   })

  //  describe('#deleteTrain', () => {
  //    it( 'should delete a train from the database.', () => {
  //      return Train.delete( 1 )
  //      .then( Train.getById( 1 ))
  //      .then( result => {
  //        expect( result ).to.eql( 1 )
  //        expect( result ).to.not.be.undefined
  //      })
  //    })
  //  })


})
