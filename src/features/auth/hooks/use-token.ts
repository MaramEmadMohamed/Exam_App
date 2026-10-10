import { TOKEN_KEY } from "@/features/auth/constants/token.constant";

interface IUseTokenReturn {
    /**
     * Gets the token from local storage.
     * @returns The token from local storage or null if not found.
     */
    getToken: () => string | null;
    /**
     * Sets the token in local storage.
     * @param token - The token to be set.
     */
    setToken: (token: string) => void;
    /**
     * Removes the token from local storage.
     */
    removeToken: () => void
}
export default function useToken() : IUseTokenReturn {
      function getToken()  {
        return localStorage.getItem(TOKEN_KEY);
    };

    
    function setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token);
    };

    

    function removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }

    return{ getToken, setToken, removeToken }
}