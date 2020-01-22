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
    let theword = word[wordindex];
    // console.log(typeof theword);
    this.state = { nWrong: 0, guessed: new Set(), answer: 'apple' };
    // console.log(word[wordindex]);
    this.handleGuess = this.handleGuess.bind(this);
    this.guessedWord = this.guessedWord.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */

  guessedWord() {
    let tword = this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
    let p = tword.join('');
    console.log(this.state.answer);
    console.log(this.props.maxWrong);
    if (p === this.state.answer) {
      console.log('its done ');
    } else {
      console.log('so excitedd');
    }

    return tword;
  }
  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    // let tword = this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    let disltr = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return disltr.map((ltr, i) => (
      <button key={i} value={ltr} onClick={this.handleGuess} disabled={this.state.guessed.has(ltr)}>
        {ltr}
      </button>
    ));
  }
  reloadpage() {
    window.location.reload();
  }
  // generatedonebutton() {
  //   return (
  //   );
  // }
  /** render: render game */
  // numberofwrongsleft() {
  //   let temp = this.props.maxWrong;
  //   temp = temp - 1;
  //   return temp;
  // }

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
        <div className="grid-content">
          <div className="wrongs">
            <h2>Number of wongs left : {this.numberofwrongsleft()}</h2>
          </div>
          <div className="Hangman-divimg">
            <img src={this.imagedisplay()} />
          </div>
          <div className="Hangman-divword">
            <p className="Hangman-word ">{this.guessedWord()}</p>
          </div>
          <div className="Hangman-divbtn">
            <p className="Hangman-btns">{this.generateButtons()}</p>
            <button className="Hangman-donebuttton" onClick={this.reloadpage}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
