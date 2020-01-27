import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import win from './win.jpg';
import lose from './lose.jpg';
// import { randomWord } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    tempword: ''
  };

  constructor(props) {
    super(props);
    let word = [
      'geography',
      'cat',
      'yesterday',
      'java',
      'truck',
      'opportunity',
      'fish',
      'token',
      'transportation',
      'bottom',
      'apple',
      'cake',
      'remote',
      'boots',
      'terminology',
      'arm',
      'cranberry',
      'tool',
      'caterpillar',
      'spoon',
      'watermelon',
      'laptop',
      'toe',
      'toad',
      'fundamental',
      'capitol',
      'garbage',
      'anticipate',
      'pesky'
    ];
    let wordindex = Math.floor(Math.random() * word.length);
    // console.log(wordindex);
    // let theword = word[wordindex];
    let theword = 'apple';

    // console.log(typeof theword);
    this.state = { nWrong: 0, guessed: new Set(), answer: theword, correctans: [''] };
    // console.log(word[wordindex]);
    console.log(this.state.guessed);
    this.handleGuess = this.handleGuess.bind(this);
    this.guessedWord = this.guessedWord.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */

  guessedWord() {
    // let tword = this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
    return this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
  }
  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */

  handleGuess(evt) {
    let ltr = evt.target.value;

    // let arraywala = [];
    // console.log(`arraywala before adding : ${arraywala}`);

    // arraywala.push(ltr);
    // console.log(`arraywala before adding : ${arraywala}`);
    // // let tword = this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
    // console.log(ltr);

    let tword = this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : ''));
    tword = tword.join('');
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      correctans: this.state.answer.includes(ltr) ? [...st.correctans, tword] : [...st.correctans]
    }));
  }

  /** generateButtons: return array of letter buttons to render */

  generateButtons() {
    let disltr = 'abcdefghijklmnopqrstuvwxyz'.split('');
    if (this.state.nWrong >= this.props.maxWrong) {
      return (
        <div>
          <button className="Hangman-donebuttton" onClick={this.reloadpage}>
            Retry
          </button>
          <h4>You lose</h4>
        </div>
      );
    } else {
      return disltr.map((ltr, i) => (
        <button
          key={i}
          value={ltr}
          onClick={this.handleGuess}
          disabled={this.state.guessed.has(ltr)}
        >
          {ltr}
        </button>
      ));
    }
  }

  reloadpage() {
    window.location.reload();
  }

  // generatedonebutton() {
  //   return (
  //   );
  // }

  /** render: render game */
  imagedisplay() {
    let img;

    if (this.state.nWrong <= this.props.maxWrong - 1) {
      img = this.props.images[this.state.nWrong];
    } else {
      img = lose;
    }
    return img;
  }

  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <h5>
          You have {this.state.nWrong}/{this.props.maxWrong} chances
        </h5>
        <div className="grid-content">
          <div className="Hangman-divimg">
            <img src={this.imagedisplay()} />
          </div>
          <div className="Hangman-divword">
            <p className="Hangman-word ">
              {this.state.nWrong >= this.props.maxWrong ? this.state.answer : this.guessedWord()}
            </p>
          </div>
          <div className="Hangman-divbtn">
            <p className="Hangman-btns">{this.generateButtons()}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
