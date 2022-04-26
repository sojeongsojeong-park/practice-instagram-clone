//1. IndexedDB.open(Name, Version) 함수를 사용해서 데이터베이스를 여세요.
//이때 onRequest라는 변수에 데이터베이스를 담으세요.
const onRequest = indexedDB.open('instagram', 1);

    //Name과 Version 모두 일치하는 데이터베이스가 성공적으로 생성됐다면 호출
    onRequest.onsuccess = () => {
       console.log('Success creating or accessing db')
    }

    //Name과 Version 모두 일치하는 데이터베이스가 없는 경우 호출
    //객체 저장소를 이 함수 안에서 생성합니다.
    onRequest.onupgradeneeded = () => {
      const database = onRequest.result
      //2. `bio`와 `gallery`라는 ObjectStore를 생성하세요. 
        database.createObjectStore("bio", {autoIncrement: true})
        database.createObjectStore("gallery", {autoIncrement: true})
    }

    //Name이 일치해도 존재하는 DB가 없거나 DB 호출에 실패했을 때 
    onRequest.onerror = () => {
      alert('Error creating or accessing db')
    }

//사용자가 입력한 데이터를 데이터베이스에 추가
const addEntryToDb = (storeName, entry) => {
  const database = onRequest.result
  //3. 데이터베이스에 입력하기 위해 transaction을 실행하세요.
    const transaction = database.transaction([storeName], 'readwrite')
  //4. store에 값을 삽입하기 위해 objectStore() 함수로 테이블 선택 및 add() 함수로 원하는 객체를 추가하세요.
    const store = transaction.objectStore(storeName)
    store.add(entry)

  // transaction.oncomplete = () => alert(`Entry added to ${storeName}!`)
  transaction.onerror = () => {
    console.log(`error adding Entry to ${storeName}.`)
    console.log(transaction.error);
  }
}

//데이터베이스에 저장된 데이터를 화면에 렌더링
const getEntryFromDb = (storeName, id) => {
  const data = new Promise((resolve, reject) => {
    const database = onRequest.result
    //1. transaction을 생성해서 객체 저장소에 접근하세요.
    const transaction = database.transaction([storeName]);
    const store = transaction.objectStore(storeName)
    //2. id가 유효하다면 store.get()을 사용해서 request에 가져온 데이터를 할당합니다.
    //유효하지 않다면 store.getAll()을 반환합니다.
    const request = id ? store.get(id) : store.getAll()
    
    request.onerror = () => {
      reject(request.error)
      console.log('error getting data from the store');
    }

    request.onsuccess = () => {
      resolve(request.result)
    }
  })

  return Promise.resolve(data)
}

const clearAllEntries = (storeName) => {
  const database = onRequest.result
  const transaction = database.transaction([storeName], 'readwrite')
  const store = transaction.objectStore(storeName)
  store.clear()
}


export { onRequest, addEntryToDb, getEntryFromDb, clearAllEntries}
