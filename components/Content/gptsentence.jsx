import { useEffect, useState } from "react";
import GptCorrection from "./gptcorrection";
import { H1Text, PText } from "../Items/Texts/texts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateGptSentence } from "@/redux/reducer";
import { generatedGptSentence } from "@/redux/action";
import { Frame } from "../Layout/layout";


const GptSentence = ({type, tense,}) => {

    const [gptSentence, setGptSentence] = useState('');
    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const dispatch = useDispatch();

    useEffect(() => {

        if(type, tense) {

            const GeneratedSentence = async () => {

                try {

                    const res = await axios.post (
                        "https://api.openai.com/v1/engines/text-davinci-003/completions",
                        {
                            prompt: `Create a random and not easy sentence in Brazilian Portuguese with this sentence type: "${type}" connected with this tense: "${tense}. Pay close attention to create a correct sentence and use appropriate Portuguese expressions. Never show english sentences too.`,
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

                    console.log("Error", error);

                }   

            }

            GeneratedSentence();

        }


    }, [type, tense, API_KEY]);

    useEffect(() => {
        dispatch(generatedGptSentence(gptSentence));
    }, [dispatch, gptSentence])

    return (
        
        <>
            <Frame>
                <PText pText={gptSentence}/>
                <br />
            </Frame>
        </>
    
    )

}

//            {gptSentence && <GptCorrection data={gptSentence} datatwo={datatwo}/>}


export default GptSentence;