import { TOKEN_KEY } from "../constant/token.constant";

interface IUseTokenReturns {
    /**
     * Get token from local storage
     * @returns token
     */
    getToken: () => string | null;

    /**
     * Check whether the stored token is usable for client-side route protection.
     */
    hasValidToken: () => boolean;

    /**
     * Set token to local storage
     * @param token 
     */
    setToken: (token: string) => void;

    /**
     * Remove token from local storage
     */
    removeToken: () => void;
    
}


export default function useToken(): IUseTokenReturns {


    function getToken(){
        return localStorage.getItem(TOKEN_KEY);
    }
    function hasValidToken(){
        const token = getToken()?.trim();

        if (!token) {
            return false;
        }

        const parts = token.split(".");
        if (parts.length !== 3) {
            return true;
        }

        try {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
            return typeof payload.exp !== "number" || payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }
    function setToken(token: string){
        localStorage.setItem(TOKEN_KEY, token);
    }
    function removeToken(){
        localStorage.removeItem(TOKEN_KEY);
    }
    return { getToken, hasValidToken, setToken, removeToken };
}
