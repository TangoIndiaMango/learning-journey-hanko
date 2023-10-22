import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript"
import { strict_output } from "./gpt";

export async function searchYoutube(searchQuery: string) {
    // so if we have something like hello world == hellow+world
    searchQuery = encodeURIComponent(searchQuery);
    const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`)

    if (!data) {
        console.log("No youtube videos found")
        return null
    }
    if (data.items[0] == undefined) {
        console.log("Youtube data is undefined")
        return null
    }
    return data.items[0].id.videoId;
}

export async function getTranscript(videoId: string) {
    try {
        let transcript_array = await YoutubeTranscript.fetchTranscript(videoId, {
            lang: 'en',
            country: 'EN'
        });
        let transcript = ''
        for (let t of transcript_array) {
            transcript += t.text + ' '
        }
        return transcript.replaceAll("\n", "")
    } catch (error) {
        return "";
    }
}

export async function getQuestionsFromTranscript(transcript: string, course_title: string) {
    type Question = {
        question: string,
        answer: string,
        option1: string,
        option2: string,
        option3: string,
    };
    const questions: Question[] = await strict_output(
        'You are a helpful AI that is able to generate mcq questions and answers, the lenght of each answer should not be more than 15 words',
        new Array(5).fill(`You are to genrate a random hard mcq question about ${course_title} with context of the following transcript: ${transcript} `),
        {
            question: 'question',
            answer: 'answer with max length of 15 words',
            option1: 'option1 with max length of 15 words',
            option2: 'option2 with max lenght of 15 words',
            option3: 'option3 with max lenght of 15 words'
        }
    
    )
    return questions;
}   