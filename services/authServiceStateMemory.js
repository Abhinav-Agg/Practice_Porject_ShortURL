// new Map() -> it is a Hashmap where we store the data and get the data. We can say that its like a min db.
// syntax => const/let referenceVariable = new map(); -> referenceVariable is a hashmap where we set or get data on the basis of key which we given in set.
/*
-> In this we store data in the form of key value pair.
***** Like below sessionId is the key and User obj is the value which means this obj belongs to this sessionId.
-> So we use hashmap by this we don't need to go in db and get value for this type of things. this resolved by hashmap as well.
*/
const setSessionIdForUser = new Map();

const setUser = (sessionId, User) => {
    return setSessionIdForUser.set(sessionId, User);
}

const getUser = (sessionId) => {
    return setSessionIdForUser.get(sessionId);
}

module.exports = {setUser, getUser};

// basically if we store data in hashmap variable it means we store data in memory so that we don't again and again or we can say don't need to put alot request in db to get details
// for authentication. That is stateful becasue its a type of state.

/* ****** its not useful because when we refresh the page the memory also be refresh but session id also there.
cons of hashmap -> if we store sessionid things.
When we server starts so coookie not removed but hashmap variable will be remove. But This will be useful that by this we can use anywhere for a while.
*/

// So we use JWT authentication concept.