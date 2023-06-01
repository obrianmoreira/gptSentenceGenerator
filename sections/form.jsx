import { Cards } from "@/components/Items/Cards/cards"
import { Frame } from "@/components/Layout/layout"
import { Wall } from "@/components/Layout/layout"
import { H1Text, H2Text, PText } from "@/components/Items/Texts/texts"
import { useState } from "react";
import Style from '../sections/Sections.module.css';
import GptSentence from "@/components/Content/gptsentence";
import { Button } from "@/components/Items/Button/button";

const Form = (props) => {

    const [reset, setReset] = useState(false);

    // Auxiliar input where the person click to open the options and retrieve the auxiliar data
    const [auxInput, setAuxInput] = useState('Escola Seu Auxiliar');
    
    // Type of the sentence input where the person click to open the options and retrieve the type of sentence data
    const [typeInput, setTypeInput] = useState('Escola Seu Tipo de Frase');

    // English input to checked where the person click to write the sentence in English to be compared to Portuguese
    const [englishInput, setEnglishInput] = useState('Torne A Frase Acima Inglês');

    // Show the options of auxiliaries, it works with the ternary operator
    const [showOptions, setShowOptions] = useState(false);

    // Show the options of sentence types, it works with the ternary operator
    const [showTypeOptions, setTypeOptions] = useState(false);

    // This is the first button. It gets the data from auxiliary and type to update buttonGpt variable
    const [sentenceGpt, setSentenceGpt] = useState('');

    // This is the second button. It gets the data from user English version to update buttonGptAgain variable
    const [buttonGptAgain, setButtonGptAgain] = useState('');

    const [blockButton, setBlockButton] = useState(true);

    // When clicked it gets the data of the li placeholder and make it the data of the auxiliary input
    const handleAux = (auxInput) => {
        setAuxInput(auxInput)
    }

    // When clicked it gets the data of the li placeholder and make it the data of the type pf sentence input
    const handleType = (typeInput) => {
        setTypeInput(typeInput)
    }

    // This function uses the first button to receive the auxiliary and type in the variable of the first button connected with Gpt
    const sendGpt = () => {
        setReset(true);
        setSentenceGpt(typeInput);
        setTypeOptions(false);
        setBlockButton(false)
    }

    // This function uses the second button to receive the english input in the variable of the first button connected with Gpt
    const sendGptAgain = () => {
        setButtonGptAgain(englishInput)
        if (blockButton === false) {
            alert('Você precisa apertar o botão "Reiniciar" para nossa AI criar uma nova frase.')
        }
    }

    const handleRest = () => {
        window.location.reload();
        /*
            setAuxInput('Escola Seu Auxiliar');
            setTypeInput('Escola Seu Tipo de Frase');
            setReset(false);
            setEnglishInput('Torne em ingles a frase up');
            setShowOptions(false);
            setTypeOptions(false);
        */
    }

    const sentenceType = [
        {
            text: "Interrogative"
        },
        {
            text: "Negative"
        },
        {
            text: "Interrogative-negative"
        },
        {
            text: "Affirmative"
        }
    ]

    return (

        <>
            <Wall wall={Style.wall}>
                <Frame frame={Style.frameText}>
                    <H1Text h1Text={props.title} h1Style={Style.h1Style}/>
                    <PText pText={props.subTitle} pStyle={Style.pStyle}/>
                </Frame>
                <Cards cardClass={Style.card}>
                    <H2Text h2Text={props.titleCard} h2Style={Style.h2Style}/>
                    <Frame frame={Style.frameCard}>
                        <input className={Style.input} placeholder={typeInput} onClick={() => setTypeOptions(!showTypeOptions)}></input>
                        {blockButton ? (<Button buttonClick={sendGpt} buttonText="Gerar" buttonStyle={Style.btnStyle}/>) : (<Button buttonClick={sendGpt} buttonText="Gerar" buttonStyle={Style.btnDisabled} disabled="disabled"/>)}
                    </Frame>

                    {showTypeOptions ?  ( 
                        
                        <>

                            {sentenceType.map((type) => {
                                return(
                                    <>
                                        <li onClick={() => handleType(type.text)}>{type.text}</li>
                                    </>
                                )
                            })}
                        
                        </>
                    
                    ) : (
                        <>

                        </>
                    )}

                    <Frame frame={Style.outputGpt}>
                        {reset ? (<GptSentence data={sentenceGpt} datatwo={buttonGptAgain}/>) : (<></>)}
                        <br />
                    </Frame>
                    <Frame frame={Style.frameItems}>
                        <div className={Style.userInput}>
                            <input className={Style.input} type="text" value={englishInput} onChange={() => setEnglishInput(event.target.value)} placeholder={englishInput}/>
                        </div>
                        <div className={Style.btnResult}>
                            <Button buttonClick={sendGptAgain} buttonText="Resultado" buttonStyle={Style.btnStyle}/>
                        </div>
                        <div>
                            <Button buttonClick={handleRest} buttonText="Reiniciar" buttonStyle={Style.btnStyle}/>
                        </div>
                    </Frame>
                </Cards>
            </Wall>

        </>

    )

}

export default Form;