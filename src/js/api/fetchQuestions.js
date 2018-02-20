import axios from "axios";
const useFakeData = false;

const fetchQuestions = () => new Promise((resolve, reject) => {
  if (useFakeData) {
    resolve({
      results: [
        {
          question: "Hér er spurning",
          answers: [
            {
              text: "Hér er svar 1",
              scores: [
                { name: "Byggingatækni", score: 1 },
              ],
            },
          ],
        },
      ],
    });
  } else {
    axios.get("http://framaprof.is/api/")
      .then(({ data }) => resolve(data.results))
      .catch(err => reject(err));
  }
});

export default fetchQuestions;
