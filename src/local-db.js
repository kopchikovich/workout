class Local_db {

  constructor(name) {
    this.dbName = name
  }

  open() {
    if (localStorage.getItem(this.dbName)) {
      return JSON.parse(localStorage.getItem(this.dbName))
    }
    return {}
  }

  save(db) {
    localStorage.setItem(this.dbName, JSON.stringify(db))
  }

  add(item) {
    let db = this.open()
    let id = this.makeId()
    db[id] = Object.assign(item, {id})

    this.save(db)
    return id
  }

  edit(item, id) {
    let db = this.open()
    db[id] = Object.assign(db[id], item)

    this.save(db)
    return id
  }

  delete(id) {
    let db = this.open()
    delete db[id]

    this.save(db)
  }

  makeId() {
    const ID_LENGTH = 8
    const vocabulary = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9']

    let id = ''
    for (let i = 1; i <= ID_LENGTH; i++) {
      id += vocabulary[Math.floor(Math.random()*vocabulary.length)]
    }

    return id
  }

}

export default Local_db