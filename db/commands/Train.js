const knex = require('../knex')

class Train {

  constructor( id, capacity, location, train_name ) {
    this.id = id || 0,
    this.capacity = capacity || 50,
    this.location = location || 'elm',
    this.trainName = train_name || 'Union Pacific'
  }

static create( {capacity, location, train_name} ) {
  const attributes = { capacity, location, train_name }
  return Promise.resolve(Promise.resolve(knex('train')
    .insert(attributes)
    .returning('*')
    .on('query-response', response => response)
    .then( train => new Train( train[0].id, train[0].capacity, train[0].location, train[0].train_name ) )
    .then( train => train )
    .catch( (error) => console.log(error))))
}
//NOTE: Change return value to an object or null, per Punit (Changes for multiple test will have to occur)
  static getById( id ) {
    return  knex.select('*')
    .where({ id: id })
    .from('train')
    .catch( () => {
      console.log('ERROR')
    })
    .then( train => {
      return new Train( train[0].id, train[0].capacity, train[0].location, train[0].train_name )
    })
  }

  static find({ train_name }) {
    return Promise.resolve(knex.select('*')
    .where({ train_name })
    .from('train'))
    .catch( () => {
      console.log('ERROR')
    })
    .then( train => {
      return new Train( train[0].id, train[0].capacity, train[0].location, train[0].train_name )
    })
  }

  static nextTrain({ name }) {
    let stationArray = []
    let stationId = Promise.resolve(knex.select('order_number')
      .where({ name })
      .from('station')
      .then( result => result[0].order_number ))
      .then( r => r )
  return knex.select('*')
    .from('train')
    .then( locations => {
      locations.forEach( result => stationArray.push(result.location ) )
    return stationArray
    })
    .then( stationArray => {
      return knex.select('*')
      .whereIn( 'name', stationArray )
      .from('station')
      })
    .then( result => {
      console.log('result', result)
      console.log('stationId', stationId)
      return result.map( train => {
        if (train.order_number > stationId)  train.order_number + 12
        return stationId - train.order_number
      })
    })
    .then( result => console.log('resultssssss', result))
  }

  offboard() {
    //NOTE: Offboard any passengers whose destination is current location
  }

  onboard() {
    //NOTE: Onboard any passengers whose origin is current location
  }

  getCurrentLocation() {
    return this.location
  }

  getNextStation() {
    return Promise.resolve(knex.select('*')
      .where({ name: this.location })
      .from('station'))
      .then( station => {
        let stationId = station[0].id + 1
        return knex.select('*')
        .where({ id: stationId })
        .from('station')
      })
      .then( station => {
        return station[0].name
      })
  }

  moveToNextStation() {
    return Promise.resolve(this.getNextStation())
      .then( nextStation => {
        return knex.table('train')
        .where({ id: this.id })
        .update({ location: nextStation })
        .returning('*')
      })
      .then( location => {
        this.location = location[0].location
        return this.location })
  }

  isAtMaxCapacity() {
    return Promise.resolve(knex('passenger').count('*')
    .where({ location: this.trainName }))
    .then( passengerCount => passengerCount[0].count >= this.capacity)
    }

  getMaxCapacity() {
    return this.capacity
  }

  getPassengers() {
    return Promise.resolve(knex('*')
    .where({ location: this.trainName })
    .from('passenger'))
    .then( allPassengers => {
      let passengers = []
      allPassengers.forEach( person => passengers.push(person.name))
      return passengers
    })
  }

  static delete( id ) {
    return knex('train')
    .where({ id: id })
    .del()
  }
//NOTE: Add instance method for delete
  delete() {
    let id = this.id
    return knex('train')
    .where({ id: id })
    .del()
  }
}

module.exports = Train
