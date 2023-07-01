import { useEffect, useState } from "react";
import { H1Text, PText } from "../Items/Texts/texts";
import axios from "axios";
import { generatedGptCorrection } from "@/redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Frame } from "../Layout/layout";

const GptCorrection = ({sentence, translation}) => {

    const [gptCorrection, setGptCorrection] = useState('');
    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const dispatch = useDispatch();
    const engUserSentence = useSelector(state => state.updateGptCorrection.correction)

    useEffect(() => {
        if(sentence, translation) {

            const contentGenerate = async () => {

                try {

                    const res = await axios.post(
                        "https://api.openai.com/v1/engines/text-davinci-003/completions",
                        {
                            prompt:`"Compare this portuguese sentence: ${sentence} with this english sentence: ${translation}. Tell the user using Brazilian Portuguese language if ${translation} is a good translation of the first of ${sentence}. If ${translation} isn't a good translation, show in English using "" how would be a good translation in for ${sentence}. Remember you must talk in Brazilian Portuguese with the user but the sentence corrected must be in English using "". You also must remember to be precise in the correction.`,
                            max_tokens: 100,                            
                            temperature: 0.2,
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
                        setGptCorrection(content);
                    }

                } catch (error) {

                    console.log('Error', error);

                }

            }

            contentGenerate();

        }
    }, [sentence, translation, API_KEY])

    useEffect(() => {
        dispatch(generatedGptCorrection(gptCorrection));
    }, [dispatch, gptCorrection])


    return (
        <>
            <Frame>
                <PText pText={engUserSentence} />
            </Frame>
        </>
    )

}

export default GptCorrection;
