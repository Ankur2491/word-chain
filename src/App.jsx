// import './App.css'
// import dictionary from './dictionary_alpha_arrays.json';
import Grid from '@mui/material/Grid';
import dict from './words_dictionary.json';
import { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';

const words = Object.keys(dict);

function App() {

  const [showLogin, setShowLogin] = useState(true);
  const [userName, setUserName] = useState(null);
  const [gameObj, setGameObj] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [wordTimer, setWordTimer] = useState(null);
  const [letter, setLetter] = useState(null);
  const [gameWord, setGameWord] = useState(null);
  const [wordIdx, setWordIdx] = useState(null);
  const [typedWord, setTypedWord] = useState('');
  const [allWords, setAllWords] = useState(null);
  const [reTyped, setRetyped] = useState(false);
  useEffect(() => {
    if (timeLeft == 0) {
      setTypedWord('')
      let gObj = gameObj;
      gObj.highScore = gObj.score > gObj.highScore ? gObj.score : gObj.highScore
      gObj.active = false;
      gObj.wordsTyped = [];
      gObj.letter = '';
      setGameObj(gObj);
    }
  }, [timeLeft])
  return (
    <>
      <br />
      {showLogin &&
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Welcome to Word Chain
            </Typography>
            <Typography variant="body2">
              To begin, please enter your name below and click on play.
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid size={2}>
                <TextField id="outlined-basic" label="enter your name" variant="outlined" size="small" onChange={(e) => setUserName(e.target.value)} />
              </Grid>
              <Grid size={2}>
                <Button variant='contained' onClick={play}>Play</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      }
      {
        gameObj !== null && gameObj.active == true &&
        <Grid container spacing={2}>
          <Grid size={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Words Typed
                </Typography>
                <textarea cols={35} rows={20} readOnly value=
                  {gameObj.wordsTyped.map(word =>
                    word)} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Welcome {userName}!
                </Typography>
                <Typography variant="body2">
                  Enter a word that begins with the highlighted letter
                </Typography>
                {timeLeft >= 0 &&
                 <Typography variant="h3">{timeLeft} s</Typography>
                }
                <Typography variant="h2">
                  {gameWord}
                </Typography>
                <Typography variant='h4'>
                  {letter && letter.toUpperCase()}
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField id="outlined-basic" label="enter word" variant="outlined" size="small" value={typedWord} onChange={(e) => setTypedWord(e.target.value.toLowerCase())} />
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      }
      {gameObj && gameObj.active == false &&
        <Grid container spacing={2}>
          <Grid size={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Game Over!
                </Typography>
                <Typography variant="body2">
                  Score: {gameObj.score}
                </Typography>
                <Typography variant="body2">
                  Highest Score: {gameObj.highScore}
                </Typography>
                <Button variant='contained' onClick={play}>Play</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      }
      {reTyped===true && 
        <Snackbar
          open={true}
          anchorOrigin={{vertical:'top', horizontal:'center'}}
          autoHideDuration={5000}
          onClose={handleClose}
          message="You have already typed this word."
        />
      }
    </>
  )
  function play() {
    setShowLogin(false);
    localStorage.setItem('userName', userName);
    let randomWord = pick();
    setGameWord(randomWord);
    let gObject = {
      "word": randomWord,
      "score": 0,
      "highScore": 0,
      "wordsTyped": [],
      "active": true
    }
    if (gameObj !== null) {
      gObject.highScore = gameObj.highScore;
      clearInterval(wordTimer);
      setTimeLeft(20);
    }
    setGameObj(gObject);
    setWordIdx(0);
    setAlphabet(0, randomWord);
  }
  function setAlphabet(idx, word) {
    if (idx == word.length) {
      let go = gameObj;
      go.score = go.score + 1;
      setGameObj(go);
      let w = pickFromLetter();
      setGameWord(w);
      setWordIdx(0);
      setAlphabet(0, w);
    }
    let l = word[idx];
    setLetter(l);
    setWordIdx(idx);
    let timer = setInterval(() => setTimeLeft(prev => prev > 0 && prev - 1), 1000)
    setWordTimer(timer);
  }
  function pick() {
    // let randomIdx = Math.floor(Math.random()*26);
    // let words = Object.keys(dictionary[randomIdx]);
    // let wordIdx = Math.floor(Math.random()*words.length);
    // console.log(words[wordIdx].replaceAll('-',''));
    setAllWords(new Set(words));
    let wordIdx = Math.floor(Math.random() * words.length);
    return words[wordIdx];
  }
  function pickFromLetter() {
    let filteredWordList = [...allWords].filter(all => all[0] === letter);
    let wordIdx = Math.floor(Math.random() * filteredWordList.length);
    return filteredWordList[wordIdx];
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (typedWord && typedWord.length >= 3 && typedWord[0] === letter && allWords.has(typedWord.toLowerCase())) {
      if (gameObj.wordsTyped.includes(typedWord.toLowerCase())) {
        setRetyped(true);
        return;
      }
      else {
        let wordsTyped = gameObj.wordsTyped;
        wordsTyped.push(typedWord.toLowerCase());
      }
      setTypedWord('');
      clearInterval(wordTimer);
      setTimeLeft(20);
      setWordIdx(prev => prev + 1);
      if (wordIdx === gameWord.length - 1) {
        let go = gameObj;
        go.score = go.score + 1;
        setGameObj(go);
        // let w = pickFromLetter(gameWord);
        setGameWord(typedWord);
        setWordIdx(0);
        setAlphabet(0, typedWord);
      }
      else {
        setAlphabet(wordIdx + 1, gameWord);
      }
    }
  }
  function handleClose(e) {
    setRetyped(false);
  }
}

export default App
