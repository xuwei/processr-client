import firebase from '../../Firebase.js'
import moment from 'moment'

const now = () => {
    return firebase.firestore.FieldValue.serverTimestamp()
}

const fromNow = (timestamp) => {
    return moment(timestamp.toDate()).fromNow()
}

const nowReadable = () => {
    var today = moment().format()
    return today
}

export default { now, nowReadable, fromNow }