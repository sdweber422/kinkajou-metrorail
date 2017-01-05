const { knex, chai, expect } = require('./setup')

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
