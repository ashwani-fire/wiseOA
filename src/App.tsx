import { useEffect, useState } from 'react'
import './App.css'
import { dummyApi, updateApi, deletApi } from '../Utils/Api'

export default function App() {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<any>(false)
  const [open, setOpen] = useState<any>([])
  const [page, setPage] = useState<any>(1)
  const [limit, setLimit] = useState<any>(10)
  const [input, setInput] = useState<any>('')
  const getData = async (limit = 10) => {
    const resp = await dummyApi(limit)
    return resp || []
  }
  useEffect(() => {
    getData(limit).then(res => setData(res))
  }, [])
  useEffect(() => {
    getData(limit).then(res => setData(res))
  }, [limit])
  useEffect(() => {
    setOpen(new Array(data.length).fill(false))
  }, [data])
  useEffect(() => {
    if (!loading) return

    getData(limit).then(res => {
      setData(res)
      setLoading(false)
    })
  }, [loading])

  const updateData = async (item, idx) => {
    const updatedItem = { ...item, title: input }
    setData(prev => {
      const copy = [...prev]
      copy[idx] = updatedItem
      return copy
    })

    await updateApi(updatedItem, item._id)
    setLoading(true)
  }

  const deleteData = async (item, idx) => {
    setData(prev => prev.filter((_, i) => i !== idx))

    await deletApi(item, item._id)
    setLoading(true)
  }

  return (
    <>
      <div>
        {data.length ? data.map((item, idx) => (
          <div
            key={item._id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <img
              src={item?.classId?.thumbnail}
              style={{ width: 50, height: 50 }}
            />

            <div>
              <div>
                {open[idx] ? (
                  <input
                    value={input}
                    placeholder={item?.title}
                    onChange={e => setInput(e.target.value)}
                  />
                ) : (
                  <span>{item?.title}</span>
                )}
              </div>

              <div>Hosted by {item?.userId?.name}</div>
              <div>{item?._id}</div>
              <div>{item?.meetingStatus}</div>
            </div>

            <div
              style={{ padding: 20 }}
              onClick={() =>
                setOpen(prev => {
                  const arr = [...prev]
                  arr[idx] = !arr[idx]
                  return arr
                })
              }
            >
              ...
            </div>

            {open[idx] && (
              <div
                style={{
                  position: 'absolute',
                  marginLeft: 400,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <button
                  onClick={() => {
                    setOpen(prev => {
                      const arr = [...prev]
                      arr[idx] = false
                      return arr
                    })
                    updateData(item, idx)
                  }}
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    setOpen(prev => {
                      const arr = [...prev]
                      arr[idx] = false
                      return arr
                    })
                    deleteData(item, idx)
                  }}
                >
                  delete
                </button>
              </div>
            )}
          </div>
        )) : <div>No Session Found</div>}
      </div>

      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            if (page > 1) {
              setPage(p => p - 1)
              setLimit(l => l - 10)
            }
          }}
        >
          prev
        </button>

        {page}

        <button
          onClick={() => {
            setPage(p => p + 1)
            setLimit(l => l + 10)
          }}
        >
          next
        </button>
      </div>
    </>
  )
}


