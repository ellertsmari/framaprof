import axios from "axios";
const useFakeData = true;

const fetchQuestions = () => new Promise((resolve, reject) => {
  if (useFakeData) {
    resolve([
      {
        question: "Hér er textinn með spurningunni, hann er nokkuð langur og fer ábyggilega á nokkrar línur og brýtur alla hönnun.",
        answers: [
          {
            text: "Svar 1, það er nokkuð langt og brotnar á aðra línu því að það er alveg rosalega langt",
            scores: [
              { name: "Byggingatækni", score: 3 },
              { name: "Vefskólinn", score: 2 },
              { name: "Tölvubraut", score: 1 },
            ],
          },
          {
            text: "Svar 1, það er nokkuð langt og brotnar á aðra línu",
            scores: [
              { name: "Byggingatækni", score: 3 },
              { name: "Vefskólinn", score: 2 },
              { name: "Tölvubraut", score: 1 },
            ],
          },
          {
            text: "Svar 1, það er nokkuð langt og brotnar á aðra línu",
            scores: [
              { name: "Byggingatækni", score: 3 },
              { name: "Vefskólinn", score: 2 },
              { name: "Tölvubraut", score: 1 },
            ],
          },
          {
            text: "Svar 1, það er nokkuð langt og brotnar á aðra línu",
            scores: [
              { name: "Byggingatækni", score: 3 },
              { name: "Vefskólinn", score: 2 },
              { name: "Tölvubraut", score: 1 },
            ],
          },
        ],
      },
    ]);
  } else {
    axios.get("http://framaprof.is/api/")
      .then(({ data }) => resolve(data.results))
      .catch(err => reject(err));
  }
});

export default fetchQuestions;
