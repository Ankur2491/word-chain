// import './App.css'
// import dictionary from './dictionary_alpha_arrays.json';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

function App() {

  const [showLogin, setShowLogin] = useState(true);
  const [userName, setUserName] = useState(null);
  const [over, setOver] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [wordTimer, setWordTimer] = useState(null);
  const [letter, setLetter] = useState(null);
  const [gameWord, setGameWord] = useState(null);
  const [wordIdx, setWordIdx] = useState(null);
  const [typedWord, setTypedWord] = useState('');
  const [allWords, setAllWords] = useState(null);
  const [reTyped, setRetyped] = useState(false);
  const [words, setWords] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wordsTyped, setWordsTyped] = useState([]);
  const [active, setActive] = useState(null);
  useEffect(() => {
    axios.get(`https://raw.githubusercontent.com/Ankur2491/assets/refs/heads/main/words_dictionary.json`).then(response => setWords(Object.keys(response.data)));
  }, [])
  useEffect(()=> {
    if(timeLeft<=0) {
      setActive(false);
      setWordsTyped([]);
      setLetter('');
      setOver(true);
      if (wordTimer) {
      clearInterval(wordTimer);
    }
    }
  },[timeLeft])
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
            <form onSubmit={play}>
              <Grid container spacing={2}>
                <Grid size={2}>
                  <TextField id="outlined-basic" label="enter your name" variant="outlined" size="small" onChange={(e) => setUserName(e.target.value)} />
                </Grid>
                <Grid size={2}>
                  <Button variant='contained' onClick={play}>Play</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      }
      {
        active == true &&
        <Grid container spacing={2}>
          <Grid size={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Words Typed
                </Typography>
                <textarea cols={35} rows={20} readOnly value=
                  {wordsTyped.map(word =>
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
                <Grid size={3}>
                </Grid>
                <Grid container spacing={2}>
                  <Grid size={3}>
                    <Typography variant="h6" component="div">
                      Current Score: {score}
                    </Typography>
                  </Grid>
                  <Grid size={3}>
                    <Typography variant="h6" component="div">
                      Highest Score: {highScore}
                    </Typography>
                  </Grid>
                </Grid>
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
      {over && over === true &&
        <Grid container spacing={2}>
          <Grid size={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Game Over!
                </Typography>
                <Typography variant="body2">
                  Score: {score}
                </Typography>
                <Typography variant="body2">
                  Highest Score: {highScore}
                </Typography>
                <Button variant='contained' onClick={play}>Play</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      }
      {reTyped === true &&
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={5000}
          onClose={handleClose}
          message="You have already typed this word."
        />
      }
    </>
  )
  function play() {
    setShowLogin(false);
    setOver(false);
    setTimeLeft(20);
    localStorage.setItem('userName', userName);
    let randomWord = pick();
    setGameWord(randomWord);
    setScore(0);
    setActive(true);
    setWordIdx(0);
    setAlphabet(0, randomWord);
  }
  function setAlphabet(idx, word) {
    if (wordTimer) {
      clearInterval(wordTimer);
    }
    let l = word[idx];
    setLetter(l);
    setWordIdx(idx);
    let timer = setInterval(() => setTimeLeft(prev => prev - 1) , 1000)
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
  function handleSubmit(e) {
    e.preventDefault();
    if (typedWord && typedWord.length >= 3 && typedWord[0] === letter && allWords.has(typedWord.toLowerCase())) {
      if (wordsTyped.includes(typedWord.toLowerCase())) {
        setRetyped(true);
        setTypedWord('');
        return;
      }
      else {
        let wt = wordsTyped;
        wt.push(typedWord.toLowerCase());
      }
      setTypedWord('');
      clearInterval(wordTimer);
      setTimeLeft(20);
      let newIdx = wordIdx + 1;
      setWordIdx(newIdx);
      if (wordIdx === gameWord.length - 1) {
        let sc = score+1;
        let hs = highScore;
        hs = sc > hs ? sc : hs
        setScore(sc);
        setHighScore(hs);
        setGameWord(typedWord);
        setWordIdx(0);
        setAlphabet(0, typedWord);
      }
      else {
        setAlphabet(newIdx, gameWord);
      }
    }
  }
  function handleClose(e) {
    setRetyped(false);
  }
}

export default App
