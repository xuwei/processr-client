import firebase from '../../Firebase.js'
import moment from 'moment'

const now = () => {
    return firebase.firestore.FieldValue.serverTimestamp()
}

const fromNow = (timestamp) => {
    return moment(timestamp.toDate()).fromNow()
}

export default { now, fromNow }