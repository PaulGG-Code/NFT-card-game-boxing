import { useEffect } from "react";
import { CombinedState, AnyAction, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Web3 from "web3"
import { setAccounts, setChainId, setConnected, setWeb3 } from "../../store/reducer/WalletReducer/walletReducer";
import { useAppDispatch } from "../../store/store";



declare const window: any;

declare global {
    interface Window {
        ethereum: any;
        web3: Web3;
    }
}


export const fetchAccounts = () => {
    return new Promise((resolve, reject) => {
        const ethAccounts = getAccounts();
        resolve(ethAccounts)
    });
};


export const getChainId = async () => {
    try {
        const chainId = await window.web3?.eth?.getChainId()
        return chainId;
    }
    catch (e) {
        return '';
    }
}


export const getAccounts = async () => {
    try {
        return await window.web3?.eth?.getAccounts();
    } catch (e) {
        return '';
    }
}

export const openMetamask = async (dispatch: any) => {
    window.web3 = new Web3(window.ethereum);
    const chainId = await getChainId()

    let addresses = await getAccounts();
    if (!addresses.length) {
        try {
            addresses = await window.ethereum.enable();
            dispatch(setAccounts(addresses))
            dispatch(setConnected(true))
            dispatch(setWeb3(window.web3.eth))
            dispatch(setChainId(chainId))

        } catch (e) {
            return false;
        }
    }
    return addresses.length ? addresses[0] : null;
};

export const fetchWallewPublicDataAsync = async (dispatch: any) => {
    window.web3 = new Web3(window.ethereum);
    const address = await getAccounts()
    const chainId = await getChainId()


    const getConnected = async () => {
        dispatch(setAccounts(address))
        dispatch(setWeb3(window.web3.eth))
        dispatch(setChainId(chainId))
        if (address[0]) {
            dispatch(setConnected(true))
        }
        else {
            dispatch(setConnected(false))
        }
    }
    window.ethereum.on('accountsChanged', async (accounts: any) => {
        if (!accounts[0]) {
            dispatch(setAccounts(accounts))
            dispatch(setConnected(false))
        }
    })
    getConnected()

}