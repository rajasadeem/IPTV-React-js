import Cookies from "js-cookie";

const useSetDataInBrowserStorage = () => {

    const storeDataInLocalStorage = (key, data) => {
        if (data) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

    const getDataFromLocalStorage = (key) => {
        const localStorageData = localStorage.getItem(key);
        if (localStorageData != "undefined" && typeof (localStorageData) === "string") {
            const result = JSON.parse(localStorageData);
            return result;
        }
        return null
    }

    const setDataInCookies = (key, data) => {
        Cookies.set(key, data, { expires: 7 }); // Expires in 7 days
    };

    const getDataInCookies = (key) => {
        const cookieValue = Cookies.get(key);
        return cookieValue;
    };
    const removeDataInCookies = (key) => {
        return Cookies.remove(key)
    }


    return {
        storeDataInLocalStorage,
        getDataFromLocalStorage,
        setDataInCookies,
        getDataInCookies,
        removeDataInCookies
    }
}

export default useSetDataInBrowserStorage