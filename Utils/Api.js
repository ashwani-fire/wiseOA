

const URL = 'https://staging-api.wiseapp.live/institutes/646749284927953beeccb03f/sessions?status=FUTURE&classId=6979eab190cb1348aecbfefb&paginateBy=COUNT&page_size=10&page_number=1'
const UPDATE_URL = 'https://staging-api.wiseapp.live/teacher/classes/6979eab190cb1348aecbfefb/sessions'
const DELETE_URL = 'https://staging-api.wiseapp.live/teacher/classes/6979eab190cb1348aecbfefb/sessions'

export const dummyApi = async (limit=10) => {
    try {
        const response = await fetch(`https://staging-api.wiseapp.live/institutes/646749284927953beeccb03f/sessions?status=FUTURE&classId=6979eab190cb1348aecbfefb&paginateBy=COUNT&page_size=${limit}&page_number=1`, {
            headers: getHeaders(),
            method: 'GET'
        })
        let resp = await response.json()
        console.log(resp?.data?.sessions)
        return resp?.data?.sessions
    }
    catch (e) {
        console.log(e)
        return []
    }

}
export const getHeaders = () => ({
    "content-type": ' application/json',
    "authorization": 'Basic NWYzNjNlMjk5YTE4YmU1MGIyOWE5MzM3OjE5MTFkZmE4YjgwYWZmMTUyODY2Yjc2NTFhOTYwMTI4',
    "x-wise-namespace": "wise",
    "x-wise-uuid": "f0733cd6-1689-4d0b-ae0d-b9d97542d594",
})
export const updateApi = async (item, sess_id) => {
    try {
        console.log('api called', item, sess_id)
 const response = await fetch(`https://staging-api.wiseapp.live/teacher/classes/6979eab190cb1348aecbfefb/sessions/${sess_id}?updateType=SINGLE`, {
            headers: getHeaders(),
            method: 'PUT',
            body: JSON.stringify(item)
        })
        let resp = await response.json()
        console.log(resp)
    }
    catch (e) {
        console.log(e)

    }

}

export const deletApi = async (item, sess_id) => {
    try {
        const response = await fetch(`https://staging-api.wiseapp.live/teacher/classes/6979eab190cb1348aecbfefb/sessions/${sess_id}?updateType=SINGLE`, {
            headers: getHeaders(),
            method: 'DELETE',
          
        })
        let resp = await response.json()
        console.log(resp?.data?.sessions)
        return resp?.data?.sessions
    }
    catch (e) {
        console.log(e)
    }
}