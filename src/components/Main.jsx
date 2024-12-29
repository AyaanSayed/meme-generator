import { useEffect, useState } from "react"

export default function Main() {
  const [meme, setMeme] = useState({
      topText : "One does not simply",
      bottomText : "Walk into Mordor",
      imageURL : "http://i.imgflip.com/1bij.jpg"
  })

  const [allMeme, setAllMeme] = useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMeme(data.data.memes));

  } , [])

  // get random image from allMeme and change the url in meme state with onclick
    function handleClick() {
    const randNum = Math.floor(Math.random() * allMeme.length)
    const randMemeImg = allMeme[randNum].url
    setMeme(prevMeme => ({
      ...prevMeme,
      imageURL: randMemeImg
    }))}

  function handleChange(event) {
    const {value, name} = event.currentTarget;
    setMeme(prevMeme => ({
          ...prevMeme,
          [name]: value
      }
    ))
  }
  return (
      <main>
          <div className="form">
              <label>Top Text
                  <input
                      type="text"
                      placeholder="One does not simply"
                      name="topText"
                      onChange={handleChange}
                      value={meme.topText}
                  />
              </label>

              <label>Bottom Text
                  <input
                      type="text"
                      placeholder="Walk into Mordor"
                      name="bottomText"
                      onChange={handleChange}
                      value={meme.bottomText}
                  />
              </label>
              <button onClick={handleClick}>Get a new meme image 🖼</button>
          </div>
          <div className="meme">
              <img src={meme.imageURL} />
              <span className="top">{meme.topText}</span>
              <span className="bottom">{meme.bottomText}</span>
          </div>
      </main>
  )
}