import { useEffect, useState } from "react";
import GptCorrection from "./gptcorrection";
import { H1Text, PText } from "../Items/Texts/texts";
import axios from "axios";

const GptSentence = ({data, datatwo}) => {

    const [gptSentence, setGptSentence] = useState('');
    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    useEffect(() => {

        if(data) {

            const GeneratedSentence = async () => {

                try {

                    const res = await axios.post (
                        "https://api.openai.com/v1/engines/text-davinci-003/completions",
                        {
                            prompt: `Create a random and not so easy Portuguese sentence in this sentence type: "${data}". Pay close attention to create a correct sentence and use appropriate Portuguese expressions. Never show english sentences too.`,
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

    }, [data, API_KEY]);


    return (
        
        <>
            <PText pText={gptSentence}/>
            <br />
            {gptSentence && <GptCorrection data={gptSentence} datatwo={datatwo}/>}
        </>
    
    )

}

export default GptSentence;