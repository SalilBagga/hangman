import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

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
    console.log(wordindex);
    let theword = word[wordindex];
    console.log(typeof theword);
    this.state = { nWrong: 0, guessed: new Set(), answer: 'apple' };
    console.log(word[wordindex]);
    this.handleGuess = this.handleGuess.bind(this);
    this.guessedWord = this.guessedWord.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */

  guessedWord() {
    let tword = this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
    console.log(tword);
    return tword;
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    let tword = this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
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
  /** render: render game */
  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <div className="grid-content">
          <img src={this.props.images[this.state.nWrong]} />
          <p className="Hangman-word">{this.guessedWord()}</p>
          <p className="Hangman-btns">{this.generateButtons()}</p>
        </div>
      </div>
    );
  }
}

export default Hangman;
