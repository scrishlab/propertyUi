
import client from "../supabase";
import react, {useState} from "react";

export default function usePropertyProfiles(initialState){
    const [profiles, setProfiles] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    function supabaseGetProfiles(){
        /**
         * deduped_land is a postgres view created from the `land` table
         * CREATE VIEW public.deduped_land AS
            select url, price, acres, address, "propertyType" from public.land where id in (
            select ids.id from (select distinct on (url) url, id, updated_at from public.land order by url, updated_at) ids
            )
         * 
         */
        return client.from("deduped_land").select();
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