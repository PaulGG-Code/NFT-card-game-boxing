import React from "react";
import { useLocation } from "react-router";
import { useWalletDetail } from "../../store/hooks";
import { copyToClipboard } from "../../utils/CommonUsedFun";
import "./index.css";

const WalletConnection = () => {
  const path = useLocation();
  const location = path.pathname.split("/")[1];
  const walletState: any = useWalletDetail();
  const accountEllipsis = walletState?.accounts[0]
    ? `${walletState?.accounts[0].substring(
        0,
        4
      )}...${walletState?.accounts[0].substring(
        walletState?.accounts[0].length - 4
      )}`
    : "";

  return (
    <>
      {location !== "game-play" ? (
        <div className=" p-4">
          <div className="text-yellow text-xl flex items-center">
            USERNAME
            <span className="mx-2">
              <img
                src="/images/down-arrow.png"
                alt="vector"
                className="w-2/3"
              />
            </span>
          </div>
          <div
            onClick={() => {
              copyToClipboard(walletState?.accounts[0]);
            }}
            className="text-white text-lg userAddress"
          >
            {accountEllipsis ? accountEllipsis : "Wallet address"}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default WalletConnection;
