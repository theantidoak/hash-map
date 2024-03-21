class NodeMap {
  constructor(key, value=null, next=null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor(buckets) {
    this.buckets = Array(buckets).fill(null);
  }

  hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    const numOfBuckets = this.buckets.length;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i));
      hashCode %= numOfBuckets;
    }
  
    return hashCode;
  }

  set(key, value) {
    const hash = this.hash(key);
    const newNode = new NodeMap(key, value);

    if (!this.has(key)) {
      if (!this.buckets[hash]) {
        this.buckets[hash] = newNode;
      } else {
        let result = this.buckets[hash];
        while (result.next !== null) {
          result = result.next;
        }
        result.next = newNode;
      }
    } else {
      let result = this.buckets[hash];
      while (result.next !== null) {
        result = result.next;
      }
      result.value = value;
    }

    if (this.length() >= .75 * this.buckets.length) {
      const oldBuckets = this.buckets;
      this.buckets = Array(this.buckets.length * 2).fill(null);
      
      for (let i = 0; i < oldBuckets.length; i++) {
        let result = oldBuckets[i];

        while (result !== null) {
          this.set(result.key, result.value);
          result = result.next;
        }
        
      }

    }
  }

  get(key) {
    const hash = this.hash(key);
    let result = this.buckets[hash];

    while (result != null) {
      if (result.key == key) return result.value;
      result = result.next;
    }

    return null;
  }

  has(key) {
    const hash = this.hash(key);
    let result = this.buckets[hash];

    while (result != null) {
      if (result.key == key) return true;
      result = result.next;
    }

    return false;
  }

  remove(key) {
    const hash = this.hash(key);
    let result = this.buckets[hash];

    while (result != null) {
      if (result.key == key) {
        this.buckets[hash] = null;
        return true;
      }
      result = result.next;
    }

    return false;
  }

  length() {
    let increment = 0;
  
    for (let i = 0; i < this.buckets.length; i++) {
      let result = this.buckets[i];
      while (result != null) {
        increment += this.buckets[i] ? 1 : 0;
        result = result.next;
      }
    }

    return increment;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = null;
    }
  }

  keys() {
    let keys = [];
    let increment = 0;
    
    for (let i = 0; i < this.buckets.length; i++) {
      let result = this.buckets[i];
      while (result != null) {
        keys[increment] = result.key;
        increment++;
        result = result.next;
      }
    }

    return keys;
  }

  values() {
    let values = [];
    let increment = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      let result = this.buckets[i];
      while (result != null) {
        values[increment] = result.value;
        increment++;
        result = result.next;
      }
    }

    return values;
  }

  entries() {
    let entries = [];
    let increment = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      let result = this.buckets[i];
      while (result != null) {
        entries[increment] = [result.key, result.value];
        increment++;
        result = result.next;
      }
    }

    return entries;
  }
}

module.exports = HashMap;