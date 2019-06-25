const getUtmeAgg = () => {
  const utmeScore = parseInt(document.querySelector('#utme-input').value, 10);
  return parseFloat((utmeScore / 8).toFixed(2));
};

const pUtmeScore = () => parseInt(document.querySelector('#p-utme-input').value, 10);

const getOLAgg = () => {
  const grades = Array.from(document.querySelectorAll('.ol-grades'));
  return grades
    .map(grade => parseFloat(grade.value))
    .reduce((grade, sum) => {
      grade += sum;
      return grade;
    }, 0);
};

const totalAgg = (utme, pUtme, ol) => parseFloat(utme + pUtme + ol).toFixed(2);

const showScore = () => {
  const aggregate = document.querySelector('.aggregate');

  const utme = getUtmeAgg();
  const pUtme = pUtmeScore();
  const ol = getOLAgg();

  const score = totalAgg(utme, pUtme, ol);
  let i = 0.00;

  const increment = setInterval(() => {
    i += 1.23;
    aggregate.innerHTML = i.toFixed(2);
    if (i >= score) {
      aggregate.innerHTML = score;
      clearInterval(increment);
    }
  }, 25);
};

export default showScore;
