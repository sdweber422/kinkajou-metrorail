const { knex, chai, expect, Station } = require('./setup')

describe.only('Station', () => {
  let downtownStation, elmStation, forestGardensStation
  before( () => knex.truncateAllTables() )
  beforeEach ( () => {
    downtownStation = new Station()
    elmStation = new Station({ name: 'elm', order_number: 1 })
    forestGardensStation = new Station({ name: 'forest gardens', order_number: 2 })
  })
  afterEach( () => knex.truncateAllTables() )

  describe('.create()', () => {
    it('should create a new station named annex.', () => {
      return Station.create({ name: 'annex', order_number: 3})
      .then( station => {
        expect( station ).to.not.be.undefined
        expect( station.name ).to.eql( 'annex' )
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
