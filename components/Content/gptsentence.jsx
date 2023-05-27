import { useEffect, useState } from "react";
import GptCorrection from "./gptcorrection";
import { H1Text, PText } from "../Items/Texts/texts";
import axios from "axios";
import dotenv from 'dotenv';

const GptSentence = ({data, datatwo}) => {

    const [gptSentence, setGptSentence] = useState('')
    dotenv.config();
    const API_KEY = process.env.API_KEY;

    useEffect(() => {

        if(data) {

            const GeneratedSentence = async () => {

                try {

                    const res = await axios.post (

                        "https://api.openai.com/v1/engines/text-davinci-003/completions",
                        {
                            prompt: `Make a sentence in Portugueses translating this auxiliary and type of sentence ${data} also to Portuguese to make the sentence. Dont show the english version.`,
                            max_tokens: 100,
                            temperature: 0.7,
                        },
                        {
                            headers: {

                                "Authorization": `Bearer ${API_KEY}`,
                                "Content-Type": "application/json",

                            }
                        }

                    );

                    const {choices} = res.data;
                    if(choices && choices.length > 0) {
                        const content = choices[0].text;
                        setGptSentence(content);

                    }

                } catch(error) {

                    console.log("Eror", error);

                }   

            }

            GeneratedSentence();

        }

    }, [data]);

    return (
        
        <>
            <PText pText={gptSentence}/>
            <br />
            {gptSentence && <GptCorrection data={gptSentence} datatwo={datatwo}/>}
        </>
    
    )

}

export default GptSentence;