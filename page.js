"use client"
import React, { useState } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [mainTask, setMainTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    setMainTask([...mainTask, { title, description }])
    settitle("")
    setdescription("")
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask]
    copyTask.splice(i, 1)
    setMainTask(copyTask)
  }

  let renderTask = <h2 className="text-center text-gray-500 mt-10 text-xl">No tasks available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col w-2/3">
            <h5 className="text-2xl font-semibold text-gray-800">{t.title}</h5>
            <h6 className="text-lg font-medium text-gray-600">{t.description}</h6>
          </div>
          <button
            onClick={() => {
              deleteHandler(i)
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold transition-colors duration-300 flex items-center"
            aria-label="Delete task"
            title="Delete task"
          >
            &#x2716;
          </button>
        </li>
      )
    })
  }

  return (
    <>
      <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-4xl font-extrabold p-6 text-center shadow-md">
        Akhil's To-Do App
      </h1>

      <form onSubmit={submitHandler} className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <input
          type="text"
          className="text-2xl border border-gray-300 rounded-md m-2 px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => {
            settitle(e.target.value)
          }}
          required
        />
        <input
          type="text"
          className="text-xl border border-gray-300 rounded-md m-2 px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value)
          }}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-2xl font-bold rounded-md mt-4 w-full transition-colors duration-300"
        >
          Add Task
        </button>
      </form>

      <div className="max-w-xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg shadow-inner min-h-[200px]">
        <ul>{renderTask}</ul>
      </div>
    </>
  )
}

export default page
