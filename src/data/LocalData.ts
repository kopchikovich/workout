class LocalDb {
  dbName: string

  constructor(name: string) {
    this.dbName = name
  }

  open(): object {
    const db: string | null = localStorage.getItem(this.dbName)
    if (db) {
      return JSON.parse(db)
    }
    return new Object()
  }

  save(db: object): void {
    localStorage.setItem(this.dbName, JSON.stringify(db))
  }

  add(item: object): string {
    const db: any = this.open()
    const id: string = this._makeId()
    db[id] = Object.assign(item, {id: id})
    this.save(db)
    return id
  }

  edit(item: object, id: string) {
    const db: any = this.open()
    db[id] = Object.assign(db[id], item)
    this.save(db)
    return id
  }

  delete(id: string): void {
    const db: any = this.open()
    delete db[id]
    this.save(db)
  }

  _makeId(): string {
    const ID_LENGTH: number = 8
    const vocabulary: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let id: string = ''
    for (let i: number = 1; i <= ID_LENGTH; i++) {
      id += vocabulary[Math.floor(Math.random() * vocabulary.length)]
    }
    return id
  }
}

export default function localData(dbName: string) {
  return new LocalDb(dbName)
}