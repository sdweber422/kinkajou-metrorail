process.env.NODE_ENV = 'test'
process.env.PORT = process.env.PORT || '3123'

const knex = require('../db/knex')

const chai = require('chai')
const expect = chai.expect
const Train = require('../db/commands/Train')
const Station = require('../db/commands/Station')
// const server = require('../bin/www')

describe('Train', () => {

  before( () => knex.truncateAllTables() )
  beforeEach ( () => Train.create( { capacity: 50, location: 'museum isle' } ) )
  afterEach( ()=> {
    return knex.truncateAllTables()
  })

  describe( '#createTrain', () => {
    it('should create a new train in the database.', () => {
      return Train.create( { capacity: 50, location: 'annex' } )
      .then( train => {
        expect( train ).to.not.be.undefined
        expect( train.id ).to.eql( 2 )
        expect( train.location ).to.eql('annex')
        expect( train.capacity ).to.eql( 50 )
      })
    })
  })

  describe('#getById', ()=> {
    it('should return a train with the ID of 1.', ()=> {
      return Promise.resolve( Train.getById( 1 ) )
      .then( train => {
        expect( train.id ).to.eql( 1 )
        expect( train.location ).to.eql('museum isle')
        expect( train.id ).to.not.be.undefined
        expect( train ).to.not.eql( 1 )
      })
    })
  })

  describe('#getCurrentLocation', () => {
    it('should return museum isle for the location of the train.', ()=> {
      return Promise.resolve( Train.getCurrentLocation( 1 ) )
      .then( location => {
        expect( location ).to.eql( 'museum isle' )
      })
    })
  })

  describe('#getNextLocation', () => {
    it('should return downtown street.', () => {
      return Promise.resolve( Train.getNextLocation( 1 ) )
      .then( nextLocation => {
        // console.log( nextLocation)
        expect( nextLocation ).to.eql( 'downtown' )
      })
    })
  })

  describe('#updateWithNextLocation', () => {
    it('should change train location to downtown.', ()=> {
      return Train.updateWithNextLocation( 1 )
      .then( location => {
        expect( location ).to.eql( 'downtown')
      })
    })
  })

  describe('#isAtMaxCapacity', () => {
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

describe('Station', () => {

  before( () => knex.truncateAllTables() )
  beforeEach ( () => {
    Station.create(
      {name: 'elm', order_number: 1},
      {name: 'forest gardens', order_number: 2},
      {name: 'annex', order_number: 3} )//NOTE: Remember to make trains
  })
  afterEach( () => knex.truncateAllTables() )

  describe('#createStation', () => {
    it('should create a new station named 10th.', () => {
      return Station.create({ name: '10th', order_number: 4})
      .then( station => {
        expect( station ).to.not.be.undefined
        expect( station.name ).to.eql( '10th' )
      })
    })
  })

  describe('#getOrderNumber', () => {
    it( 'should return 2 for forest gardens.', () => {
      return Station.getOrderNumber( 'forest gardens' )
      .then( orderNumber => {
        expect( orderNumber ).to.eql( 2 )
      })
    })
  })

  describe('#getNextStation', () => {
    it('should return annex as the next station.', () => {
      return Station.getNextStation( 'forest gardens' )
      .then( nextStation => {
        expect( nextStation ).to.eql( 'annex' )
      })
    })
  })

  describe('#getPreviousStation', () => {
    it('should return elm as the previous station.', () => {
      return Station.getPreviousStation( 'forest gardens' )
      .then( previousStation => {
        expect( previousStation ).to.eql( 'elm' )
      })
    })
  })

  describe('#getIncomingTrain', () => {
    it('should return train id 2 for incoming train', () => {
      return Station.getIncomingTrain( 'forest gardens' )
      .then( trainId => {
        expect( trainId ).to.eql( 2 )//NOTE:Make sure train 2 is closest to forest gardens
      })
    })
  })

  describe('#getAllPassengers', () => {
    it('should return an array of all passengers at forest gardens.', () => {
      return Station.getAllPassengers( 'forest gardens' )
      .then( passengers => {
        expect( passengers.length ).to.eql( 4 )//NOTE:Come back and add tests
      })
    })
  })

  describe('#getPassengersWithTickets', () => {
    it('should return an array of passengers who have tickets.', () => {
      return Station.getPassengersWithTickets( 'forest gardens' )
      .then( passengers => {
        expect( passengers.length ).to.eql( 2 )
      })
    })
  })

  describe('#deleteStation', () => {
    it('should delete a station from the database', () => {
      return Station.delete( 1 )
      .then( Station.getById( 1 ) )
      .then( result => {
        expect( result ).to.eql( 1 )
        expect( result ).to.not.be.undefined
      })
    })
  })
})

describe('Passenger', () => {

  before( () => knex.truncateAllTables() )

  beforeEach( () => {
    Passenger.create(
      { name: 'Sam Shade', location: 'elm' },
      { name: 'Penelope Smith', location: 'elm'},
      { name: 'June Cartwright', location: 'annex'},
      { name: 'James Dean', location: '1' })
  })

  afterEach( () => knex.truncateAllTables() )

  describe('#createPassenger', () => {
    it('should create a new pasenger in the dataase.', () => {
      Passenger.create({ name: 'Steve Weber', location: 'downtown'})
      .then( passenger => {
        expect( passenger ).to.not.be.undefined
        expect( passenger.name ).to.eql( 'Steve Weber' )
        expect( passenger.location ).to.eql( 'downtown' )
      })
    })
  })

  describe('#getIdByName', () => {
    it('should return 1 for Sam Shade', () => {
      Passenger.getIdByName( 'Sam Shade' )
      .then( passenger => {
        expect( passenger ).to.eql( 1 )
      })
    })
  })

  describe('#getNameById', () => {
    it('should return Sam Shade for id of 1.', () => {
      Passenger.getNameById( 1 )
      .then( passenger => {
        expect( passenger.name ).to.eql( 'Sam Shade' )
      })
    })
  })

  describe('#getTicket', () => {
    it('should return a ticket for Sam Shade, origin being elm, destination annex.', () => {
      Passenger.getTicket( 1 )
      .then( ticket => {
        expect( ticket.origin ).to.eql( 'elm' )
        expect( ticket.destination ).to.eql( 'annex' )
      })
    })
  })

  describe('#getLocation', () => {
    it('should return elm for Penelope Smith.', () => {
      Passenger.getLocation( 'Penelope Smith' )
      .then( location => {
        expect( location ).to.eql( 'elm' )
      })
    })
  })

  describe('#setLocation', () => {
    it('should return parkside for new location of Sam Shade', () => {
      Passenger.setLocation( 1, 'parkside' )
      .then( newLocation => {
        expect( newLocation ).to.eql( 'parkside' )
      })
    })
  })

  describe('#buyTicket', () => {
    it('should create a new ticket for June Cartwright', () => {
      Passenger.buyTicket( 3, 'waterfront' )
      .then( ticket => {
        expect( ticket.origin ).to.eql( 'annex' )
        expect( ticket.destination).to.eql( 'waterfront' )
      })
    })
  })

  describe('#useTicket', () => {
    it('should delete the ticket for June Cartwright.', () => {
      Passenger.useTicket( 3 )
      .then( Passenger.getTicket( 3 ))
      .then( ticket => {
        expect( ticket ).to.eql( 1 )
        expect( ticket ).to.not.be.undefined
      })
    })
  })

  describe('#getPassengersAtStation', () => {
    it('should return an array of passengers at a specific station.', () => {
      Passenger.getPassengersAtStation( 'elm' )
      .then( passengers => {
        expect( passengers.length ).to.eql(2)
      })
    })
  })

  describe('#getPassengersOnTrain', () => {
    it('should return an array of passengers on a specific train.', () => {
      Passenger.getPassengersOnTrain( 1 )
      .then( passengers => {
        expect( passengers.length ).to.eql( 1 )
      })
    })
  })

  describe('deletePassenger', () => {
    it('should delete a passenger from the database', () => {
      Passenger.deletePassenger( 1 )
      .then( Passenger.getNameById( 1 ))
      .then( passenger => {
        expect( passenger ).to.eql( 1 )
        expect( passenger ).to.not.be.undefined
      })
    })
  })
})
