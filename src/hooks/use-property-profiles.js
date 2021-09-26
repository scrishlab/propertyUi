
import client from "../supabase";
import react, {useState} from "react";

export default function usePropertyProfiles(initialState){
    const [profiles, setProfiles] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    function supabaseGetProfiles(){
        return client.from("land").select();
    }

    async function getProfiles(){
        setIsLoading(true);
        setError(null);
        const profilesRequest = await supabaseGetProfiles();
        if(profilesRequest.data){
            setProfiles(profilesRequest.data);
        } else {
            setError(profilesRequest.error);
        }
        setIsLoading(false);
    }

    return [profiles, isLoading, error, getProfiles]
}