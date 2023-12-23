import logo from './logo.svg'
import './App.css'
import header from './assets/header.png'
import Home from './assets/home.jpg'
import { useState } from 'react'
import { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import ParticleBackground from './ParticlesBackground'
import particlesConfig from './particlesConfig'

function App() {
  const [Questions, setQuestions] = useState({
    0: [
      {
        question: '1. what is present in toothpaste?',
        options: [
          { id: 1, value: 'options1' },
          { id: 2, value: 'options1' },
          { id: 3, value: 'options1' },
          { id: 4, value: 'options1' },
        ],
        answer: [false, false, false, false],
        correct_answer: [false, true, false, false],
        status: '',
      },
      {
        question: '2. what is present in toothpaste?',
        options: [
          { id: 1, value: 'options1' },
          { id: 2, value: 'options1' },
          { id: 3, value: 'options1' },
          { id: 4, value: 'options1' },
        ],
        answer: [false, false, false, false],
        correct_answer: [false, true, false, false],
        status: '',
      },
      {
        question: '3. what is present in toothpaste?',
        options: [
          { id: 1, value: 'options1' },
          { id: 2, value: 'options1' },
          { id: 3, value: 'options1' },
          { id: 4, value: 'options1' },
        ],
        answer: [false, false, false, false],
        correct_answer: [false, true, false, false],
        status: '',
      },
    ],
    1: [
      {
        question: '1. what is present in toothpaste?2',
        options: [
          { id: 1, value: 'options1' },
          { id: 2, value: 'options1' },
          { id: 3, value: 'options1' },
          { id: 4, value: 'options1' },
        ],
        answer: [false, false, false, false],
        correct_answer: [false, true, false, false],
        status: '',
      },
      {
        question: '2. what is present in toothpaste?2',
        options: [
          { id: 1, value: 'options1' },
          { id: 2, value: 'options1' },
          { id: 3, value: 'options1' },
          { id: 4, value: 'options1' },
        ],
        answer: [false, false, false, false],
        correct_answer: [false, true, false, false],
        status: '',
      },
    ],
    2: [
      {
        question: '1. what is present in toothpaste?3',
        options: [
          { id: 1, value: 'options1' },
          { id: 2, value: 'options1' },
          { id: 3, value: 'options1' },
          { id: 4, value: 'options1' },
        ],
        answer: [false, false, false, false],
        correct_answer: [false, true, false, false],
        status: '',
      },
      {
        question: '2. what is present in toothpaste?3',
        options: [
          { id: 1, value: 'options1' },
          { id: 2, value: 'options1' },
          { id: 3, value: 'options1' },
          { id: 4, value: 'options1' },
        ],
        answer: [false, false, false, false],
        correct_answer: [false, true, false, false],
        status: '',
      },
    ],
  })

  const [currentPage, setCurrentPage] = useState(0)
  const [showHints, setShowHints] = useState(false)
  const [canMove, setCanMove] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [home, setHome] = useState(true)

  const [answers, setAnswers] = useState({
    0: ['salt', 'salt1'],
    1: ['salt2', 'salt3'],
    2: ['salt4', 'salt5'],
  })
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const onChangeAnswer = (e) => {
    const [currentPage_index, Question_index, option_index] = e.target.name.split("_");
    const question = { ...Questions }
    const tempvalues = new Array(4).fill(
      false
    );
    tempvalues[option_index] = true;
    question[currentPage_index][Question_index].answer = tempvalues;
    // // console.log("checking", question)
    setQuestions(question)
  }

  function arraysAreEqual(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }

    return true;
  }

  const onValidate = () => {
    if (canMove) {
      if (currentPage === Object.keys(Questions).length - 1) {
        setSubmit(true)
      } else {
        setCurrentPage((prev) => prev + 1)
        setShowHints(false)
        setCanMove(false)
      }
    } else {
      const question = { ...Questions }
      let flag = false
      for (let i = 0; i < question[currentPage].length; i++) {
        console.log("checkin", question[currentPage][i])
        if (arraysAreEqual(question[currentPage][i].answer, question[currentPage][i].correct_answer)

        ) {
          question[currentPage][i].status = '1'
        } else {
          flag = true
          question[currentPage][i].status = '0'
        }
      }

      setQuestions(question)
      if (!flag) {
        setCanMove(true)
      }
    }
  }

  function shuffleArray(array) {
    const shuffledArray = [...array] // Create a new array to avoid modifying the original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ]
    }
    return shuffledArray
  }



  return (
    <div className=' relative'>

      {submit ? (
        <div className='flex flex-col relative  w-full items-center justify-center'>
          <p className='absolute'>Submitted</p>
        </div>
      ) : (
        <>
          {home ? (
            <div className='flex flex-col relative bg-white gap-5 h-[90vh] items-center justify-center'>
              <Particles
                className="absolute"
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={particlesConfig}
                style={{ zIndex: 1 }} // Set a lower zIndex for particles
              />
              <div className="flex  flex-col z-10 items-center justify-center gap-5"> {/* Set a higher zIndex for content */}
                <p className="w-[70%] shadow-xl bg-white p-5 rounded-lg">
                  Your content here Your content hereYour content hereYour content hereYour content hereYour content hereYour content hereYour content here
                </p>
                <div>

                  <button
                    onClick={() => setHome(false)}
                    className={`text-[#001437] bg-[#BCFB46] hover:bg-transparent hover:border-yellow-100 hover:text-[#a0db32] rounded-lg md:text-[16px] font-bold md:px-6 text-sm text-md px-6 py-2 rounded-full text-center font-['nunito'] cursor-pointer`}
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>

          ) : (
            <div className='relative p-2 px-20'>
              <Particles
                className="absolute"
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={particlesConfig}
                style={{ zIndex: 1 }} // Set a lower zIndex for particles
              />
              <div className="flex flex-col">
                <div className="z-10">
                  <button
                    onClick={() => setHome(true)}
                    className={`   my-2 text-[#001437]  bg-[#BCFB46] hover:bg-[#001437] hover:text-[#a0db32]  rounded-lg
              md:text-[16px] font-bold md:px-6 text-sm  text-md px-6 py-2 text-center font-['nunito'] cursor-pointer  `}
                  >
                    Home
                  </button>
                </div>
                <div className='flex  flex-col relative  w-full items-center justify-center'>
                  <img src={header} alt='home' title='h' />
                  <button
                    onClick={() => setHome(false)}
                    className={`absolute text-[100px] bg-black text-white rounded-lg px-2`}
                  >
                    Pro Tradition
                  </button>
                </div>
                <div className='flex z-10 flex-col'>
                  <p className='text-xl shadow-md py-2 px-3 bg-cyan-300'>
                    Quiz 1
                  </p>
                  {/* {console.log('chjeckkc', Questions['0'])} */}
                  <div className='flex gap-20'>
                    <div>
                      {Questions[currentPage].map((q, index) => (
                        <div className='pl-3 pb-3 flex flex-col' key={`questions_${index}`}>
                          <div className='flex items-center'>
                            <p className="text-lg py-2 font-['Poppins']">
                              {q.question}
                            </p>
                            {q.status === '0' ? (
                              <span className='text-red-500 px-3'>*Wrong answer</span>
                            ) : null}
                            {q.status === '1' ? (
                              <span className='text-green-500 px-3'>
                                *Correct answer
                              </span>
                            ) : null}
                          </div>
                          {console.log("checkingasdasdas", q.options)}
                          {q.options.map((data, ind) => (
                            <div key={ind} className="flex hover:cursor-pointer  items-center mb-3">
                              <input
                                className="w-4 h-4 m-2 text-blue-600 bg-gray-100 hover:bg-blue-300 rounded border-gray-300 focus:ring-blue-500"
                                type="radio"
                                name={`${currentPage}_${index}_${ind}`}
                                id={`checker_${currentPage}_${index}_${ind}`}
                                checked={q.answer[ind]}
                                value={ind}
                                onChange={(e) => onChangeAnswer(e)}

                              />

                              <label
                                htmlFor={`checker_${currentPage}_${index}_${ind}`}
                                className="block border min-w-[400px] hover:cursor-pointer rounded-lg hover:bg-blue-300  border-blue-400 px-2 py-1  text-sm font-medium text-gray-900"

                              >{data.value}</label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <p className="w-[70%] shadow-xl p-5 rounded-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                  </div>
                </div>
                <div className='flex gap-x-3'>
                  <button
                    onClick={() => setShowHints((prev) => !prev)}
                    className={`text-[#001437]  bg-[#BCFB46] hover:bg-[#001437] hover:text-[#a0db32]  rounded-lg
              md:text-[16px] font-bold md:px-6 text-sm  text-md px-6 py-2 rounded-full text-center font-['nunito'] cursor-pointer  `}
                  >
                    {showHints ? 'Hide hints' : 'Show hints'}
                  </button>
                  <button
                    onClick={() => onValidate()}
                    className={`text-[#001437]  bg-[#BCFB46] hover:bg-[#001437] hover:text-[#a0db32]  rounded-lg
              md:text-[16px] font-bold md:px-6 text-sm  text-md px-6 py-2 rounded-full text-center font-['nunito'] cursor-pointer  `}
                  >
                    {canMove ? 'Next Page' : 'Check Your answer'}
                  </button>
                  {console.log("hsdfjsdf", currentPage, Object.keys(Questions).length)}
                  {(currentPage < Object.keys(Questions).length - 1) ? (
                    <button
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className={`text-[#001437]  bg-[#BCFB46] hover:bg-[#001437] hover:text-[#a0db32]  rounded-lg
              md:text-[16px] font-bold md:px-6 text-sm  text-md px-6 py-2 rounded-full text-center font-['nunito'] cursor-pointer  `}
                    >
                      Next Page
                    </button>
                  ) : null}
                  {(currentPage > 0) ? (
                    <button
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      disabled={currentPage <= 0}
                      className={`text-[#001437]  bg-[#BCFB46] hover:bg-[#001437] hover:text-[#a0db32]  rounded-lg
              md:text-[16px] font-bold md:px-6 text-sm  text-md px-6 py-2 text-center font-['nunito'] cursor-pointer  `}
                    >
                      Prev page
                    </button>
                  ) : null}
                </div>
                {showHints ? (
                  <div className='flex px-2 py-1 m-2 gap-2 border border-slate-300 rounded-lg'>
                    {shuffleArray(answers[currentPage]).map((answer, index) => (
                      <span className='py-0.5 px-2 bg-green-600 rounded-lg text-lg'>
                        {answer}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App

