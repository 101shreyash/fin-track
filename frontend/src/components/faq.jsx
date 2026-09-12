import { useState } from "react";

function FrequentQuestions() {
  let [faq1, setfaq1] = useState("");
  let [faq2, setfaq2] = useState("");
  let [faq3, setfaq3] = useState("");
  let [faq4, setfaq4] = useState("");
  let [faq5, setfaq5] = useState("");

  function FAQ1() {
    setfaq1(
      "You can track money coming in and going out, where you spent it, where it came from, add notes, and organize everything by date and month.",
    );
  }

  function FAQ2() {
    setfaq2(
      "Yep. You can choose the currency you use, so you don't have to force everything into a currency that doesn't make sense for you.",
    );
  }

  function FAQ3() {
    setfaq3(
      "No problem. You can record different sources of income and keep track of where your money is coming from, not just where it's going.",
    );
  }


  function FAQ4() {
    setfaq4(
      "Yep. Your transactions are organized by date and month, so you can go back and see what you were spending on, how much you were spending, and how things changed over time.",
    );
  }

  function FAQ5() {
    setfaq5(
      "Nope. Your money, your decisions. FinTrack isn't here to judge your spending or tell you what you should buy. It just gives you the information so you know what's going on.",
    );
  }



  return (
    <div style={{ marginTop: "3%" }}>
      <h1 className="main-head"> # Frequently Asked Questions</h1>
      <h3 onClick={FAQ1} className="questions"> What can I track with FinTrack?</h3>
      <p style={{ fontSize: "20px" }}>{faq1}</p>
      <h3 onClick={FAQ2} className="questions"> Can I use my own currency? </h3>
     <p style={{ fontSize: "20px" }}>{faq2}</p>
      <h3 onClick={FAQ3} className="questions"> What if I have income from different places? </h3>
      <p style={{ fontSize: "20px" }}>{faq3}</p>
      <h3 onClick={FAQ4}  className="questions">  Can I look back at my spending ?</h3>
     <p style={{ fontSize: "20px" }}>{faq4}</p>
      <h3 onClick={FAQ5} className="questions">Is FinTrack going to tell me how to spend my money? ?</h3>
      <p style={{ fontSize: "20px" }}>{faq5}</p>


    </div>
  );
}

export default FrequentQuestions;
